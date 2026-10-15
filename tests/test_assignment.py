import os
import sys
import time
from datetime import datetime, timezone, timedelta

# Ensure workspace root is in python path
sys.path.insert(0, os.path.abspath("."))
os.environ["MONGO_DB"] = "attendance_test_db"

import pytest
from fastapi.testclient import TestClient
from pymongo import MongoClient

from app.main import (
    app, db, init_db_indexes,
    round_half_up, compute_late_minutes, compute_overtime,
    compute_work_hours, resolve_attendance_date, get_shift_datetimes
)

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_db():
    """Ensure clean test collections and initialized indexes before each test."""
    db.employees.delete_many({})
    db.attendance_logs.delete_many({})
    init_db_indexes()
    yield


# --------------------------------------------------------------------------- #
# Unit Tests for Rules R1 - R5
# --------------------------------------------------------------------------- #
def test_round_half_up():
    assert round_half_up(2.125, 2) == 2.13
    assert round_half_up(2.124, 2) == 2.12
    assert round_half_up(2.126, 2) == 2.13
    assert round_half_up(0.55555, 4) == 0.5556
    assert round_half_up(0.55554, 4) == 0.5555


def test_r2_late_minutes():
    IST = timezone(timedelta(hours=5, minutes=30))
    shift_start_dt = datetime(2026, 7, 6, 9, 30, 0, tzinfo=IST)

    # 09:40:00 -> within grace period (exact 10 min) -> 0
    p1 = datetime(2026, 7, 6, 9, 40, 0, tzinfo=IST)
    assert compute_late_minutes(p1, shift_start_dt) == 0

    # 09:40:01 -> strictly > 10 min -> 10 minutes
    p2 = datetime(2026, 7, 6, 9, 40, 1, tzinfo=IST)
    assert compute_late_minutes(p2, shift_start_dt) == 10

    # 10:15:59 -> 45 minutes
    p3 = datetime(2026, 7, 6, 10, 15, 59, tzinfo=IST)
    assert compute_late_minutes(p3, shift_start_dt) == 45


def test_r3_overtime():
    IST = timezone(timedelta(hours=5, minutes=30))
    shift_end_dt = datetime(2026, 7, 6, 18, 30, 0, tzinfo=IST)

    # 29 min after -> < 30 min -> 0
    p1 = datetime(2026, 7, 6, 18, 59, 59, tzinfo=IST)
    assert compute_overtime(p1, shift_end_dt) == 0

    # 30 min after -> 30
    p2 = datetime(2026, 7, 6, 19, 0, 0, tzinfo=IST)
    assert compute_overtime(p2, shift_end_dt) == 30

    # 45 min after -> 45
    p3 = datetime(2026, 7, 6, 19, 15, 0, tzinfo=IST)
    assert compute_overtime(p3, shift_end_dt) == 45


def test_r1_overnight_shifts():
    IST = timezone(timedelta(hours=5, minutes=30))

    # Overnight shift: 22:00 to 06:00
    # Punch-in at 21:55 on 2026-07-06 belongs to 2026-07-06
    p_in1 = datetime(2026, 7, 6, 21, 55, 0, tzinfo=IST)
    d1 = resolve_attendance_date(p_in1, "22:00", "06:00")
    assert d1 == "2026-07-06"

    # Punch-in at 02:00 on 2026-07-07 belongs to previous day 2026-07-06
    p_in2 = datetime(2026, 7, 7, 2, 0, 0, tzinfo=IST)
    d2 = resolve_attendance_date(p_in2, "22:00", "06:00")
    assert d2 == "2026-07-06"

    # Shift end date is next calendar day
    start_dt, end_dt = get_shift_datetimes(d2, "22:00", "06:00")
    assert start_dt == datetime(2026, 7, 6, 22, 0, 0, tzinfo=IST)
    assert end_dt == datetime(2026, 7, 7, 6, 0, 0, tzinfo=IST)


