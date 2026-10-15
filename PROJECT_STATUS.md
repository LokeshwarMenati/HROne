# PROJECT STATUS — HROne Enterprise HRMS Platform

## 1. Project Overview & Architecture Status

- **Platform Name:** HROne Enterprise HRMS Platform
- **Baseline Assignment:** Candidate Kit v2.0 (Employee Attendance & Analytics API)
- **Status:** **Fully Implemented & Verified**
- **Runtime Stack:** Python 3.12, FastAPI, PyMongo 4.18, MongoDB 9.0.2 (Local on port 27017)
- **Frontend Stack:** HTML5, CSS3, Modern Vanilla JavaScript, Chart.js 4.4
- **Automated Tests:** 12 Passing Tests (`python -m pytest tests/test_assignment.py -v`)

---

## 2. Requirements & Verification Checklist

### Non-Negotiable Attendance Rules (R1 - R10)
- [x] **R1 (Timezone & Overnight Shifts):** IST (UTC+05:30) date derivation. Overnight shifts (`shift_end <= shift_start`) properly attribute early morning punch-ins to the previous calendar day. Timestamps truncated to whole seconds.
- [x] **R2 (Late Arrivals):** 10-minute grace period. Punch-in is late only if strictly > 10:00 (600s) after shift start. `late_minutes` is the whole floor minutes from shift start.
- [x] **R3 (Overtime):** Whole minutes from shift end to punch-out, counted only if delay >= 30 minutes; otherwise 0.
- [x] **R4 & R8 (Work Hours & Round-Half-Up):** Duration divided by 3,600, rounded to 2 decimals using decimal round-half-up semantics (`Decimal.quantize(ROUND_HALF_UP)`). Rates rounded to 4 decimals half-up.
- [x] **R5 (Half-Day):** After punch-out, marked true when work hours < 4.50. Counts as 0.5 present day.
- [x] **R6 (Presence Statuses):** `PRESENT`, `WFH`, `ON_DUTY` count as present; `ABSENT` and `LEAVE` do not.
- [x] **R7 & R9 (Working Days & Headcount):** Monday through Friday are working days. Headcount includes all employees joined on or before the period end date, even with zero attendance records.
- [x] **R10 (Bounded Pagination):** 1-indexed pages (`skip = (page - 1) * page_size`), default 20, max 100, with filtered totals.

### Required API Endpoints
- [x] `GET /health`: Returns 200 when MongoDB is connected, 503 if unavailable.
- [x] `POST /employees`: Validated employee creation with regex checks and 409 conflict handling.
- [x] `GET /employees`: Paginated employee directory filtered by department, sorted by `emp_code`.
- [x] `POST /attendance/punch-in`: Race-safe punch-in with IST shift date resolution and compound unique index protection.
- [x] `POST /attendance/punch-out`: Race-safe punch-out with open record lookup, work hours, overtime, and half-day calculation.
- [x] `GET /attendance`: Paginated attendance history with date and status filters, backed by compound index `(date, emp_code)`.
- [x] `PATCH /attendance/{emp_code}/{date}`: Non-destructive regularization recomputing derived fields and appending to atomic audit `history`.
- [x] `GET /analytics/employees/{emp_code}/monthly`: Monthly aggregation over attendance records.
- [x] `GET /analytics/departments/summary`: Cross-collection aggregation including 0-log employees and exact average across all records.
- [x] `GET /analytics/leaderboard/late`: MongoDB `$setWindowFields` standard competition ranking (1, 2, 2, 4) with ties preserved.
- [x] `GET /analytics/departments/{department}/trend`: Calendar day gap filling via `$densify` with 7-day moving average.
- [x] `GET /admin/explain/{endpoint}`: MongoDB executionStats output confirming index scans (`IXSCAN`) and zero collection scans (`COLLSCAN`).

### Enterprise HRMS Capabilities
- [x] **Web Application Shell:** Responsive corporate layout with collapsible sidebar, top navigation, search, and dark/light mode toggle.
- [x] **Role-Based Access Control (RBAC):** Persona switcher supporting Employee, Manager, HR Admin, Recruiter, Payroll, IT Admin, and Auditor.
- [x] **Employee Self-Service:** Real-time clock widget, personal activity feed, leave balance counter.
- [x] **Leave Management:** Applications, balance tracking (Earned, Sick, Casual), and Manager/HR approval workflow.
- [x] **Recruitment (ATS):** Requisitions, candidate hiring pipeline, and candidate-to-employee onboarding conversion.
- [x] **Payroll & Compensation:** Decimal-accurate salary structures and itemized payslip breakdown viewer.
- [x] **IT Asset Inventory:** Hardware allocation, serial tracking, and equipment return workflows.
- [x] **HR Helpdesk & KB:** Ticket tracking and official company policy knowledge base.
- [x] **Analytics & Explain Inspector:** Real-time Chart.js visual charts and executionStats MongoDB plan viewer.
- [x] **Secure Data Export:** CSV export with formula injection sanitization.

---

## 3. Deliverables Summary

- `app/main.py`: Complete application code complying with all constraints.
- `requirements.txt`: Clean dependencies list.
- `REVIEW.md`: Detailed audit of starter defects and fixes.
- `DECISIONS.md`: Concise answers to all five architectural prompts.
- `DATA_MODEL.md`: Complete database and collection schema.
- `SYSTEM_DESIGN.md`: Architecture and aggregation pipeline specifications.
- `PROJECT_STATUS.md`: Verification tracking and completed stages.
- `README.md`: Setup, execution, testing, and operational guide.
- `.env.example`: Safe environment configuration template.
- `tests/test_assignment.py`: 12 automated unit and integration tests.
- `static/`: Full enterprise frontend application (HTML, CSS, Vanilla JS, Chart.js).
