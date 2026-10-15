/**
 * HROne Enterprise HRMS — API Client & Communication Layer
 */

const API = {
  // Toast notifications
  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'danger' ? '✕' : 'ℹ';
    el.innerHTML = `
      <span style="font-weight: 700; font-size: 1.1rem;">${icon}</span>
      <div style="flex: 1; font-size: 0.85rem;">${message}</div>
    `;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, 4000);
  },

  _dbWarningShown: false,

  showDbBanner() {
    const banner = document.getElementById('db-status-banner');
    if (banner && !banner.hasChildNodes()) {
      banner.innerHTML = `
        <div style="margin: 1rem 2rem 0; padding: 0.9rem 1.25rem; border-radius: 8px; background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.35); color: var(--text-color); font-size: 0.875rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.3rem;">☁️</span>
            <div>
              <strong>Cloud Preview Mode (In-Memory Engine Active):</strong>
              Running with comprehensive enterprise demo data. Connect MongoDB Atlas by setting <code>MONGO_URI</code> in Vercel for persistent cloud database storage.
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <a href="https://vercel.com/dashboard" target="_blank" class="btn btn-secondary btn-sm" style="white-space: nowrap;">Vercel Settings ↗</a>
            <button class="btn-icon" style="font-size: 0.9rem; padding: 0.25rem;" onclick="document.getElementById('db-status-banner').innerHTML=''" title="Dismiss">✕</button>
          </div>
        </div>
      `;
    }
  },

  async request(url, options = {}) {
    try {
      const activeRole = (typeof AppState !== 'undefined' && AppState.user && AppState.user.role)
        ? AppState.user.role
        : (localStorage.getItem('hrone_role') || 'HR Admin');

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Role': activeRole,
          ...(options.headers || {})
        },
        ...options
      });

      if (!res.ok) {
        let errMsg = `Request failed (${res.status})`;
        try {
          const errData = await res.json();
          if (errData.detail) {
            if (Array.isArray(errData.detail)) {
              errMsg = errData.detail.map(d => `${d.loc ? d.loc.join('.') : ''}: ${d.msg}`).join(', ');
            } else {
              errMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
            }
          }
        } catch (_) {}

        if (errMsg.includes('Connection refused') || errMsg.includes('localhost:27017') || errMsg.includes('Database unavailable') || res.status === 503) {
          this.showDbBanner();
          if (!this._dbWarningShown) {
            this._dbWarningShown = true;
            this.toast('Cloud database not connected. Please set MONGO_URI in Vercel.', 'warning');
          }
        } else {
          this.toast(errMsg, 'danger');
        }
        throw new Error(errMsg);
      }

      return await res.json();
    } catch (err) {
      if (!err.message.includes('Connection refused') && !err.message.includes('localhost:27017') && !err.message.includes('Database unavailable')) {
        this.toast(err.message, 'danger');
      }
      throw err;
    }
  },

  // Core Assignment Endpoints
  getHealth() {
    return this.request('/health');
  },

  getEmployees(department = null, page = 1, pageSize = 20) {
    let url = `/employees?page=${page}&page_size=${pageSize}`;
    if (department) url += `&department=${encodeURIComponent(department)}`;
    return this.request(url);
  },

  createEmployee(payload) {
    return this.request('/employees', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  punchIn(empCode, punchedAt = null, status = 'PRESENT') {
    const body = { emp_code: empCode, status };
    if (punchedAt) body.punched_at = punchedAt;
    return this.request('/attendance/punch-in', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  punchOut(empCode, punchedAt = null) {
    const body = { emp_code: empCode };
    if (punchedAt) body.punched_at = punchedAt;
    return this.request('/attendance/punch-out', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  getAttendance(filters = {}) {
    const params = new URLSearchParams();
    if (filters.emp_code) params.set('emp_code', filters.emp_code);
    if (filters.date_from) params.set('date_from', filters.date_from);
    if (filters.date_to) params.set('date_to', filters.date_to);
    if (filters.status) params.set('status', filters.status);
    params.set('page', filters.page || 1);
    params.set('page_size', filters.page_size || 20);
    return this.request(`/attendance?${params.toString()}`);
  },

  regularizeAttendance(empCode, date, payload) {
    return this.request(`/attendance/${encodeURIComponent(empCode)}/${encodeURIComponent(date)}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  },

  getEmployeeMonthly(empCode, month) {
    return this.request(`/analytics/employees/${encodeURIComponent(empCode)}/monthly?month=${encodeURIComponent(month)}`);
  },

  getDepartmentSummary(month, department = null) {
    let url = `/analytics/departments/summary?month=${encodeURIComponent(month)}`;
    if (department) url += `&department=${encodeURIComponent(department)}`;
    return this.request(url);
  },

  getLateLeaderboard(month, limit = 10, department = null) {
    let url = `/analytics/leaderboard/late?month=${encodeURIComponent(month)}&limit=${limit}`;
    if (department) url += `&department=${encodeURIComponent(department)}`;
    return this.request(url);
  },

  getDepartmentTrend(department, fromDate, toDate) {
    return this.request(`/analytics/departments/${encodeURIComponent(department)}/trend?from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`);
  },

  getExplain(endpoint, params = {}) {
    const p = new URLSearchParams(params);
    return this.request(`/admin/explain/${encodeURIComponent(endpoint)}?${p.toString()}`);
  },

  // Enterprise Extensions
  getSession() {
    return this.request('/api/session');
  },

  switchRole(role) {
    try {
      localStorage.setItem('hrone_role', role);
    } catch (_) {}
    return this.request('/api/session/switch-role', {
      method: 'POST',
      headers: { 'X-Role': role },
      body: JSON.stringify({ role })
    });
  },

  getPersonas() {
    return this.request('/api/personas');
  },

  // Employee Self-Service
  getEmployeeMe() {
    return this.request('/api/employee/me');
  },

  requestAsset(payload) {
    return this.request('/api/employee/request-asset', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  requestRegularization(payload) {
    return this.request('/api/employee/request-regularization', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Manager Hub
  getManagerTeam() {
    return this.request('/api/manager/team');
  },

  getManagerApprovals() {
    return this.request('/api/manager/approvals');
  },

  actionManagerApproval(itemType, itemId, action, comments = '') {
    return this.request(`/api/manager/approvals/${encodeURIComponent(itemType)}/${encodeURIComponent(itemId)}`, {
      method: 'POST',
      body: JSON.stringify({ action, comments })
    });
  },

  // HR Operations
  getHrOverview() {
    return this.request('/api/hr/overview');
  },

  handleEmployeeLifecycle(empCode, payload) {
    return this.request(`/api/employees/${encodeURIComponent(empCode)}/lifecycle`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Leaves
  getLeaves(empCode = null, status = null) {
    let url = '/api/leaves';
    const params = new URLSearchParams();
    if (empCode) params.set('emp_code', empCode);
    if (status) params.set('status_filter', status);
    if ([...params].length) url += `?${params.toString()}`;
    return this.request(url);
  },

  applyLeave(payload) {
    return this.request('/api/leaves', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  actionLeave(leaveId, action, comments = '') {
    return this.request(`/api/leaves/${encodeURIComponent(leaveId)}/action?action=${encodeURIComponent(action)}&comments=${encodeURIComponent(comments)}`, {
      method: 'PATCH'
    });
  },

  getLeaveBalances(empCode) {
    return this.request(`/api/leaves/balances/${encodeURIComponent(empCode)}`);
  },

  // Recruitment
  getJobs() {
    return this.request('/api/recruitment/jobs');
  },

  createJob(payload) {
    return this.request('/api/recruitment/jobs', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  getCandidates(jobId = null, stage = null) {
    let url = '/api/recruitment/candidates';
    const params = new URLSearchParams();
    if (jobId) params.set('job_id', jobId);
    if (stage) params.set('stage', stage);
    if ([...params].length) url += `?${params.toString()}`;
    return this.request(url);
  },

  addCandidate(payload) {
    return this.request('/api/recruitment/candidates', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  updateCandidateStage(candId, stage) {
    return this.request(`/api/recruitment/candidates/${encodeURIComponent(candId)}/stage?stage=${encodeURIComponent(stage)}`, {
      method: 'PATCH'
    });
  },

  convertCandidate(candId) {
    return this.request(`/api/recruitment/candidates/${encodeURIComponent(candId)}/convert-to-employee`, {
      method: 'POST'
    });
  },

  getRecruitmentFunnel() {
    return this.request('/api/recruitment/funnel');
  },

  scheduleInterview(candId, payload) {
    return this.request(`/api/recruitment/candidates/${encodeURIComponent(candId)}/interview`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  generateOffer(candId, payload) {
    return this.request(`/api/recruitment/candidates/${encodeURIComponent(candId)}/offer`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Payroll
  getPayrollPeriods() {
    return this.request('/api/payroll/records');
  },

  getPayslip(empCode, month = '2026-07') {
    return this.request(`/api/payroll/payslips/${encodeURIComponent(empCode)}?month=${encodeURIComponent(month)}`);
  },

  executePayrollRun(month = '2026-07') {
    return this.request('/api/payroll/run', {
      method: 'POST',
      body: JSON.stringify({ month })
    });
  },

  getPayrollReconciliation() {
    return this.request('/api/payroll/reconciliation');
  },

  getSalaryStructures() {
    return this.request('/api/payroll/salary-structures');
  },

  // IT Assets
  getAssets(category = null) {
    let url = '/api/assets';
    if (category) url += `?category=${encodeURIComponent(category)}`;
    return this.request(url);
  },

  addAsset(payload) {
    return this.request('/api/assets', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  assignAsset(assetId, empCode) {
    return this.request(`/api/assets/${encodeURIComponent(assetId)}/assign?emp_code=${encodeURIComponent(empCode)}`, {
      method: 'POST'
    });
  },

  transferAsset(assetId, toEmpCode, notes = '') {
    return this.request(`/api/assets/${encodeURIComponent(assetId)}/transfer`, {
      method: 'POST',
      body: JSON.stringify({ to_emp_code: toEmpCode, notes })
    });
  },

  returnAsset(assetId) {
    return this.request(`/api/assets/${encodeURIComponent(assetId)}/return`, {
      method: 'POST'
    });
  },

  retireAsset(assetId, reason) {
    return this.request(`/api/assets/${encodeURIComponent(assetId)}/retire`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  },

  getOffboardingClearance(empCode) {
    return this.request(`/api/assets/offboarding-clearance/${encodeURIComponent(empCode)}`);
  },

  getAssetRequests(status = null) {
    let url = '/api/assets/requests';
    if (status) url += `?status_filter=${encodeURIComponent(status)}`;
    return this.request(url);
  },

  actionAssetRequest(requestId, action, assignedAssetTag = null, notes = '') {
    return this.request(`/api/assets/requests/${encodeURIComponent(requestId)}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, assigned_asset_tag: assignedAssetTag, notes })
    });
  },

  getWarrantyAlerts() {
    return this.request('/api/assets/warranty-alerts');
  },

  // Audit & Governance
  getAuditLogs(action = null, actorCode = null, limit = 100) {
    let url = `/api/audit/logs?limit=${limit}`;
    if (action) url += `&action=${encodeURIComponent(action)}`;
    if (actorCode) url += `&actor_code=${encodeURIComponent(actorCode)}`;
    return this.request(url);
  },

  getComplianceScorecard() {
    return this.request('/api/audit/scorecard');
  },

  // Learning & Policies
  getCourses() {
    return this.request('/api/learning/courses');
  },

  enrollCourse(courseId) {
    return this.request(`/api/learning/courses/${encodeURIComponent(courseId)}/enroll`, { method: 'POST' });
  },

  completeCourse(courseId) {
    return this.request(`/api/learning/courses/${encodeURIComponent(courseId)}/complete`, { method: 'POST' });
  },

  getPolicies() {
    return this.request('/api/policies');
  },

  acknowledgePolicy(policyId) {
    return this.request(`/api/policies/${encodeURIComponent(policyId)}/acknowledge`, { method: 'POST' });
  },

  // Expenses
  getExpenses(empCode = null, status = null) {
    let url = '/api/expenses';
    const params = new URLSearchParams();
    if (empCode) params.set('emp_code', empCode);
    if (status) params.set('status_filter', status);
    if ([...params].length) url += `?${params.toString()}`;
    return this.request(url);
  },

  submitExpense(payload) {
    return this.request('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  actionExpense(expenseId, action, comments = '') {
    return this.request(`/api/expenses/${encodeURIComponent(expenseId)}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, comments })
    });
  },

  // Helpdesk
  getTickets(empCode = null) {
    let url = '/api/helpdesk/tickets';
    if (empCode) url += `?emp_code=${encodeURIComponent(empCode)}`;
    return this.request(url);
  },

  createTicket(payload) {
    return this.request('/api/helpdesk/tickets', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  resolveTicket(ticketId, resolution) {
    return this.request(`/api/helpdesk/tickets/${encodeURIComponent(ticketId)}?status_val=RESOLVED&resolution=${encodeURIComponent(resolution)}`, {
      method: 'PATCH'
    });
  },

  getKnowledgeBase(q = null) {
    let url = '/api/helpdesk/kb';
    if (q) url += `?q=${encodeURIComponent(q)}`;
    return this.request(url);
  },

  // Platform
  getPlatformMetrics() {
    return this.request('/api/platform/metrics');
  },

  omniSearch(query) {
    return this.request(`/api/search?q=${encodeURIComponent(query)}`);
  },

  seedEnterprise() {
    return this.request('/api/seed-enterprise', { method: 'POST' });
  },

  getPowerBiSampleDataset() {
    return this.request('/api/powerbi/sample-dataset');
  }
};