# --------------------------------------------------------------------------- #
# API Integration Tests
# --------------------------------------------------------------------------- #
def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_create_and_list_employees():
    emp_payload = {
        "emp_code": "EMP0001",
        "name": "Asha Rao",
        "email": "asha@example.com",
        "department": "Engineering",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-01-05"
    }
    r = client.post("/employees", json=emp_payload)
    assert r.status_code == 201
    data = r.json()
    assert data["emp_code"] == "EMP0001"
    assert isinstance(data["created_at"], int)

    # Duplicate 409
    r_dup = client.post("/employees", json=emp_payload)
    assert r_dup.status_code == 409

    # List
    r_list = client.get("/employees?department=Engineering")
    assert r_list.status_code == 200
    list_data = r_list.json()
    assert list_data["total"] == 1
    assert len(list_data["items"]) == 1
    assert list_data["items"][0]["emp_code"] == "EMP0001"


def test_punch_in_and_punch_out():
    # Setup employee
    client.post("/employees", json={
        "emp_code": "EMP0002",
        "name": "Bikram Roy",
        "email": "bikram@example.com",
        "department": "Sales",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-01-05"
    })

    # Punch in 2026-07-06 09:40:01 IST = 2026-07-06 04:10:01 UTC = 1783311001000 ms
    # 04:10:01 UTC
    dt_in = datetime(2026, 7, 6, 4, 10, 1, tzinfo=timezone.utc)
    in_ms = int(dt_in.timestamp() * 1000)

    r_in = client.post("/attendance/punch-in", json={
        "emp_code": "EMP0002",
        "punched_at": in_ms,
        "status": "PRESENT"
    })
    assert r_in.status_code == 201
    in_data = r_in.json()
    assert in_data["date"] == "2026-07-06"
    assert in_data["late_minutes"] == 10
    assert in_data["work_hours"] is None
    assert in_data["half_day"] is False

    # Duplicate punch in on same day -> 409
    r_dup = client.post("/attendance/punch-in", json={
        "emp_code": "EMP0002",
        "punched_at": in_ms + 10000,
        "status": "PRESENT"
    })
    assert r_dup.status_code == 409

    # Punch out at 13:40:01 UTC (19:10:01 IST: 40 min overtime)
    # 9.5 hours duration
    dt_out = datetime(2026, 7, 6, 13, 40, 1, tzinfo=timezone.utc)
    out_ms = int(dt_out.timestamp() * 1000)

    r_out = client.post("/attendance/punch-out", json={
        "emp_code": "EMP0002",
        "punched_at": out_ms
    })
    assert r_out.status_code == 200
    out_data = r_out.json()
    assert out_data["work_hours"] == 9.50
    assert out_data["overtime_minutes"] == 40
    assert out_data["half_day"] is False

    # Second punch out without open record -> 404
    r_out_again = client.post("/attendance/punch-out", json={
        "emp_code": "EMP0002",
        "punched_at": out_ms + 1000
    })
    assert r_out_again.status_code == 404


def test_regularize_and_audit_history():
    # Setup employee
    client.post("/employees", json={
        "emp_code": "EMP0003",
        "name": "Chitra Sen",
        "email": "chitra@example.com",
        "department": "Engineering",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-01-05"
    })

    # Punch in 10:05 IST (35 min late) -> 04:35 UTC
    dt_in = datetime(2026, 7, 6, 4, 35, 0, tzinfo=timezone.utc)
    client.post("/attendance/punch-in", json={
        "emp_code": "EMP0003",
        "punched_at": int(dt_in.timestamp() * 1000)
    })

    # Punch out 18:30 IST -> 13:00 UTC (work_hours = 8.42)
    dt_out = datetime(2026, 7, 6, 13, 0, 0, tzinfo=timezone.utc)
    client.post("/attendance/punch-out", json={
        "emp_code": "EMP0003",
        "punched_at": int(dt_out.timestamp() * 1000)
    })

    # Regularize: correct punch-in to 09:28 IST (03:58 UTC) -> late_minutes drops from 35 to 0
    new_in = datetime(2026, 7, 6, 3, 58, 0, tzinfo=timezone.utc)
    r_reg = client.patch("/attendance/EMP0003/2026-07-06", json={
        "punch_in": int(new_in.timestamp() * 1000),
        "reason": "Biometric machine scan issue",
        "regularized_by": "hr.manager"
    })
    assert r_reg.status_code == 200
    reg_data = r_reg.json()
    assert reg_data["late_minutes"] == 0
    assert len(reg_data["history"]) == 1

    h = reg_data["history"][0]
    assert h["by"] == "hr.manager"
    assert h["reason"] == "Biometric machine scan issue"
    assert "late_minutes" in h["changes"]
    assert h["changes"]["late_minutes"] == {"from": 35, "to": 0}
    assert isinstance(h["changes"]["punch_in"]["from"], int)
    assert isinstance(h["changes"]["punch_in"]["to"], int)


