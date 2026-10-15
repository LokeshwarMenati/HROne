# SYSTEM DESIGN — HROne Enterprise HRMS Platform

## 1. High-Level Architecture Overview

HROne is an enterprise-grade Human Resource Management System built on FastAPI, PyMongo, and MongoDB 6.0+. The platform is architected to handle high-throughput corporate attendance logging, cross-department analytics at 100,000+ record scale, and multi-persona operational workflows (Self-Service, Leave, Recruitment/ATS, Payroll, IT Assets, Helpdesk).

```
+-------------------------------------------------------------------------+
|                  HROne Frontend (HTML5, CSS3, Vanilla JS, Chart.js)     |
|   - Workspace / Self-Service   - Attendance Logs     - Leave Approvals  |
|   - Global Directory           - Recruitment / ATS   - Payroll Viewer   |
|   - IT Asset Tracker           - Helpdesk & KB       - Executive BI     |
+-------------------------------------------------------------------------+
                                    |
                            HTTP / REST JSON
                                    |
+-------------------------------------------------------------------------+
|                        FastAPI Core Engine (Python 3.12)                |
|  - R1-R10 Attendance Engine (IST, Overnight, Half-Day, Round-Half-Up)   |
|  - Atomic Concurrency Guards (Unique Index, Find-and-Modify)            |
|  - Audit History Engine (Delta Tracking, Microsecond Precision)         |
|  - MongoDB Aggregation Pipelines ($lookup, $densify, $setWindowFields)  |
|  - RBAC Middleware & Query Explain Inspector                            |
+-------------------------------------------------------------------------+
                                    |
                           PyMongo (tz_aware=True)
                                    |
+-------------------------------------------------------------------------+
|                        MongoDB 6.0+ (WiredTiger Engine)                 |
|  - employees            - attendance_logs       - leaves                |
|  - jobs                 - candidates            - assets                |
|  - tickets              - goals                 - payroll_periods       |
+-------------------------------------------------------------------------+
```

---

## 2. Core Business Rules Engine (R1 - R10)

1. **R1 (Timezone & Attendance Date):**
   - Shift times and calendar dates are strictly IST (UTC+05:30).
   - A record's date is the IST calendar date of its `punch_in`.
   - **Overnight Shifts (`shift_end <= shift_start`):** If a punch-in occurs earlier than `shift_end`, it belongs to the shift that commenced on the previous calendar day, with shift end occurring on the subsequent calendar day.
   - Instants are truncated to whole seconds (`epoch_ms // 1000 * 1000`).

2. **R2 (Late Arrival Calculation):**
   - 10-minute grace period from `shift_start`.
   - Strictly late only if `punch_in > shift_start + 600s`.
   - `late_minutes = delay_seconds // 60` (floor of whole minutes from shift start, not from grace cutoff).

3. **R3 (Overtime Computation):**
   - Whole minutes (floor) from `shift_end` to `punch_out`.
   - Counted only if delay is at least 30 full minutes (`>= 30`); otherwise 0.

4. **R4 & R8 (Work Hours & Numeric Precision):**
   - Duration calculated as `(punch_out - punch_in) in seconds / 3600`.
   - Rounded to 2 decimal places using `Decimal.quantize(ROUND_HALF_UP)` to prevent banker's rounding discrepancies.

5. **R5 (Half-Day Qualification):**
   - `half_day = True` when rounded `work_hours < 4.50`.
   - A half day contributes 0.5 to `present_days`.

6. **R6 (Presence Classifications):**
   - `PRESENT`, `WFH`, and `ON_DUTY` count as present days.
   - `ABSENT` and `LEAVE` do not count as present.

7. **R7 & R9 (Working Days & Headcount):**
   - Working days count Monday through Friday between `max(joined_on, month_start)` and `month_end`.
   - Headcount includes every employee whose `joined_on <= period_end`, regardless of whether attendance logs exist.

8. **R10 (Bounded Pagination):**
   - 1-indexed pages (`skip = (page - 1) * page_size`).
   - Default page size: 20, max limit: 100. Total accurately reflects active filters.

---

## 3. Concurrency & Data Integrity Architecture

- **Race-Safe Punch-In:**
  Enforced via MongoDB unique compound index `{"emp_code": 1, "date": 1}`. Concurrent punch-in attempts are serialized at the storage engine level. Exactly one worker acquires the key and commits with HTTP 201; concurrent duplicate attempts raise `DuplicateKeyError`, caught cleanly and returned as HTTP 409 Conflict.

- **Race-Safe Punch-Out:**
  Executed via atomic `find_one_and_update({"_id": record_id, "punch_out": None}, {"$set": ...})`. If two requests attempt to close the same open punch record, only the first succeeds (HTTP 200); the second receives null and returns HTTP 409 Conflict.

- **Non-Destructive Regularization & Audit Trail (`history`):**
  Regularization recomputes all derived fields (`late_minutes`, `work_hours`, `overtime_minutes`, `half_day`). It computes an exact delta dictionary containing before-and-after values for fields that actually altered. The audit entry is atomically appended via `$push: {"history": history_entry}`.

---

## 4. Query Indexing Strategy & Performance

All queries are index-backed to guarantee index scans (`IXSCAN`) and eliminate full collection scans (`COLLSCAN`):

| Collection | Index Keys | Target Query / Rationale |
|---|---|---|
| `employees` | `{"emp_code": 1}` (Unique) | O(1) employee lookup and identity enforcement |
| `employees` | `{"department": 1, "joined_on": 1}` | Department filtering and headcount cross-collection joins |
| `attendance_logs` | `{"emp_code": 1, "date": 1}` (Unique) | Punch-in uniqueness and regularization lookups |
| `attendance_logs` | `{"date": -1, "emp_code": 1}` | Paginated `GET /attendance` listings |
| `attendance_logs` | `{"emp_code": 1, "punch_out": 1}` | O(1) lookup of active open punch records |
| `attendance_logs` | `{"date": 1, "status": 1, "late_minutes": 1}` | High-speed range aggregation for monthly and leaderboard queries |
