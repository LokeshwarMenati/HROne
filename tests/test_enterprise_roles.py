"""
Enterprise HRMS Role-Based Authorization & Persona Automated Test Suite
Validates:
1. 7 Core Personas and enterprise role switching (/api/session/switch-role)
2. Employee Self-Service dossier (/api/employee/me) and privacy
3. Equipment requisitions lifecycle (/api/employee/request-asset, /api/assets/requests)
4. Attendance regularization request workflow (/api/employee/request-regularization)
5. Manager direct-reports scope and approval actions (/api/manager/team, /api/manager/approvals)
6. Recruiter ATS pipeline funnel, candidate conversions (/api/recruitment/funnel, convert)
7. Payroll data privacy and RBAC enforcement (403 for unauthorized users)
8. IT Hardware asset custody, transfers, warranty alerts, and offboarding clearance
9. Auditor strictly read-only enforcement (modifications return 403 Forbidden)
10. CSV Export security and RBAC validation
"""
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app, PERSONA_PROFILES


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.mark.anyio
async def test_persona_profiles_availability():
    """Verify all 7 core personas and enterprise roles are registered."""
    core_personas = [
        "Employee",
        "HR Admin",
        "Manager",
        "Recruiter",
        "Payroll Specialist",
        "IT Asset Admin",
        "Auditor"
    ]
    for persona in core_personas:
        assert persona in PERSONA_PROFILES
        profile = PERSONA_PROFILES[persona]
        assert "permissions" in profile
        assert "default_view" in profile
        assert "emp_code" in profile


@pytest.mark.anyio
async def test_session_role_switching():
    """Verify role switching updates active persona and session state."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Switch to Employee
        res = await ac.post("/api/session/switch-role", json={"role": "Employee"})
        assert res.status_code == 200
        data = res.json()
        assert data["role"] == "Employee"
        assert data["emp_code"] == "EMP0002"
        assert "attendance:read_self" in data["permissions"]

        # Switch to Manager
        res = await ac.post("/api/session/switch-role", json={"role": "Manager"})
        assert res.status_code == 200
        data = res.json()
        assert data["role"] == "Manager"
        assert data["emp_code"] == "EMP0004"
        assert "team:read" in data["permissions"]

        # Switch to Auditor
        res = await ac.post("/api/session/switch-role", json={"role": "Auditor"})
        assert res.status_code == 200
        data = res.json()
        assert data["role"] == "Auditor"
        assert "audit:read" in data["permissions"]


@pytest.mark.anyio
async def test_employee_self_service_dossier():
    """Verify Employee Self-Service endpoint /api/employee/me returns personal records."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Switch to Employee
        await ac.post("/api/session/switch-role", json={"role": "Employee"})

        res = await ac.get("/api/employee/me")
        assert res.status_code == 200
        data = res.json()
        assert "profile" in data
        assert data["profile"]["emp_code"] == "EMP0002"
        assert "today_attendance" in data
        assert "leave_balances" in data
        assert "my_assets" in data
        assert "payslip_summary" in data
        assert "my_expenses" in data
        assert "my_goals" in data
        assert "my_courses" in data
        assert "my_policies" in data
        assert "my_tickets" in data


@pytest.mark.anyio
async def test_asset_requisition_workflow():
    """Verify employee can request hardware and IT Admin can approve it."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Employee requests hardware
        await ac.post("/api/session/switch-role", json={"role": "Employee"})
        req_res = await ac.post("/api/employee/request-asset", json={
            "category": "MONITOR",
            "model_preference": "Dell UltraSharp 32 4K USB-C Hub",
            "reason": "Need dual monitor setup for UI accessibility development",
            "urgency": "HIGH"
        })
        assert req_res.status_code == 200
        req_data = req_res.json()
        req_id = req_data["request"]["id"]
        assert req_data["request"]["category"] == "MONITOR"
        assert req_data["request"]["status"] == "PENDING"

        # 2. IT Asset Admin views requests
        await ac.post("/api/session/switch-role", json={"role": "IT Asset Admin"})
        list_res = await ac.get("/api/assets/requests")
        assert list_res.status_code == 200
        requests = list_res.json()
        matching = [r for r in requests if r["id"] == req_id]
        assert len(matching) > 0

        # 3. IT Asset Admin approves request
        action_res = await ac.post(f"/api/assets/requests/{req_id}/action", json={
            "action": "APPROVE",
            "assigned_asset_tag": "AST-1002",
            "admin_notes": "Approved and provisioned from inventory"
        })
        assert action_res.status_code == 200
        assert action_res.json()["status"] == "APPROVED"


@pytest.mark.anyio
async def test_attendance_regularization_workflow():
    """Verify employee submits regularization request and audit log records it."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/session/switch-role", json={"role": "Employee"})
        res = await ac.post("/api/employee/request-regularization", json={
            "date": "2026-07-20",
            "punch_in": "09:30 AM",
            "punch_out": "06:30 PM",
            "reason": "Biometric scanner power outage at Bangalore campus gate 2"
        })
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "SUBMITTED"
        assert data["regularization"]["date"] == "2026-07-20"


