# HROne Enterprise HRMS Platform

HROne is an enterprise-grade Human Resource Management System built with **FastAPI**, **MongoDB 6.0+**, **PyMongo**, and a vanilla **HTML5/CSS3/JavaScript** frontend with **Chart.js** data visualizations.

---

## 1. Quick Start

### Prerequisites
- Python 3.11+
- MongoDB 6.0 or newer (local installation or MongoDB Atlas)

### Setup & Run
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment (optional, defaults to localhost:27017 and attendance_db)
cp .env.example .env

# 3. Seed sample data
python sample_seed.py

# 4. Start the server
uvicorn app.main:app --port 8000 --reload
```

Open your browser to:
- **Corporate Web Portal:** [http://localhost:8000/](http://localhost:8000/)
- **Interactive OpenAPI Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check:** [http://localhost:8000/health](http://localhost:8000/health)

---

## 2. Running Automated Tests

Run the full automated test suite covering all attendance rules (R1–R10), concurrency, boundary cases, analytics aggregation pipelines, and query explain plans:

```bash
python -m pytest tests/test_assignment.py -v
```

---

## 3. Architecture & Assigned Deliverables

| File | Description |
|---|---|
| `app/main.py` | Complete FastAPI application containing all core assignment endpoints and enterprise modules |
| `REVIEW.md` | Detailed review of starter code defects, failing scenarios, and applied fixes |
| `DECISIONS.md` | Architectural rationale on indexing, race safety, ties, headcount, and scale |
| `DATA_MODEL.md` | Complete database schema and MongoDB document models |
| `SYSTEM_DESIGN.md` | Architectural flow, pipeline specifications, and concurrency design |
| `PROJECT_STATUS.md` | Implementation stages, verification checklist, and completed features |
| `tests/test_assignment.py` | Automated Pytest test suite |
| `sample_seed.py` | Database seeder loading Extended JSON sample records |
| `static/` | Enterprise frontend application (CSS design system, API client, SPA controller) |

---

## 4. Attendance Rules Compliance (R1 - R10)

- **R1 (Timezone & Overnight Shifts):** All calendar dates and shifts evaluate in IST (UTC+05:30). Overnight shifts (`shift_end <= shift_start`) properly attribute early morning punch-ins to the previous calendar day. Timestamps are truncated to whole seconds.
- **R2 (Late Arrivals):** 10-minute grace period. Punch-in is late only if strictly > 10:00 (600s) after shift start. `late_minutes` is the whole floor minutes from shift start.
- **R3 (Overtime):** Whole minutes from shift end to punch-out, counted only if delay >= 30 minutes; otherwise 0.
- **R4 & R8 (Work Hours & Round-Half-Up):** Duration divided by 3,600, rounded to 2 decimals using decimal round-half-up semantics (`Decimal.quantize(ROUND_HALF_UP)`).
- **R5 (Half-Day):** After punch-out, marked true when work hours < 4.50. Counts as 0.5 present day.
- **R6 (Presence Statuses):** `PRESENT`, `WFH`, `ON_DUTY` count as present; `ABSENT` and `LEAVE` do not.
- **R7 & R9 (Working Days & Headcount):** Monday through Friday are working days. Headcount includes all employees joined on or before the period end date, even with zero attendance records.
- **R10 (Bounded Pagination):** 1-indexed pages, default 20, max 100, with filtered totals.

---

## 5. Enterprise Capabilities

- **Unified Web Portal:** Responsive corporate layout with collapsible sidebar, top navigation, search, and dark/light mode toggle.
- **Role-Based Access Control (RBAC):** Persona switcher supporting Employee, Manager, HR Admin, Recruiter, Payroll, and IT Admin.
- **Attendance Center:** Real-time clock-in/out, logs table, and regularization modal with full before/after audit history.
- **Leave Management:** Balance tracking (Earned, Sick, Casual) and approval workflows.
- **Recruitment (ATS):** Requisition postings, candidate tracking pipeline, and candidate-to-employee conversion.
- **Payroll & Compensation:** Decimal-accurate compensation structure and itemized payslip breakdown.
- **IT Asset Inventory:** Hardware allocation, serial number tracking, and equipment return workflows.
- **HR Helpdesk & KB:** Ticket tracking and official company policy knowledge base.
- **Analytics & Explain Inspector:** Real-time Chart.js visual charts and executionStats MongoDB plan viewer verifying `IXSCAN` usage.
# HROne