def test_analytics_and_explain():
    # Seed 2 employees
    client.post("/employees", json={
        "emp_code": "EMP0010",
        "name": "Dev Patel",
        "email": "dev@example.com",
        "department": "Engineering",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-07-01"
    })
    client.post("/employees", json={
        "emp_code": "EMP0011",
        "name": "Esha Roy",
        "email": "esha@example.com",
        "department": "Engineering",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-07-15"
    })

    # Record attendance for EMP0010 on 2026-07-06 (Mon)
    dt_in = datetime(2026, 7, 6, 4, 30, 0, tzinfo=timezone.utc)  # 10:00 IST -> 30 min late
    dt_out = datetime(2026, 7, 6, 13, 30, 0, tzinfo=timezone.utc) # 19:00 IST -> 30 min OT, 9.0 hrs
    client.post("/attendance/punch-in", json={"emp_code": "EMP0010", "punched_at": int(dt_in.timestamp() * 1000)})
    client.post("/attendance/punch-out", json={"emp_code": "EMP0010", "punched_at": int(dt_out.timestamp() * 1000)})

    # Test monthly analytics
    r_month = client.get("/analytics/employees/EMP0010/monthly?month=2026-07")
    assert r_month.status_code == 200
    m_data = r_month.json()
    assert m_data["present_days"] == 1.0
    assert m_data["late_count"] == 1
    assert m_data["total_late_minutes"] == 30
    assert m_data["total_overtime_minutes"] == 30

    # Test department summary (headcount includes EMP0011 even with 0 logs!)
    r_dept = client.get("/analytics/departments/summary?month=2026-07&department=Engineering")
    assert r_dept.status_code == 200
    d_data = r_dept.json()
    assert len(d_data["items"]) == 1
    assert d_data["items"][0]["headcount"] == 2
    assert d_data["items"][0]["present_days"] == 1.0
    assert d_data["items"][0]["avg_work_hours"] == 9.00

    # Test leaderboard
    r_lead = client.get("/analytics/leaderboard/late?month=2026-07")
    assert r_lead.status_code == 200
    lead_data = r_lead.json()
    assert len(lead_data["items"]) == 1
    assert lead_data["items"][0]["emp_code"] == "EMP0010"
    assert lead_data["items"][0]["rank"] == 1

    # Test department trend
    r_trend = client.get("/analytics/departments/Engineering/trend?from=2026-07-06&to=2026-07-08")
    assert r_trend.status_code == 200
    trend_data = r_trend.json()
    assert len(trend_data["items"]) == 3  # exactly 3 calendar days (6th, 7th, 8th)
    assert trend_data["items"][0]["date"] == "2026-07-06"
    assert trend_data["items"][0]["present_count"] == 1.0

    # Test explain endpoints
    endpoints_to_test = [
        ("attendance_list", {"emp_code": "EMP0010"}),
        ("employee_monthly", {"emp_code": "EMP0010", "month": "2026-07"}),
        ("department_summary", {"month": "2026-07"}),
        ("late_leaderboard", {"month": "2026-07"}),
        ("department_trend", {"department": "Engineering", "from": "2026-07-06", "to": "2026-07-08"})
    ]

    for ep, params in endpoints_to_test:
        r_exp = client.get(f"/admin/explain/{ep}", params=params)
        assert r_exp.status_code == 200, f"Explain failed for {ep}: {r_exp.text}"
        exp_json = r_exp.json()
        assert "explain" in exp_json
        assert exp_json["endpoint"] == ep