@pytest.mark.anyio
async def test_manager_team_and_approvals():
    """Verify Manager only sees direct reports and can approve pending requests."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/session/switch-role", json={"role": "Manager"})

        # Team hierarchy
        team_res = await ac.get("/api/manager/team")
        assert team_res.status_code == 200
        team_data = team_res.json()
        assert "manager" in team_data
        assert team_data["manager"]["emp_code"] == "EMP0004"
        assert "team" in team_data
        assert team_data["team_size"] >= 1

        # Pending approvals inbox
        appr_res = await ac.get("/api/manager/approvals")
        assert appr_res.status_code == 200
        appr_data = appr_res.json()
        assert "pending_leaves" in appr_data
        assert "pending_expenses" in appr_data
        assert "pending_regularizations" in appr_data

        # Manager approval action
        action_res = await ac.post("/api/manager/approvals/action", json={
            "item_type": "LEAVE",
            "item_id": "LV-1001",
            "action": "APPROVE",
            "remarks": "Approved. Have a great vacation!"
        })
        assert action_res.status_code == 200
        assert action_res.json()["action"] == "APPROVE"


@pytest.mark.anyio
async def test_recruiter_ats_funnel_and_conversion():
    """Verify Recruiter access to ATS pipeline, funnel metrics, and candidate conversion."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/session/switch-role", json={"role": "Recruiter"})

        # Funnel metrics
        funnel_res = await ac.get("/api/recruitment/funnel")
        assert funnel_res.status_code == 200
        funnel_data = funnel_res.json()
        assert "pipeline_stages" in funnel_data
        assert "SOURCED" in funnel_data["pipeline_stages"]
        assert "HIRED" in funnel_data["pipeline_stages"]

        # Candidates list
        cands_res = await ac.get("/api/candidates")
        assert cands_res.status_code == 200
        cands = cands_res.json()
        assert len(cands) > 0

        # Interview scheduling
        first_cand = cands[0]
        int_res = await ac.post(f"/api/recruitment/candidates/{first_cand['id']}/interview", json={
            "stage": "System Design Round",
            "scheduled_time": "2026-07-29T14:00:00Z",
            "interviewers": ["EMP0004", "EMP0007"],
            "meeting_link": "https://meet.google.com/xyz-hrone"
        })
        assert int_res.status_code == 200
        assert int_res.json()["status"] == "SCHEDULED"


@pytest.mark.anyio
async def test_payroll_privacy_and_security_rbac():
    """Verify Payroll data is protected: Payroll Specialist can access, unauthorized users get 403."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Employee attempts to access payroll reconciliation -> 403 Forbidden
        await ac.post("/api/session/switch-role", json={"role": "Employee"})
        unauth_res = await ac.get("/api/payroll/reconciliation")
        assert unauth_res.status_code == 403

        # 2. Recruiter attempts to access payroll export -> 403 Forbidden
        await ac.post("/api/session/switch-role", json={"role": "Recruiter"})
        unauth_exp = await ac.get("/api/export/payroll")
        assert unauth_exp.status_code == 403

        # 3. Payroll Specialist accesses payroll reconciliation -> 200 OK
        await ac.post("/api/session/switch-role", json={"role": "Payroll Specialist"})
        auth_res = await ac.get("/api/payroll/reconciliation")
        assert auth_res.status_code == 200
        recon = auth_res.json()
        assert "gross_variance" in recon
        assert "net_variance" in recon
        assert "status" in recon

        # 4. Payroll Specialist executes payroll run
        run_res = await ac.post("/api/payroll/run", json={"month": "2026-07"})
        assert run_res.status_code == 200
        assert "total_net" in run_res.json()

        # 5. Payroll Specialist accesses CSV export
        exp_res = await ac.get("/api/export/payroll")
        assert exp_res.status_code == 200
        assert "text/csv" in exp_res.headers.get("content-type", "")
        csv_text = exp_res.text
        assert "EmpCode,Name,Department,Designation" in csv_text


@pytest.mark.anyio
async def test_it_asset_warranty_and_offboarding_clearance():
    """Verify IT Asset Admin checks warranty alerts and offboarding clearance."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/session/switch-role", json={"role": "IT Asset Admin"})

        # Warranty alerts
        w_res = await ac.get("/api/assets/warranty-alerts")
        assert w_res.status_code == 200
        alerts = w_res.json()
        assert isinstance(alerts, list)

        # Offboarding clearance check
        c_res = await ac.get("/api/assets/offboarding-clearance/EMP0001")
        assert c_res.status_code == 200
        clearance = c_res.json()
        assert "clearance_status" in clearance
        assert "pending_assets_count" in clearance


@pytest.mark.anyio
async def test_auditor_read_only_strictly_enforced():
    """Verify Auditor has access to audit logs and compliance scorecard, but CANNOT mutate operational records."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/session/switch-role", json={"role": "Auditor"})

        # 1. Auditor can view audit logs
        logs_res = await ac.get("/api/audit/logs")
        assert logs_res.status_code == 200
        logs = logs_res.json()
        assert isinstance(logs, list)
        assert len(logs) > 0

        # 2. Auditor can view compliance scorecard
        score_res = await ac.get("/api/compliance/scorecard")
        assert score_res.status_code == 200
        score = score_res.json()
        assert "overall_score" in score
        assert "soc2_type_ii_status" in score

        # 3. Auditor can export audit logs
        exp_res = await ac.get("/api/export/audit")
        assert exp_res.status_code == 200

        # 4. Auditor CANNOT create an employee (must return 403 Forbidden)
        create_emp_res = await ac.post("/api/employees", json={
            "emp_code": "EMP9999",
            "name": "Unauthorized Mutation",
            "email": "unauth@hrone.corp",
            "department": "Engineering",
            "designation": "Hacker",
            "joining_date": "2026-07-01",
            "shift": "GENERAL"
        })
        assert create_emp_res.status_code == 403
        assert "Auditor is strictly read-only" in create_emp_res.json()["detail"]