def test_concurrency_punch_in():
    from concurrent.futures import ThreadPoolExecutor

    client.post("/employees", json={
        "emp_code": "EMP0099",
        "name": "Race Tester",
        "email": "race@example.com",
        "department": "QA",
        "shift_start": "09:30",
        "shift_end": "18:30",
        "joined_on": "2026-01-01"
    })

    dt_in = datetime(2026, 7, 6, 4, 0, 0, tzinfo=timezone.utc)
    ms = int(dt_in.timestamp() * 1000)

    results = []

    def do_punch():
        # Fresh testclient for thread
        c = TestClient(app)
        return c.post("/attendance/punch-in", json={"emp_code": "EMP0099", "punched_at": ms})

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(do_punch) for _ in range(5)]
        for f in futures:
            results.append(f.result().status_code)

    # Exactly one 201 Created and the remaining four 409 Conflict
    assert results.count(201) == 1
    assert results.count(409) == 4


def test_leaderboard_ties():
    # Setup 4 employees with late logs in 2026-07
    emps = [
        ("EMP0101", "Alice", 60),
        ("EMP0102", "Bob", 40),
        ("EMP0103", "Charlie", 40),
        ("EMP0104", "David", 10),
    ]
    for code, name, late in emps:
        client.post("/employees", json={
            "emp_code": code,
            "name": name,
            "email": f"{name.lower()}@example.com",
            "department": "Finance",
            "shift_start": "09:30",
            "shift_end": "18:30",
            "joined_on": "2026-01-01"
        })
        # Directly insert attendance record to test competition ranking
        db.attendance_logs.insert_one({
            "emp_code": code,
            "date": "2026-07-06",
            "status": "PRESENT",
            "punch_in": datetime(2026, 7, 6, 4, 30, tzinfo=timezone.utc),
            "punch_out": None,
            "work_hours": None,
            "late_minutes": late,
            "overtime_minutes": 0,
            "half_day": False,
            "history": []
        })

    # Query with limit=2: Ranks are Alice: 1, Bob: 2, Charlie: 2, David: 4
    # With limit=2, since Bob and Charlie tie at rank 2 <= limit, both are returned (total 3 items)
    r = client.get("/analytics/leaderboard/late?month=2026-07&limit=2")
    assert r.status_code == 200
    data = r.json()
    items = data["items"]
    assert len(items) == 3
    assert items[0]["emp_code"] == "EMP0101"
    assert items[0]["rank"] == 1
    assert items[1]["emp_code"] == "EMP0102"
    assert items[1]["rank"] == 2
    assert items[2]["emp_code"] == "EMP0103"
    assert items[2]["rank"] == 2


def test_overnight_shift_sample_7():
    # DATA_MODEL.md sample 7:
    # Overnight shift (22:00 - 06:00)
    # Emp joined 2026-01-01. Punch-in 2026-07-06 21:55 IST (16:25 UTC).
    # Punch-out 2026-07-07 06:40 IST (01:10 UTC next day).
    # Expected: date: 2026-07-06, work_hours: 8.75, late_minutes: 0, overtime_minutes: 40, half_day: false
    client.post("/employees", json={
        "emp_code": "EMP0005",
        "name": "Overnight Tester",
        "email": "overnight@example.com",
        "department": "Security",
        "shift_start": "22:00",
        "shift_end": "06:00",
        "joined_on": "2026-01-01"
    })

    p_in = datetime(2026, 7, 6, 16, 25, 0, tzinfo=timezone.utc)
    p_out = datetime(2026, 7, 7, 1, 10, 0, tzinfo=timezone.utc)

    r_in = client.post("/attendance/punch-in", json={
        "emp_code": "EMP0005",
        "punched_at": int(p_in.timestamp() * 1000)
    })
    assert r_in.status_code == 201
    in_data = r_in.json()
    assert in_data["date"] == "2026-07-06"
    assert in_data["late_minutes"] == 0

    r_out = client.post("/attendance/punch-out", json={
        "emp_code": "EMP0005",
        "punched_at": int(p_out.timestamp() * 1000)
    })
    assert r_out.status_code == 200
    out_data = r_out.json()
    assert out_data["date"] == "2026-07-06"
    assert out_data["work_hours"] == 8.75
    assert out_data["overtime_minutes"] == 40
    assert out_data["half_day"] is False

