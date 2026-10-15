/**
 * HROne Enterprise HRMS — Main Application Controller & SPA Views
 * Role-Based Multinational Enterprise Architecture
 */

// Centralized Role & Navigation Matrix
const ROLE_CONFIG = {
  "HR Admin": {
    defaultView: "hr-dashboard",
    navSections: [
      {
        title: "Executive Operations",
        items: [
          { id: "nav-hr-dashboard", view: "hr-dashboard", label: "HR Dashboard", icon: "🏛️" },
          { id: "nav-employees", view: "employees", label: "Employee Directory", icon: "👥" },
          { id: "nav-attendance", view: "attendance", label: "Attendance Exceptions", icon: "⏱️" },
          { id: "nav-leaves", view: "leaves", label: "Leave Administration", icon: "🏖️" }
        ]
      },
      {
        title: "Talent & Strategy",
        items: [
          { id: "nav-recruitment", view: "recruitment", label: "Recruitment Oversight", icon: "🎯" },
          { id: "nav-helpdesk", view: "helpdesk", label: "HR Helpdesk & Policies", icon: "🎫" },
          { id: "nav-analytics", view: "analytics", label: "Workforce Analytics", icon: "📊" },
          { id: "nav-powerbi", view: "powerbi", label: "PowerBI Studio", icon: "📈" }
        ]
      }
    ]
  },
  "Employee": {
    defaultView: "employee-dashboard",
    navSections: [
      {
        title: "Personal Workspace",
        items: [
          { id: "nav-emp-dash", view: "employee-dashboard", label: "My Workspace", icon: "🏠" },
          { id: "nav-emp-att", view: "attendance", label: "My Attendance", icon: "⏱️" },
          { id: "nav-emp-leaves", view: "leaves", label: "My Leaves", icon: "🏖️" },
          { id: "nav-emp-payslip", view: "employee-payslip", label: "My Payslips", icon: "💳" }
        ]
      },
      {
        title: "Growth & Equipment",
        items: [
          { id: "nav-emp-assets", view: "employee-assets", label: "My Assigned Assets", icon: "💻" },
          { id: "nav-emp-expenses", view: "employee-expenses", label: "Expense Claims", icon: "🧾" },
          { id: "nav-emp-learning", view: "employee-learning", label: "Learning & Policies", icon: "🎓" },
          { id: "nav-emp-helpdesk", view: "helpdesk", label: "HR Helpdesk", icon: "🎫" }
        ]
      }
    ]
  },
  "Manager": {
    defaultView: "manager-dashboard",
    navSections: [
      {
        title: "Team Leadership",
        items: [
          { id: "nav-mgr-dash", view: "manager-dashboard", label: "Team Dashboard", icon: "👥" },
          { id: "nav-mgr-team", view: "manager-team", label: "My Team Roster", icon: "📋" },
          { id: "nav-mgr-attendance", view: "attendance", label: "Team Attendance", icon: "⏱️" },
          { id: "nav-mgr-approvals", view: "manager-approvals", label: "Approval Inbox", icon: "✅" }
        ]
      },
      {
        title: "Operations & Tasks",
        items: [
          { id: "nav-mgr-leaves", view: "leaves", label: "Team Leave Calendar", icon: "🏖️" },
          { id: "nav-mgr-expenses", view: "manager-expenses", label: "Expense Approvals", icon: "🧾" },
          { id: "nav-mgr-analytics", view: "analytics", label: "Team Analytics", icon: "📊" }
        ]
      }
    ]
  },
  "Recruiter": {
    defaultView: "recruiter-dashboard",
    navSections: [
      {
        title: "Talent Acquisition",
        items: [
          { id: "nav-rec-dash", view: "recruiter-dashboard", label: "Recruitment Dashboard", icon: "🎯" },
          { id: "nav-rec-jobs", view: "recruiter-jobs", label: "Job Requisitions", icon: "💼" },
          { id: "nav-rec-candidates", view: "recruitment", label: "Candidate Pipeline", icon: "👤" }
        ]
      },
      {
        title: "Interviews & Reports",
        items: [
          { id: "nav-rec-interviews", view: "recruiter-interviews", label: "Interview Schedule", icon: "📅" },
          { id: "nav-rec-analytics", view: "analytics", label: "Hiring Funnel Analytics", icon: "📊" }
        ]
      }
    ]
  },
  "Payroll Specialist": {
    defaultView: "payroll-dashboard",
    navSections: [
      {
        title: "Payroll Operations",
        items: [
          { id: "nav-pay-dash", view: "payroll-dashboard", label: "Payroll Dashboard", icon: "💳" },
          { id: "nav-pay-periods", view: "payroll", label: "Payroll Processing Runs", icon: "📅" },
          { id: "nav-pay-compensation", view: "payroll-compensation", label: "Compensation Structures", icon: "🪙" }
        ]
      },
      {
        title: "Audit & Reconciliation",
        items: [
          { id: "nav-pay-reconcile", view: "payroll-reconciliation", label: "Reconciliation", icon: "⚖️" },
          { id: "nav-pay-reports", view: "analytics", label: "Compensation Reports", icon: "📊" }
        ]
      }
    ]
  },
  "IT Asset Admin": {
    defaultView: "asset-dashboard",
    navSections: [
      {
        title: "IT Equipment Operations",
        items: [
          { id: "nav-asset-dash", view: "asset-dashboard", label: "Hardware Dashboard", icon: "💻" },
          { id: "nav-assets-inv", view: "assets", label: "Device Inventory", icon: "🖥️" },
          { id: "nav-asset-requests", view: "asset-requests", label: "Equipment Requisitions", icon: "📥" }
        ]
      },
      {
        title: "Lifecycle & Governance",
        items: [
          { id: "nav-asset-clearance", view: "asset-clearance", label: "Offboarding Clearances", icon: "🛡️" },
          { id: "nav-asset-warranty", view: "asset-warranty", label: "Warranty Alerts", icon: "🔔" }
        ]
      }
    ]
  },
  "Auditor": {
    defaultView: "auditor-dashboard",
    navSections: [
      {
        title: "Governance & Audit",
        items: [
          { id: "nav-audit-dash", view: "auditor-dashboard", label: "Compliance Dashboard", icon: "🛡️" },
          { id: "nav-audit-logs", view: "auditor-logs", label: "Immutable Audit Ledger", icon: "📜" },
          { id: "nav-audit-scorecard", view: "auditor-scorecard", label: "Compliance Scorecard", icon: "📋" }
        ]
      },
      {
        title: "Inspection Oversight",
        items: [
          { id: "nav-audit-att", view: "attendance", label: "Attendance Regularizations", icon: "⏱️" },
          { id: "nav-audit-emp", view: "employees", label: "Employee Record Audits", icon: "👥" }
        ]
      }
    ]
  },
  "Company Administrator": {
    defaultView: "hr-dashboard",
    navSections: [
      {
        title: "Executive Command",
        items: [
          { id: "nav-ca-dash", view: "hr-dashboard", label: "Executive Dashboard", icon: "🏛️" },
          { id: "nav-ca-emp", view: "employees", label: "Global Workforce Directory", icon: "👥" },
          { id: "nav-ca-att", view: "attendance", label: "Attendance Control", icon: "⏱️" },
          { id: "nav-ca-pay", view: "payroll", label: "Payroll Overview", icon: "💳" }
        ]
      },
      {
        title: "Global Intelligence",
        items: [
          { id: "nav-ca-analytics", view: "analytics", label: "Executive Analytics", icon: "📊" },
          { id: "nav-ca-powerbi", view: "powerbi", label: "PowerBI Studio", icon: "📈" },
          { id: "nav-ca-audit", view: "auditor-dashboard", label: "Audit & Risk Ledger", icon: "🛡️" }
        ]
      }
    ]
  },
  "Company Admin": {
    defaultView: "hr-dashboard",
    navSections: [
      {
        title: "Executive Command",
        items: [
          { id: "nav-ca-dash", view: "hr-dashboard", label: "Executive Dashboard", icon: "🏛️" },
          { id: "nav-ca-emp", view: "employees", label: "Global Workforce Directory", icon: "👥" },
          { id: "nav-ca-att", view: "attendance", label: "Attendance Control", icon: "⏱️" },
          { id: "nav-ca-pay", view: "payroll", label: "Payroll Overview", icon: "💳" }
        ]
      },
      {
        title: "Global Intelligence",
        items: [
          { id: "nav-ca-analytics", view: "analytics", label: "Executive Analytics", icon: "📊" },
          { id: "nav-ca-powerbi", view: "powerbi", label: "PowerBI Studio", icon: "📈" },
          { id: "nav-ca-audit", view: "auditor-dashboard", label: "Audit & Risk Ledger", icon: "🛡️" }
        ]
      }
    ]
  },
  "Platform Administrator": {
    defaultView: "platform-dashboard",
    navSections: [
      {
        title: "Platform Infrastructure",
        items: [
          { id: "nav-pa-dash", view: "platform-dashboard", label: "System Health & Metrics", icon: "🖥️" },
          { id: "nav-pa-db", view: "analytics", label: "Query Execution Plans", icon: "⚡" },
          { id: "nav-pa-audit", view: "auditor-dashboard", label: "Platform Security Logs", icon: "📜" }
        ]
      }
    ]
  },
  "Finance Approver": {
    defaultView: "payroll-dashboard",
    navSections: [
      {
        title: "Financial Governance",
        items: [
          { id: "nav-fa-dash", view: "payroll-dashboard", label: "Financial Compensation Hub", icon: "💳" },
          { id: "nav-fa-reconcile", view: "payroll-reconciliation", label: "Period Reconciliation", icon: "⚖️" },
          { id: "nav-fa-expenses", view: "manager-expenses", label: "Expense Reimbursements", icon: "🧾" }
        ]
      }
    ]
  },
  "Learning Administrator": {
    defaultView: "hr-dashboard",
    navSections: [
      {
        title: "L&D Academy",
        items: [
          { id: "nav-la-dash", view: "employee-learning", label: "Course Curriculum", icon: "🎓" },
          { id: "nav-la-analytics", view: "analytics", label: "Training Completion Stats", icon: "📊" },
          { id: "nav-la-policies", view: "helpdesk", label: "Compliance Mandates", icon: "📋" }
        ]
      }
    ]
  },
  "Compliance Officer": {
    defaultView: "auditor-dashboard",
    navSections: [
      {
        title: "Risk & Mandates",
        items: [
          { id: "nav-co-dash", view: "auditor-dashboard", label: "Compliance Scorecard", icon: "🛡️" },
          { id: "nav-co-logs", view: "auditor-logs", label: "Audit Trails", icon: "📜" },
          { id: "nav-co-policies", view: "helpdesk", label: "Policy Governance", icon: "⚖️" }
        ]
      }
    ]
  },
  "HR Business Partner": {
    defaultView: "hr-dashboard",
    navSections: [
      {
        title: "People Strategy",
        items: [
          { id: "nav-hrbp-dash", view: "hr-dashboard", label: "Workforce Overview", icon: "👥" },
          { id: "nav-hrbp-emp", view: "employees", label: "Talent Roster", icon: "📋" },
          { id: "nav-hrbp-analytics", view: "analytics", label: "Retention Analytics", icon: "📊" }
        ]
      }
    ]
  },
  "Department Head": {
    defaultView: "manager-dashboard",
    navSections: [
      {
        title: "Department Strategy",
        items: [
          { id: "nav-dh-dash", view: "manager-dashboard", label: "Department Dashboard", icon: "👥" },
          { id: "nav-dh-att", view: "attendance", label: "Department Attendance", icon: "⏱️" },
          { id: "nav-dh-analytics", view: "analytics", label: "Productivity Metrics", icon: "📊" }
        ]
      }
    ]
  }
};

// Application State
const AppState = {
  currentView: 'dashboard',
  user: {
    emp_code: 'EMP0001',
    name: 'Asha Rao',
    role: 'HR Admin',
    department: 'Engineering / HR Executive'
  },
  theme: localStorage.getItem('hrone_theme') || 'light',
  clockInterval: null,
  activeCharts: {}
};

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await loadSession();
  setupGlobalSearch();
  setupClock();
});

function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (themeToggle) {
    themeToggle.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('hrone_theme', AppState.theme);
      themeToggle.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
      if (AppState.currentView === 'analytics') {
        renderAnalyticsView();
      }
    });
  }
}

async function loadSession() {
  try {
    const session = await API.getSession();
    AppState.user = session;
    updateUserDisplay();
    updateSidebarNavigation(AppState.user.role);
    const defaultView = (ROLE_CONFIG[AppState.user.role] && ROLE_CONFIG[AppState.user.role].defaultView) || 'hr-dashboard';
    navigate(defaultView);
  } catch (err) {
    console.error('Session load failed:', err);
    updateSidebarNavigation('HR Admin');
    navigate('hr-dashboard');
  }
}

function updateUserDisplay() {
  const nameEl = document.getElementById('header-user-name');
  const roleEl = document.getElementById('header-user-role');
  const avatarEl = document.getElementById('header-user-avatar');
  const roleSelect = document.getElementById('role-switcher');

  if (nameEl) nameEl.textContent = AppState.user.name;
  if (roleEl) roleEl.textContent = AppState.user.role;
  if (avatarEl) {
    const initials = AppState.user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    avatarEl.textContent = initials;
  }
  if (roleSelect) {
    roleSelect.value = AppState.user.role;
    roleSelect.onchange = async (e) => {
      const newRole = e.target.value;
      try {
        const updated = await API.switchRole(newRole);
        AppState.user = updated;
        updateUserDisplay();
        updateSidebarNavigation(newRole);
        const targetView = (ROLE_CONFIG[newRole] && ROLE_CONFIG[newRole].defaultView) || 'hr-dashboard';
        API.toast(`Persona switched to ${newRole} (${updated.name})`, 'success');
        navigate(targetView);
      } catch (err) {
        API.toast(`Role switch failed: ${err.message}`, 'danger');
      }
    };
  }
}

function updateSidebarNavigation(role) {
  const container = document.getElementById('sidebar-nav-container');
  if (!container) return;

  const config = ROLE_CONFIG[role] || ROLE_CONFIG['HR Admin'];
  let html = '';

  config.navSections.forEach(sec => {
    html += `<div class="nav-section-title">${sec.title}</div>`;
    sec.items.forEach(item => {
      const isActive = AppState.currentView === item.view;
      html += `
        <a class="nav-item ${isActive ? 'active' : ''}" data-view="${item.view}" id="${item.id}">
          <i>${item.icon}</i>
          <span>${item.label}</span>
          ${item.badge ? `<span class="badge ${item.badgeClass || ''}">${item.badge}</span>` : ''}
        </a>
      `;
    });
  });

  container.innerHTML = html;

  // Re-bind navigation listeners
  container.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.getAttribute('data-view');
      navigate(view);
    });
  });
}

function navigate(viewName) {
  if (viewName === 'dashboard') {
    viewName = (ROLE_CONFIG[AppState.user.role] && ROLE_CONFIG[AppState.user.role].defaultView) || 'hr-dashboard';
  }

  AppState.currentView = viewName;

  // Update active state in sidebar
  document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === viewName);
  });

  // Update breadcrumb
  const breadcrumb = document.getElementById('current-breadcrumb');
  if (breadcrumb) {
    const formatted = viewName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    breadcrumb.textContent = formatted;
  }

  // Clear any existing chart instances to avoid canvas reuse errors
  Object.values(AppState.activeCharts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') chart.destroy();
  });
  AppState.activeCharts = {};

  const content = document.getElementById('page-container');
  if (!content) return;

  // Role permissions check
  const role = AppState.user.role;
  if (role === 'Employee' && ['payroll', 'recruitment', 'asset-dashboard', 'payroll-dashboard'].includes(viewName)) {
    renderUnauthorizedView(content, 'This administrative module is restricted from general employee self-service access.');
    return;
  }

  // View Router
  switch (viewName) {
    // Dedicated Dashboards
    case 'employee-dashboard':
      renderEmployeeDashboard(content);
      break;
    case 'hr-dashboard':
      renderHRAdminDashboard(content);
      break;
    case 'manager-dashboard':
      renderManagerDashboard(content);
      break;
    case 'recruiter-dashboard':
      renderRecruiterDashboard(content);
      break;
    case 'payroll-dashboard':
      renderPayrollDashboard(content);
      break;
    case 'asset-dashboard':
      renderITAssetDashboard(content);
      break;
    case 'auditor-dashboard':
      renderAuditorDashboard(content);
      break;
    case 'platform-dashboard':
      renderPlatformDashboard(content);
      break;

    // Sub-views & Specialized Persona Hubs
    case 'employee-payslip':
      renderEmployeePayslipView(content);
      break;
    case 'employee-assets':
      renderEmployeeAssetsView(content);
      break;
    case 'employee-expenses':
      renderEmployeeExpensesView(content);
      break;
    case 'employee-learning':
      renderEmployeeLearningView(content);
      break;
    case 'manager-team':
      renderManagerTeamView(content);
      break;
    case 'manager-approvals':
      renderManagerApprovalsView(content);
      break;
    case 'manager-expenses':
      renderManagerExpensesView(content);
      break;
    case 'recruiter-jobs':
      renderRecruiterJobsView(content);
      break;
    case 'recruiter-interviews':
      renderRecruiterInterviewsView(content);
      break;
    case 'payroll-compensation':
      renderPayrollCompensationView(content);
      break;
    case 'payroll-reconciliation':
      renderPayrollReconciliationView(content);
      break;
    case 'asset-requests':
      renderAssetRequestsView(content);
      break;
    case 'asset-clearance':
      renderAssetClearanceView(content);
      break;
    case 'asset-warranty':
      renderAssetWarrantyView(content);
      break;
    case 'auditor-logs':
      renderAuditorLogsView(content);
      break;
    case 'auditor-scorecard':
      renderAuditorScorecardView(content);
      break;

    // Core Shared Modules
    case 'employees':
      renderEmployeesView(content);
      break;
    case 'attendance':
      renderAttendanceView(content);
      break;
    case 'leaves':
      renderLeavesView(content);
      break;
    case 'recruitment':
      renderRecruitmentView(content);
      break;
    case 'payroll':
      renderPayrollView(content);
      break;
    case 'assets':
      renderAssetsView(content);
      break;
    case 'helpdesk':
      renderHelpdeskView(content);
      break;
    case 'analytics':
      renderAnalyticsView(content);
      break;
    case 'powerbi':
      renderPowerbiView(content);
      break;
    default:
      renderHRAdminDashboard(content);
  }
}

function setupClock() {
  if (AppState.clockInterval) {
    clearInterval(AppState.clockInterval);
    AppState.clockInterval = null;
  }
  const update = () => {
    const clockEl = document.getElementById('widget-live-clock');
    if (clockEl) {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      clockEl.textContent = istString;
    }
  };
  update();
  AppState.clockInterval = setInterval(update, 1000);
}

function renderUnauthorizedView(container, message) {
  container.innerHTML = `
    <div class="empty-state-box" style="margin-top: 4rem;">
      <div class="empty-state-icon">🔒</div>
      <div class="empty-state-title" style="font-size: 1.3rem;">403 Access Forbidden</div>
      <div class="empty-state-desc" style="margin: 0.5rem auto 1.5rem;">${message}</div>
      <button class="btn btn-primary" onclick="navigate('dashboard')">Return to My Dashboard</button>
    </div>
  `;
}

// --------------------------------------------------------------------------- //
// 1. PERSONA: Employee Self-Service Dashboard
// --------------------------------------------------------------------------- //
async function renderEmployeeDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Employee Self-Service & Workspace</h1>
        <p id="emp-greeting-desc">Personal attendance clock, leave balances, compensation, and active company requests.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openRequestAssetModal()">💻 Request IT Asset</button>
        <button class="btn btn-secondary" onclick="openSubmitExpenseModal()">🧾 Claim Expense</button>
        <button class="btn btn-primary" onclick="openApplyLeaveModal()">+ Apply Leave</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Attendance Clock Widget -->
      <div class="card clock-widget-card" style="grid-column: span 3;">
        <div style="font-size: 0.8rem; font-weight: 700; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Real-Time Clock (IST)</div>
        <div id="widget-live-clock" class="clock-time-display">--:--:--</div>
        <div id="punch-status-badge" style="font-size: 0.85rem; margin-bottom: 0.75rem;">Status: <span class="badge badge-present">Checking...</span></div>
        <div class="clock-actions">
          <button class="btn btn-success" id="btn-punch-in" onclick="handlePunchIn()">⏱️ Punch In</button>
          <button class="btn btn-danger" id="btn-punch-out" onclick="handlePunchOut()">🏁 Punch Out</button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">📅</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-emp-work-hours">--</span>
          <span class="stat-label">Work Hours (This Month)</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">🏖️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-emp-leave-bal">--</span>
          <span class="stat-label">Remaining Leave Balance</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">🪙</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-emp-net-pay">--</span>
          <span class="stat-label">July Projected Net Salary</span>
        </div>
      </div>

      <!-- Quick Action / Tasks Carousel -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Pending Action Items & Policy Mandates</div>
            <div class="card-subtitle">Required compliance, training courses, and onboarding steps</div>
          </div>
        </div>
        <div id="emp-tasks-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; padding: 0.5rem 0;">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading tasks...</div>
        </div>
      </div>

      <!-- Recent Attendance Records -->
      <div class="card" style="grid-column: span 8;">
        <div class="card-header">
          <div>
            <div class="card-title">Personal Attendance Trail (Recent Shifts)</div>
            <div class="card-subtitle">Validated IST punch history with half-day and overtime indicators</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="navigate('attendance')">View All Logs</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Work Hours</th>
                <th>Late (Min)</th>
                <th>Regularize</th>
              </tr>
            </thead>
            <tbody id="emp-dash-attendance-body">
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading logs...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Corporate Announcements & Profile Card -->
      <div class="card" style="grid-column: span 4;">
        <div class="card-header">
          <div class="card-title">Announcements & Profile</div>
        </div>
        <div id="emp-dash-profile-info" style="margin-bottom: 1rem; font-size: 0.85rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
          <!-- Injected dynamically -->
        </div>
        <div id="emp-dash-announcements" style="display: flex; flex-direction: column; gap: 0.75rem;">
          <!-- Injected dynamically -->
        </div>
      </div>
    </div>
  `;

  setupClock();

  try {
    const data = await API.getEmployeeMe();

    // Greeting
    const greeting = document.getElementById('emp-greeting-desc');
    if (greeting) {
      greeting.textContent = `Welcome back, ${data.profile.name} (${data.profile.emp_code}) — ${data.profile.designation}, ${data.profile.department}. Shift: ${data.profile.shift_start} to ${data.profile.shift_end}.`;
    }

    // Stats
    const workHoursEl = document.getElementById('stat-emp-work-hours');
    if (workHoursEl) workHoursEl.textContent = `${data.month_summary.total_work_hours}h (${data.month_summary.present_days}d)`;

    const leaveBalEl = document.getElementById('stat-emp-leave-bal');
    if (leaveBalEl) leaveBalEl.textContent = `${data.leave_balances.total} Days`;

    const netPayEl = document.getElementById('stat-emp-net-pay');
    if (netPayEl) netPayEl.textContent = `₹${data.payslip_summary.net_pay.toLocaleString('en-IN')}`;

    // Punch status
    const badgeEl = document.getElementById('punch-status-badge');
    const btnIn = document.getElementById('btn-punch-in');
    const btnOut = document.getElementById('btn-punch-out');
    const att = data.today_attendance;

    if (att.status === 'PRESENT' && att.punch_in && !att.punch_out) {
      if (badgeEl) badgeEl.innerHTML = `Status: <span class="badge badge-present">Punched In (${att.punch_in})</span>`;
      if (btnIn) btnIn.disabled = true;
      if (btnOut) btnOut.disabled = false;
    } else if (att.status === 'PRESENT' && att.punch_out) {
      if (badgeEl) badgeEl.innerHTML = `Status: <span class="badge badge-wfh">Shift Completed (${att.work_hours.toFixed(2)}h)</span>`;
      if (btnIn) btnIn.disabled = true;
      if (btnOut) btnOut.disabled = true;
    } else {
      if (badgeEl) badgeEl.innerHTML = `Status: <span class="badge badge-leave">Not Punched In Today</span>`;
      if (btnIn) btnIn.disabled = false;
      if (btnOut) btnOut.disabled = true;
    }

    // Attendance Table
    const attBody = document.getElementById('emp-dash-attendance-body');
    if (attBody) {
      if (data.month_summary.logs.length === 0) {
        attBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No attendance records found yet.</td></tr>';
      } else {
        attBody.innerHTML = data.month_summary.logs.map(l => `
          <tr>
            <td style="font-weight: 600;">${l.date}</td>
            <td><span class="badge badge-${l.status.toLowerCase()}">${l.status}</span></td>
            <td>${l.punch_in}</td>
            <td>${l.punch_out}</td>
            <td>${l.work_hours > 0 ? l.work_hours.toFixed(2) + 'h' : '--'}</td>
            <td>${l.late_minutes > 0 ? `<span style="color: var(--danger); font-weight: 700;">${l.late_minutes} min</span>` : '0'}</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="openRequestRegularizationModal('${l.date}', '${l.punch_in}', '${l.punch_out}')">✏️ Edit</button>
            </td>
          </tr>
        `).join('');
      }
    }

    // Tasks container
    const tasksContainer = document.getElementById('emp-tasks-container');
    if (tasksContainer) {
      if (data.tasks.length === 0) {
        tasksContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">🎉 You have no pending compliance or training tasks. Everything is up to date!</div>';
      } else {
        tasksContainer.innerHTML = data.tasks.map(t => `
          <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid ${t.priority === 'HIGH' ? 'var(--danger)' : 'var(--primary-500)'};">
            <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">${t.title}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <span>Deadline: ${t.due_date}</span>
              ${t.action_type === 'POLICY' ? `<button class="btn btn-primary btn-sm" onclick="handlePolicyAcknowledge('${t.ref_id}')">Sign</button>` : `<button class="btn btn-primary btn-sm" onclick="handleCourseComplete('${t.ref_id}')">Complete</button>`}
            </div>
          </div>
        `).join('');
      }
    }

    // Profile & Announcements
    const profileInfo = document.getElementById('emp-dash-profile-info');
    if (profileInfo) {
      profileInfo.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-muted);">Manager:</span>
          <strong>David Miller (EMP0004)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span style="color: var(--text-muted);">Location:</span>
          <span>${data.profile.location}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Hardware:</span>
          <span>${data.my_assets.length} devices assigned</span>
        </div>
      `;
    }

    const annEl = document.getElementById('emp-dash-announcements');
    if (annEl) {
      annEl.innerHTML = data.announcements.map(a => `
        <div style="background: var(--bg-surface-alt); padding: 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-500);">
          <div style="font-weight: 600; font-size: 0.8rem;">${a.title}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${a.summary}</div>
        </div>
      `).join('');
    }

  } catch (err) {
    console.error('Employee dashboard load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// 2. PERSONA: HR Admin Operations Dashboard
// --------------------------------------------------------------------------- //
async function renderHRAdminDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>HR Operations & Global Workforce Command Center</h1>
        <p>Enterprise headcount oversight, workforce demographics, lifecycle workflows, and exceptions.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openEmployeeLifecycleModal()">🔄 Employee Lifecycle</button>
        <button class="btn btn-secondary" onclick="seedEnterpriseData()">🔄 Reset Demo Seed</button>
        <button class="btn btn-primary" onclick="openAddEmployeeModal()">+ Add Employee</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Headcount KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">👥</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-hr-headcount">--</span>
          <span class="stat-label">Total Headcount</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">⏱️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-hr-present">--</span>
          <span class="stat-label">Today's Present Staff</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">🛡️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-hr-probation">--</span>
          <span class="stat-label">Staff on Probation</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon danger">🎫</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-hr-tickets">--</span>
          <span class="stat-label">Open Helpdesk Tickets</span>
        </div>
      </div>

      <!-- Department Distribution Chart -->
      <div class="card" style="grid-column: span 6;">
        <div class="card-header">
          <div>
            <div class="card-title">Department Workforce Distribution</div>
            <div class="card-subtitle">Headcount allocation across business units</div>
          </div>
        </div>
        <div style="height: 260px; position: relative;">
          <canvas id="hr-dept-dist-chart"></canvas>
        </div>
      </div>

      <!-- Quick Operations Queue -->
      <div class="card" style="grid-column: span 6;">
        <div class="card-header">
          <div>
            <div class="card-title">Operational Exceptions & Queues</div>
            <div class="card-subtitle">Pending reviews requiring HR action</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;" id="hr-queues-list">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading queue stats...</div>
        </div>
      </div>

      <!-- Employee Directory Table -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Active Employee Directory (Overview)</div>
            <div class="card-subtitle">Complete employee records, department bindings, and shift allocations</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="window.location.href='/api/export/employees'">📥 Export CSV</button>
            <button class="btn btn-secondary btn-sm" onclick="navigate('employees')">Full Directory</button>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Shift Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="hr-dash-employees-body">
              <tr><td colspan="8" style="text-align: center; color: var(--text-muted);">Loading employees...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  try {
    const [overview, empList] = await Promise.all([
      API.getHrOverview(),
      API.getEmployees(null, 1, 6)
    ]);

    const hcEl = document.getElementById('stat-hr-headcount');
    if (hcEl) hcEl.textContent = `${overview.headcount} Staff`;

    const prEl = document.getElementById('stat-hr-present');
    if (prEl) prEl.textContent = `${overview.today_attendance.present} (${overview.today_attendance.wfh} WFH)`;

    const pbEl = document.getElementById('stat-hr-probation');
    if (pbEl) pbEl.textContent = `${overview.probation_count} Active`;

    const tkEl = document.getElementById('stat-hr-tickets');
    if (tkEl) tkEl.textContent = `${overview.open_tickets} Open`;

    // Department Chart
    const deptCanvas = document.getElementById('hr-dept-dist-chart');
    if (deptCanvas && typeof Chart !== 'undefined') {
      const labels = Object.keys(overview.department_distribution);
      const data = Object.values(overview.department_distribution);
      AppState.activeCharts.hrDept = new Chart(deptCanvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right' } }
        }
      });
    }

    // Queues
    const qList = document.getElementById('hr-queues-list');
    if (qList) {
      qList.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
          <span>⏱️ Attendance Regularization Requests</span>
          <span class="badge badge-warning">${overview.pending_regularizations} Pending</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
          <span>🎯 Active Job Requisitions Open</span>
          <span class="badge badge-present">${overview.open_jobs} Open</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
          <span>🎫 Unresolved HR Helpdesk Inquiries</span>
          <span class="badge badge-danger">${overview.open_tickets} Active</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
          <span>📈 12-Month Workforce Retention Rate</span>
          <span class="badge badge-present">${overview.retention_rate_pct}%</span>
        </div>
      `;
    }

    // Employees Table
    const empBody = document.getElementById('hr-dash-employees-body');
    if (empBody && empList.items) {
      empBody.innerHTML = empList.items.map(e => `
        <tr>
          <td style="font-weight: 700; color: var(--primary-600);">${e.emp_code}</td>
          <td style="font-weight: 600;">${e.name}</td>
          <td style="color: var(--text-muted);">${e.email}</td>
          <td>${e.department}</td>
          <td>${e.designation || 'Staff'}</td>
          <td>${e.shift_start} - ${e.shift_end}</td>
          <td><span class="badge badge-present">CONFIRMED</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="openEmployeeLifecycleModal('${e.emp_code}')">Lifecycle</button>
          </td>
        </tr>
      `).join('');
    }

  } catch (err) {
    console.error('HR Admin dashboard load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// 3. PERSONA: Manager Team Management Dashboard
// --------------------------------------------------------------------------- //
async function renderManagerDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Team Leadership & Approvals Hub</h1>
        <p>Direct reports monitoring, today's team attendance, organizational hierarchy, and unified approval decisions.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="navigate('leaves')">🏖️ Team Leave Calendar</button>
        <button class="btn btn-primary" onclick="navigate('manager-approvals')">✅ Review Approvals Inbox</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Team KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">👥</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-mgr-team-count">--</span>
          <span class="stat-label">Direct Reports</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">⏱️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-mgr-team-present">--</span>
          <span class="stat-label">Present Today</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">✅</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-mgr-approvals-count">--</span>
          <span class="stat-label">Pending Decisions</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">🎯</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-mgr-goals-count">--</span>
          <span class="stat-label">Active Team Goals</span>
        </div>
      </div>

      <!-- High Priority Approvals Inbox -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Unified Approval Decisions Inbox</div>
            <div class="card-subtitle">Pending leaves, attendance regularizations, and corporate expense reimbursement claims</div>
          </div>
        </div>
        <div id="mgr-approvals-inbox-content">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading pending requests...</div>
        </div>
      </div>

      <!-- Direct Reports Roster -->
      <div class="card" style="grid-column: span 8;">
        <div class="card-header">
          <div>
            <div class="card-title">Direct Reports Team Roster & Today's Shift Status</div>
            <div class="card-subtitle">Real-time attendance logs and leave allocations</div>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Today's Status</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Active Goals</th>
              </tr>
            </thead>
            <tbody id="mgr-team-roster-body">
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading team...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Organizational Hierarchy Card -->
      <div class="card" style="grid-column: span 4;">
        <div class="card-header">
          <div class="card-title">Reporting Hierarchy</div>
        </div>
        <div class="org-chart-container" id="mgr-org-hierarchy">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `;

  try {
    const [teamData, approvals] = await Promise.all([
      API.getManagerTeam(),
      API.getManagerApprovals()
    ]);

    const countEl = document.getElementById('stat-mgr-team-count');
    if (countEl) countEl.textContent = `${teamData.team_count} Members`;

    const presentCount = teamData.team.filter(t => t.today_status === 'PRESENT' || t.today_status === 'WFH').length;
    const presEl = document.getElementById('stat-mgr-team-present');
    if (presEl) presEl.textContent = `${presentCount} / ${teamData.team_count}`;

    const appCountEl = document.getElementById('stat-mgr-approvals-count');
    if (appCountEl) appCountEl.textContent = `${approvals.total_pending} Pending`;

    const totalGoals = teamData.team.reduce((acc, t) => acc + (t.active_goals_count || 0), 0);
    const goalsEl = document.getElementById('stat-mgr-goals-count');
    if (goalsEl) goalsEl.textContent = `${totalGoals} OKRs`;

    // Approvals Inbox
    const inbox = document.getElementById('mgr-approvals-inbox-content');
    if (inbox) {
      if (approvals.total_pending === 0) {
        inbox.innerHTML = '<div style="color: var(--text-muted); padding: 1rem; text-align: center;">🎉 All clear! No pending approval requests requiring your decision.</div>';
      } else {
        let itemsHtml = '';
        // Leaves
        approvals.leaves.forEach(l => {
          itemsHtml += `
            <div class="approval-item-card">
              <div class="approval-item-header">
                <div>
                  <strong>🏖️ Leave Request: ${l.name} (${l.emp_code})</strong>
                  <span class="badge badge-warning" style="margin-left: 0.5rem;">${l.leave_type} (${l.days} days)</span>
                </div>
                <div class="approval-item-meta">From: ${l.start_date} to ${l.end_date}</div>
              </div>
              <div class="approval-item-body">Reason: "${l.reason}"</div>
              <div class="approval-item-actions">
                <button class="btn btn-danger btn-sm" onclick="handleManagerAction('leaves', '${l.id}', 'REJECT')">✕ Reject</button>
                <button class="btn btn-success btn-sm" onclick="handleManagerAction('leaves', '${l.id}', 'APPROVE')">✓ Approve Leave</button>
              </div>
            </div>
          `;
        });
        // Expenses
        approvals.expenses.forEach(e => {
          itemsHtml += `
            <div class="approval-item-card">
              <div class="approval-item-header">
                <div>
                  <strong>🧾 Expense Claim: ${e.name} (${e.emp_code})</strong>
                  <span class="badge badge-info" style="margin-left: 0.5rem;">${e.category}</span>
                </div>
                <div class="approval-item-meta">Amount: ₹${e.amount} (${e.date})</div>
              </div>
              <div class="approval-item-body">Merchant: ${e.merchant} — "${e.description}"</div>
              <div class="approval-item-actions">
                <button class="btn btn-danger btn-sm" onclick="handleManagerAction('expenses', '${e.id}', 'REJECT')">✕ Reject</button>
                <button class="btn btn-success btn-sm" onclick="handleManagerAction('expenses', '${e.id}', 'APPROVE')">✓ Approve Expense</button>
              </div>
            </div>
          `;
        });
        inbox.innerHTML = itemsHtml;
      }
    }

    // Team Roster Table
    const rosterBody = document.getElementById('mgr-team-roster-body');
    if (rosterBody) {
      rosterBody.innerHTML = teamData.team.map(t => `
        <tr>
          <td style="font-weight: 700; color: var(--primary-600);">${t.emp_code}</td>
          <td style="font-weight: 600;">${t.name}</td>
          <td>${t.designation}</td>
          <td><span class="badge badge-${t.today_status.toLowerCase()}">${t.today_status}</span></td>
          <td>${t.punch_in_time || '--'}</td>
          <td>${t.punch_out_time || '--'}</td>
          <td>${t.active_goals_count} Active</td>
        </tr>
      `).join('');
    }

    // Org hierarchy
    const orgEl = document.getElementById('mgr-org-hierarchy');
    if (orgEl) {
      orgEl.innerHTML = `
        <div class="org-node root-node">
          <strong>${teamData.manager_name}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Director of Engineering</div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">↓ Direct Reports (${teamData.team_count})</div>
        <div class="org-children-grid">
          ${teamData.team.slice(0, 4).map(t => `
            <div class="org-node">
              <div style="font-weight: 600; font-size: 0.85rem;">${t.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">${t.designation}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

  } catch (err) {
    console.error('Manager dashboard load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// 4. PERSONA: Recruiter Talent Acquisition Dashboard
// --------------------------------------------------------------------------- //
async function renderRecruiterDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Talent Acquisition & ATS Command Studio</h1>
        <p>Job requisitions, candidate pipeline tracking, interview scorecards, and seamless employee onboarding conversion.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openAddCandidateModal()">+ Add Candidate</button>
        <button class="btn btn-primary" onclick="openAddJobModal()">+ Create Requisition</button>
      </div>
    </div>

    <!-- Visual Recruitment Pipeline Funnel -->
    <div class="pipeline-track" id="recruiter-funnel-track">
      <div class="pipeline-stage-card"><div class="pipeline-stage-count" id="funnel-sourced">--</div><div class="pipeline-stage-name">Sourced</div></div>
      <div class="pipeline-stage-card"><div class="pipeline-stage-count" id="funnel-screening">--</div><div class="pipeline-stage-name">Screening</div></div>
      <div class="pipeline-stage-card"><div class="pipeline-stage-count" id="funnel-interview">--</div><div class="pipeline-stage-name">Interview</div></div>
      <div class="pipeline-stage-card"><div class="pipeline-stage-count" id="funnel-offer">--</div><div class="pipeline-stage-name">Offer</div></div>
      <div class="pipeline-stage-card"><div class="pipeline-stage-count" id="funnel-hired">--</div><div class="pipeline-stage-name">Hired</div></div>
    </div>

    <div class="dashboard-grid">
      <!-- Active Candidates Table -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Candidate Pipeline & Stage Transitions</div>
            <div class="card-subtitle">Manage applicant lifecycle and convert hired candidates into employees with 1 click</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="navigate('recruitment')">Full ATS Grid</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Applying Position</th>
                <th>Experience</th>
                <th>Current Stage</th>
                <th>Score</th>
                <th>Stage Advance</th>
                <th>Onboarding Handoff</th>
              </tr>
            </thead>
            <tbody id="rec-dash-candidates-body">
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading candidates...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Job Requisitions Overview -->
      <div class="card" style="grid-column: span 7;">
        <div class="card-header">
          <div class="card-title">Active Job Requisitions</div>
          <button class="btn btn-secondary btn-sm" onclick="openAddJobModal()">+ New Job</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Openings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="rec-dash-jobs-body">
              <tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Loading jobs...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Upcoming Interview Schedule -->
      <div class="card" style="grid-column: span 5;">
        <div class="card-header">
          <div class="card-title">Scheduled Interview Panels</div>
        </div>
        <div id="rec-dash-interviews-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading interview schedules...</div>
        </div>
      </div>
    </div>
  `;

  try {
    const [funnel, cands, jobs] = await Promise.all([
      API.getRecruitmentFunnel(),
      API.getCandidates(),
      API.getJobs()
    ]);

    // Funnel Counts
    const setF = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count !== undefined ? count : 0;
    };
    setF('funnel-sourced', funnel.pipeline_stages.SOURCED);
    setF('funnel-screening', funnel.pipeline_stages.SCREENING);
    setF('funnel-interview', funnel.pipeline_stages.INTERVIEW);
    setF('funnel-offer', funnel.pipeline_stages.OFFER);
    setF('funnel-hired', funnel.pipeline_stages.HIRED);

    // Candidates Table
    const cBody = document.getElementById('rec-dash-candidates-body');
    if (cBody) {
      if (cands.length === 0) {
        cBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No candidates currently in ATS. Click "+ Add Candidate" above.</td></tr>';
      } else {
        cBody.innerHTML = cands.map(c => `
          <tr>
            <td style="font-weight: 600;">${c.name}</td>
            <td>${c.role}</td>
            <td>${c.experience_years ? c.experience_years + ' yrs' : '4 yrs'}</td>
            <td><span class="badge badge-${c.stage.toLowerCase()}">${c.stage}</span></td>
            <td><strong style="color: var(--primary-600);">${c.rating ? c.rating + ' ★' : '4.5 ★'}</strong></td>
            <td>
              <select class="form-control" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onchange="handleCandidateStageChange('${c.id}', this.value)">
                <option value="Sourced" ${c.stage === 'Sourced' ? 'selected' : ''}>Sourced</option>
                <option value="Screening" ${c.stage === 'Screening' ? 'selected' : ''}>Screening</option>
                <option value="Interview" ${c.stage === 'Interview' ? 'selected' : ''}>Interview</option>
                <option value="Offer" ${c.stage === 'Offer' ? 'selected' : ''}>Offer</option>
                <option value="Hired" ${c.stage === 'Hired' ? 'selected' : ''}>Hired</option>
                <option value="Rejected" ${c.stage === 'Rejected' ? 'selected' : ''}>Rejected</option>
              </select>
            </td>
            <td>
              ${c.stage === 'Hired' ? `<span class="badge badge-present">✓ Converted</span>` : `<button class="btn btn-primary btn-sm" onclick="handleConvertToEmployee('${c.id}')">🚀 Convert to Staff</button>`}
            </td>
          </tr>
        `).join('');
      }
    }

    // Jobs Table
    const jBody = document.getElementById('rec-dash-jobs-body');
    if (jBody && jobs.length) {
      jBody.innerHTML = jobs.map(j => `
        <tr>
          <td style="font-weight: 600;">${j.title}</td>
          <td>${j.department}</td>
          <td>${j.openings}</td>
          <td><span class="badge badge-present">${j.status}</span></td>
        </tr>
      `).join('');
    }

    // Interview Schedule List
    const intList = document.getElementById('rec-dash-interviews-list');
    if (intList) {
      intList.innerHTML = `
        <div style="background: var(--bg-surface-alt); padding: 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-500);">
          <div style="font-weight: 600; font-size: 0.85rem;">Rohan Kulkarni — DevOps Engineer</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Panel: David Miller | Systems Deep Dive | Tomorrow 11:00 AM IST</div>
        </div>
        <div style="background: var(--bg-surface-alt); padding: 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--secondary);">
          <div style="font-weight: 600; font-size: 0.85rem;">Priya Nair — Staff Cloud Architect</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Panel: Architecture Committee | Screening Round | Friday 3:00 PM IST</div>
        </div>
      `;
    }

  } catch (err) {
    console.error('Recruiter dashboard load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// 5. PERSONA: Payroll Specialist Operations Dashboard
// --------------------------------------------------------------------------- //
async function renderPayrollDashboard(container) {
  container.innerHTML = `
    <div class="security-banner security-warning">
      <span>🔒</span>
      <span>Confidential Financial Surface: Role-Based Access Control enforced under SOC2 Type II compliance rules. Live decimal-safe financial calculations.</span>
    </div>

    <div class="page-header">
      <div class="page-title-group">
        <h1>Payroll Operations & Compensation Console</h1>
        <p>Decimal-safe salary component calculation, statutory deductions (EPF, PT, TDS), reconciliation, and authorized export.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="window.location.href='/api/export/payroll'">📥 Export Payroll CSV</button>
        <button class="btn btn-primary" onclick="openExecutePayrollModal()">⚡ Execute Payroll Run</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Payroll KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">📅</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-pay-period">July 2026</span>
          <span class="stat-label">Active Payroll Cycle</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">💳</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-pay-gross">--</span>
          <span class="stat-label">Total Monthly Gross</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">🪙</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-pay-net">--</span>
          <span class="stat-label">Total Net Disbursement</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">⚖️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-pay-reconcile">--</span>
          <span class="stat-label">Reconciliation Status</span>
        </div>
      </div>

      <!-- Period-over-Period Reconciliation Card -->
      <div class="card" style="grid-column: span 6;">
        <div class="card-header">
          <div>
            <div class="card-title">Financial Period Reconciliation</div>
            <div class="card-subtitle">Month-over-month variance analysis & audit validation</div>
          </div>
        </div>
        <div id="payroll-reconciliation-metrics" style="padding: 0.5rem 0;">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Calculating variance...</div>
        </div>
      </div>

      <!-- Salary Structure Formula Reference -->
      <div class="card" style="grid-column: span 6;">
        <div class="card-header">
          <div>
            <div class="card-title">Statutory Salary Structure Formulas</div>
            <div class="card-subtitle">Decimal-safe compensation component distribution</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; padding: 0.4rem 0.8rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm);">
            <strong>Basic Salary:</strong> <span>50% of Monthly CTC</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.4rem 0.8rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm);">
            <strong>House Rent Allowance (HRA):</strong> <span>25% of Monthly CTC</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.4rem 0.8rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm);">
            <strong>Special Allowance:</strong> <span>25% of Monthly CTC (Balancing)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.4rem 0.8rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm);">
            <strong>Statutory Deductions:</strong> <span>EPF (12% max ₹1,800), PT (₹200), TDS (10%)</span>
          </div>
        </div>
      </div>

      <!-- Itemized Payslip Breakdown Inspector -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Confidential Employee Itemized Payslip Inspector</div>
            <div class="card-subtitle">Select any employee to view complete earnings, deductions, and net compensation</div>
          </div>
          <div>
            <select id="payroll-emp-selector" class="form-control" style="min-width: 200px;" onchange="loadEmployeePayslipBreakdown(this.value)">
              <option value="EMP0001">Asha Rao (EMP0001)</option>
              <option value="EMP0002" selected>Bikram Roy (EMP0002)</option>
              <option value="EMP0003">Chitra Sen (EMP0003)</option>
              <option value="EMP0004">David Miller (EMP0004)</option>
              <option value="EMP0005">Evelyn Reed (EMP0005)</option>
              <option value="EMP0006">Farhan Ali (EMP0006)</option>
              <option value="EMP0007">Geeta Sharma (EMP0007)</option>
              <option value="EMP0008">Harish Verma (EMP0008)</option>
            </select>
          </div>
        </div>
        <div id="payroll-payslip-viewer-container">
          <div style="color: var(--text-muted); padding: 1.5rem; text-align: center;">Select an employee above to inspect itemized payslip.</div>
        </div>
      </div>

      <!-- Executed Payroll Cycles History -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div class="card-title">Executed Payroll Cycles History</div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Cycle Month</th>
                <th>Total Gross</th>
                <th>Total Net</th>
                <th>Staff Count</th>
                <th>Status</th>
                <th>Processed On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="pay-dash-periods-body">
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading periods...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  try {
    const [periods, recon] = await Promise.all([
      API.getPayrollPeriods(),
      API.getPayrollReconciliation()
    ]);

    if (periods.length > 0) {
      const latest = periods[0];
      const gEl = document.getElementById('stat-pay-gross');
      if (gEl) gEl.textContent = `₹${latest.total_gross.toLocaleString('en-IN')}`;

      const nEl = document.getElementById('stat-pay-net');
      if (nEl) nEl.textContent = `₹${latest.total_net.toLocaleString('en-IN')}`;
    }

    const recEl = document.getElementById('stat-pay-reconcile');
    if (recEl) recEl.textContent = recon.status;

    // Reconciliation Card
    const reconBox = document.getElementById('payroll-reconciliation-metrics');
    if (reconBox) {
      reconBox.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem;">
          <div style="background: var(--bg-surface-alt); padding: 0.75rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Gross Variance (MoM)</div>
            <div style="font-weight: 800; font-size: 1.2rem; color: ${recon.gross_variance >= 0 ? 'var(--success)' : 'var(--danger)'};">₹${recon.gross_variance.toLocaleString('en-IN')}</div>
          </div>
          <div style="background: var(--bg-surface-alt); padding: 0.75rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Net Variance (MoM)</div>
            <div style="font-weight: 800; font-size: 1.2rem; color: ${recon.net_variance >= 0 ? 'var(--success)' : 'var(--danger)'};">₹${recon.net_variance.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          Validation: <strong>${recon.status === 'BALANCED' ? '✓ Zero unexpected financial variance detected' : '⚠️ Discrepancy flagged for audit review'}</strong>
        </div>
      `;
    }

    // Periods Table
    const pBody = document.getElementById('pay-dash-periods-body');
    if (pBody) {
      pBody.innerHTML = periods.map(p => `
        <tr>
          <td style="font-weight: 700; color: var(--primary-600);">${p.month}</td>
          <td>₹${p.total_gross.toLocaleString('en-IN')}</td>
          <td style="font-weight: 600; color: var(--success);">₹${p.total_net.toLocaleString('en-IN')}</td>
          <td>${p.employees_count} Employees</td>
          <td><span class="badge badge-present">${p.status}</span></td>
          <td>${p.processed_on || '2026-07-28'}</td>
          <td><button class="btn btn-secondary btn-sm" onclick="window.location.href='/api/export/payroll'">CSV</button></td>
        </tr>
      `).join('');
    }

    // Load initial payslip preview for selected employee
    loadEmployeePayslipBreakdown('EMP0002');

  } catch (err) {
    console.error('Payroll dashboard load failed:', err);
  }
}

async function loadEmployeePayslipBreakdown(empCode) {
  const container = document.getElementById('payroll-payslip-viewer-container');
  if (!container) return;

  try {
    const p = await API.getPayslip(empCode, '2026-07');
    container.innerHTML = `
      <div style="padding: 1.5rem; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div>
            <div style="font-size: 1.1rem; font-weight: 700;">${p.name} (${p.emp_code}) — ${p.department}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Pay Period: ${p.month} | Currency: ${p.currency} | Standard Corporate Structure</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">Net Take-Home</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">₹${p.net_pay.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--primary-600);">Earnings (Gross: ₹${p.gross_earnings.toLocaleString('en-IN')})</div>
            ${p.earnings.map(e => `
              <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dashed var(--border-color); font-size: 0.85rem;">
                <span>${e.component}</span>
                <strong>₹${e.amount.toLocaleString('en-IN')}</strong>
              </div>
            `).join('')}
          </div>
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--danger);">Statutory Deductions (Total: ₹${p.total_deductions.toLocaleString('en-IN')})</div>
            ${p.deductions.map(d => `
              <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dashed var(--border-color); font-size: 0.85rem;">
                <span>${d.component}</span>
                <strong style="color: var(--danger);">₹${d.amount.toLocaleString('en-IN')}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div style="color: var(--danger); padding: 1rem;">Failed to load payslip: ${err.message}</div>`;
  }
}

// --------------------------------------------------------------------------- //
// 6. PERSONA: IT Asset Admin Operations Dashboard
// --------------------------------------------------------------------------- //
async function renderITAssetDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>IT Hardware Assets & Device Lifecycle Hub</h1>
        <p>Enterprise hardware inventory, serial tracking, equipment requests, employee transfers, and offboarding clearances.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openOffboardingClearanceModal()">🛡️ Offboarding Clearance</button>
        <button class="btn btn-secondary" onclick="window.location.href='/api/export/assets'">📥 Export Assets CSV</button>
        <button class="btn btn-primary" onclick="openAddAssetModal()">+ Register Hardware</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Hardware Asset KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">💻</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-asset-total">--</span>
          <span class="stat-label">Total Equipment Assets</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">👤</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-asset-assigned">--</span>
          <span class="stat-label">In Employee Custody</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">📦</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-asset-available">--</span>
          <span class="stat-label">Available in Storage</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">📥</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-asset-requests">--</span>
          <span class="stat-label">Requisitions Pending</span>
        </div>
      </div>

      <!-- Pending Asset Requisitions Inbox -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Employee Equipment Requisitions Queue</div>
            <div class="card-subtitle">Hardware requests submitted via employee self-service</div>
          </div>
        </div>
        <div id="it-asset-requests-container">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading equipment requests...</div>
        </div>
      </div>

      <!-- Hardware Inventory Table -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Physical Hardware Inventory Registry</div>
            <div class="card-subtitle">Asset tags, serial numbers, models, custody, and lifecycle actions</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="navigate('assets')">Inventory Grid</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Category</th>
                <th>Hardware Model</th>
                <th>Serial Number</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="it-dash-assets-body">
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading inventory...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Warranty Alerts & Offboarding Clearance -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Hardware Warranty Expiration & Compliance Alerts</div>
            <div class="card-subtitle">Upcoming 90-day warranty expirations and replacement tracking</div>
          </div>
        </div>
        <div id="it-warranty-alerts-container">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `;

  try {
    const [assets, reqs, warranty] = await Promise.all([
      API.getAssets(),
      API.getAssetRequests(),
      API.getWarrantyAlerts()
    ]);

    const totalEl = document.getElementById('stat-asset-total');
    if (totalEl) totalEl.textContent = `${assets.length} Devices`;

    const assignedCount = assets.filter(a => a.status === 'ASSIGNED').length;
    const asgEl = document.getElementById('stat-asset-assigned');
    if (asgEl) asgEl.textContent = `${assignedCount} Assigned`;

    const availCount = assets.filter(a => a.status === 'AVAILABLE').length;
    const avlEl = document.getElementById('stat-asset-available');
    if (avlEl) avlEl.textContent = `${availCount} Available`;

    const reqEl = document.getElementById('stat-asset-requests');
    if (reqEl) reqEl.textContent = `${reqs.length} Requests`;

    // Requisitions
    const reqBox = document.getElementById('it-asset-requests-container');
    if (reqBox) {
      if (reqs.length === 0) {
        reqBox.innerHTML = '<div style="color: var(--text-muted); padding: 1rem; text-align: center;">🎉 No pending equipment requisitions.</div>';
      } else {
        reqBox.innerHTML = reqs.map(r => `
          <div class="approval-item-card">
            <div class="approval-item-header">
              <div>
                <strong>💻 Requisition: ${r.emp_name} (${r.emp_code})</strong>
                <span class="badge badge-info" style="margin-left: 0.5rem;">${r.category}</span>
                <span class="badge badge-warning" style="margin-left: 0.25rem;">${r.urgency} Urgency</span>
              </div>
              <div class="approval-item-meta">${r.id} | Status: ${r.status}</div>
            </div>
            <div class="approval-item-body">Preference: ${r.model_preference || 'Standard'} — Reason: "${r.reason}"</div>
            <div class="approval-item-actions">
              ${r.status === 'PENDING' ? `
                <button class="btn btn-danger btn-sm" onclick="handleAssetRequestAction('${r.id}', 'REJECT')">✕ Reject</button>
                <button class="btn btn-success btn-sm" onclick="handleAssetRequestAction('${r.id}', 'APPROVE')">✓ Approve Request</button>
              ` : `<span class="badge badge-present">✓ Handled</span>`}
            </div>
          </div>
        `).join('');
      }
    }

    // Inventory Table
    const aBody = document.getElementById('it-dash-assets-body');
    if (aBody) {
      aBody.innerHTML = assets.map(a => `
        <tr>
          <td style="font-weight: 700; color: var(--primary-600);">${a.asset_tag}</td>
          <td><span class="badge badge-info">${a.category}</span></td>
          <td style="font-weight: 600;">${a.model}</td>
          <td style="font-family: monospace; font-size: 0.8rem;">${a.serial_no}</td>
          <td>${a.assigned_to ? `<strong>${a.assigned_to}</strong>` : '<span style="color: var(--text-muted);">Unassigned</span>'}</td>
          <td><span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></td>
          <td>
            ${a.status === 'AVAILABLE' ? `
              <button class="btn btn-primary btn-sm" onclick="openAssignAssetModal('${a.id}', '${a.asset_tag}')">Assign</button>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="openTransferAssetModal('${a.id}', '${a.asset_tag}')">Transfer</button>
              <button class="btn btn-secondary btn-sm" onclick="handleReturnAsset('${a.id}')">Return</button>
            `}
          </td>
        </tr>
      `).join('');
    }

    // Warranty alerts
    const wBox = document.getElementById('it-warranty-alerts-container');
    if (wBox && warranty.length) {
      wBox.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
          ${warranty.slice(0, 3).map(w => `
            <div style="background: var(--bg-surface-alt); padding: 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid ${w.status === 'EXPIRED' ? 'var(--danger)' : 'var(--success)'};">
              <div style="font-weight: 600; font-size: 0.85rem;">${w.asset_tag} — ${w.model}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Expiry: ${w.warranty_expiry} | Custody: ${w.assigned_to || 'Storage'}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

  } catch (err) {
    console.error('IT Asset dashboard load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// 7. PERSONA: Auditor & Governance Console
// --------------------------------------------------------------------------- //
async function renderAuditorDashboard(container) {
  container.innerHTML = `
    <div class="security-banner security-info">
      <span>🛡️</span>
      <span>Auditor Mode Enforced: Operational modifications strictly prohibited. All inspection activities are timestamped and recorded in the audit trail.</span>
    </div>

    <div class="page-header">
      <div class="page-title-group">
        <h1>Enterprise Audit Ledger & Governance Oversight</h1>
        <p>Immutable operational event trails, attendance regularization histories, compliance scorecard, and verified CSV ledger exports.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="renderAuditorDashboard(document.getElementById('page-container'))">🔄 Refresh Stream</button>
        <button class="btn btn-primary" onclick="window.location.href='/api/export/audit'">📥 Export Audit Ledger (CSV)</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Compliance KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">🛡️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-audit-score">--</span>
          <span class="stat-label">SOC2 / ISO Score</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">📜</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-audit-events-count">--</span>
          <span class="stat-label">Immutable Audit Records</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">🎓</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-audit-training">--</span>
          <span class="stat-label">Training Compliance</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">⚖️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-audit-gdpr">100%</span>
          <span class="stat-label">GDPR / Privacy Mandate</span>
        </div>
      </div>

      <!-- Searchable Immutable Audit Trail -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Immutable Security & Operational Audit Trail</div>
            <div class="card-subtitle">Filter by action, actor code, or keyword</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <select id="audit-filter-action" class="form-control" style="font-size: 0.8rem;" onchange="loadFilteredAuditLogs()">
              <option value="">All Actions</option>
              <option value="SWITCH_ROLE">Role Switch</option>
              <option value="EXECUTE_PAYROLL_RUN">Payroll Execution</option>
              <option value="CONVERT_CANDIDATE">Candidate Conversion</option>
              <option value="TRANSFER_ASSET">Asset Transfer</option>
              <option value="SUBMIT_EXPENSE">Expense Claims</option>
              <option value="REQUEST_REGULARIZATION">Regularization</option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Timestamp (UTC)</th>
                <th>Actor Code</th>
                <th>Actor Name</th>
                <th>Actor Role</th>
                <th>Action Event</th>
                <th>Target Resource</th>
                <th>Status</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody id="audit-dash-logs-body">
              <tr><td colspan="8" style="text-align: center; color: var(--text-muted);">Loading audit stream...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Compliance Standards Scorecard Details -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div class="card-title">Governance Certifications & Statutory Health</div>
        </div>
        <div id="audit-scorecard-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Loading scorecard details...</div>
        </div>
      </div>
    </div>
  `;

  try {
    const [scorecard, logs] = await Promise.all([
      API.getComplianceScorecard(),
      API.getAuditLogs(null, null, 25)
    ]);

    const scEl = document.getElementById('stat-audit-score');
    if (scEl) scEl.textContent = `${scorecard.overall_score}%`;

    const evEl = document.getElementById('stat-audit-events-count');
    if (evEl) evEl.textContent = `${scorecard.total_audit_events_recorded} Events`;

    const trEl = document.getElementById('stat-audit-training');
    if (trEl) trEl.textContent = `${scorecard.mandatory_training_completion_pct}%`;

    // Render Logs
    renderAuditLogsTable(logs);

    // Scorecard details
    const scBox = document.getElementById('audit-scorecard-details');
    if (scBox) {
      scBox.innerHTML = `
        <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.75rem; color: var(--text-muted);">SOC-2 Type II Certification</div>
          <div style="font-weight: 700; color: var(--success); margin-top: 0.25rem;">${scorecard.soc2_type_ii_status}</div>
        </div>
        <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.75rem; color: var(--text-muted);">ISO-27001 ISMS Standard</div>
          <div style="font-weight: 700; color: var(--success); margin-top: 0.25rem;">${scorecard.iso27001_certification}</div>
        </div>
        <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Biometric Encryption</div>
          <div style="font-weight: 700; color: var(--primary-600); margin-top: 0.25rem;">${scorecard.biometric_encryption}</div>
        </div>
        <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Next External Audit</div>
          <div style="font-weight: 700; color: var(--warning); margin-top: 0.25rem;">${scorecard.next_scheduled_audit_date}</div>
        </div>
      `;
    }

  } catch (err) {
    console.error('Auditor dashboard load failed:', err);
  }
}

function renderAuditLogsTable(logs) {
  const tbody = document.getElementById('audit-dash-logs-body');
  if (!tbody) return;

  if (logs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No audit events matching criteria.</td></tr>';
    return;
  }

  tbody.innerHTML = logs.map(l => `
    <tr>
      <td style="font-family: monospace; font-size: 0.75rem;">${l.timestamp}</td>
      <td style="font-weight: 700;">${l.actor_code}</td>
      <td style="font-weight: 600;">${l.actor_name}</td>
      <td><span class="badge badge-info">${l.actor_role}</span></td>
      <td><strong style="color: var(--primary-600);">${l.action}</strong></td>
      <td style="color: var(--text-muted); font-size: 0.8rem;">${l.target}</td>
      <td><span class="badge badge-present">${l.status}</span></td>
      <td style="font-family: monospace; font-size: 0.75rem;">${l.ip_address || '127.0.0.1'}</td>
    </tr>
  `).join('');
}

async function loadFilteredAuditLogs() {
  const sel = document.getElementById('audit-filter-action');
  const action = sel ? sel.value : null;
  try {
    const logs = await API.getAuditLogs(action, null, 50);
    renderAuditLogsTable(logs);
  } catch (err) {
    API.toast('Filter failed: ' + err.message, 'danger');
  }
}

// --------------------------------------------------------------------------- //
// 8. PERSONA: Platform Administrator Dashboard
// --------------------------------------------------------------------------- //
async function renderPlatformDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Platform Infrastructure & System Diagnostics</h1>
        <p>MongoDB storage telemetry, query indexing verification, memory RSS metrics, and runtime health.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openExplainModal()">🔍 Explain Plans</button>
        <button class="btn btn-primary" onclick="renderPlatformDashboard(document.getElementById('page-container'))">🔄 Refresh Diagnostics</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Platform KPIs -->
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">🖥️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-plt-db">MongoDB 9.0</span>
          <span class="stat-label">Database Engine</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">⚡</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-plt-colls">--</span>
          <span class="stat-label">Active Collections</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">📈</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-plt-index">IXSCAN 100%</span>
          <span class="stat-label">Index Scan Coverage</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">⏱️</div>
        <div class="stat-info">
          <span class="stat-value" id="stat-plt-uptime">--</span>
          <span class="stat-label">Engine Health Status</span>
        </div>
      </div>

      <!-- Collection Document Counts -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">MongoDB Collection Document Counts & Storage Allocation</div>
            <div class="card-subtitle">Real-time counts across enterprise HRMS collections</div>
          </div>
        </div>
        <div id="plt-collections-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; padding: 0.5rem 0;">
          <div style="color: var(--text-muted); font-size: 0.85rem;">Inspecting collections...</div>
        </div>
      </div>
    </div>
  `;

  try {
    const data = await API.getPlatformMetrics();

    const cEl = document.getElementById('stat-plt-colls');
    if (cEl) cEl.textContent = `${data.collections_count} Collections`;

    const uEl = document.getElementById('stat-plt-uptime');
    if (uEl) uEl.textContent = `${data.status}`;

    const grid = document.getElementById('plt-collections-grid');
    if (grid && data.collection_counts) {
      grid.innerHTML = Object.entries(data.collection_counts).map(([name, count]) => `
        <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
          <div style="font-weight: 800; font-size: 1.5rem; color: var(--primary-500);">${count}</div>
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-top: 0.25rem;">${name}</div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Platform metrics load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// Specialized Views & Sub-dashboards
// --------------------------------------------------------------------------- //
async function renderEmployeePayslipView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>My Compensation & Monthly Payslips</h1>
        <p>Itemized personal salary structure, statutory deductions, and tax withholdings.</p>
      </div>
    </div>
    <div id="payroll-payslip-viewer-container"></div>
  `;
  loadEmployeePayslipBreakdown(AppState.user.emp_code);
}

async function renderEmployeeAssetsView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>My Assigned IT Equipment</h1>
        <p>Hardware devices, serial numbers, and equipment requisition requests.</p>
      </div>
      <button class="btn btn-primary" onclick="openRequestAssetModal()">+ Request Hardware Asset</button>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Hardware in Custody</div></div>
      <div class="table-container">
        <table>
          <thead><tr><th>Asset Tag</th><th>Category</th><th>Model</th><th>Serial Number</th><th>Assigned Date</th></tr></thead>
          <tbody id="my-assets-body"><tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Loading assets...</td></tr></tbody>
        </table>
      </div>
    </div>
  `;
  try {
    const data = await API.getEmployeeMe();
    const tbody = document.getElementById('my-assets-body');
    if (tbody) {
      if (data.my_assets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No hardware devices assigned to your profile. Click "+ Request Hardware Asset" above.</td></tr>';
      } else {
        tbody.innerHTML = data.my_assets.map(a => `
          <tr>
            <td style="font-weight: 700; color: var(--primary-600);">${a.asset_tag}</td>
            <td><span class="badge badge-info">${a.category}</span></td>
            <td style="font-weight: 600;">${a.model}</td>
            <td style="font-family: monospace;">${a.serial_no}</td>
            <td>${a.assigned_date || '2026-01-05'}</td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {}
}

async function renderEmployeeExpensesView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Expense Claims & Reimbursements</h1>
        <p>Submit corporate travel, dining, and IT equipment claims for manager review.</p>
      </div>
      <button class="btn btn-primary" onclick="openSubmitExpenseModal()">+ New Expense Claim</button>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">My Expense Claims History</div></div>
      <div class="table-container">
        <table>
          <thead><tr><th>ID</th><th>Category</th><th>Merchant</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody id="my-expenses-body"><tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Loading claims...</td></tr></tbody>
        </table>
      </div>
    </div>
  `;
  try {
    const data = await API.getEmployeeMe();
    const tbody = document.getElementById('my-expenses-body');
    if (tbody) {
      if (data.my_expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No expense claims found. Click "+ New Expense Claim" above.</td></tr>';
      } else {
        tbody.innerHTML = data.my_expenses.map(e => `
          <tr>
            <td style="font-weight: 700; color: var(--primary-600);">${e.id}</td>
            <td>${e.category}</td>
            <td>${e.merchant}</td>
            <td>${e.date}</td>
            <td style="font-weight: 700;">₹${e.amount}</td>
            <td><span class="badge badge-${e.status.toLowerCase()}">${e.status}</span></td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {}
}

async function renderEmployeeLearningView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Learning Curriculum & Compliance Policies</h1>
        <p>Mandatory security modules, professional development, and policy sign-offs.</p>
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="card" style="grid-column: span 6;">
        <div class="card-header"><div class="card-title">Courses & Training Modules</div></div>
        <div id="emp-courses-list" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
      </div>
      <div class="card" style="grid-column: span 6;">
        <div class="card-header"><div class="card-title">Governance Policies</div></div>
        <div id="emp-policies-list" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
      </div>
    </div>
  `;
  try {
    const data = await API.getEmployeeMe();
    const cBox = document.getElementById('emp-courses-list');
    if (cBox) {
      cBox.innerHTML = data.my_courses.map(c => `
        <div style="background: var(--bg-surface-alt); padding: 0.85rem; border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between;">
            <strong>${c.title}</strong>
            <span class="badge ${c.is_completed ? 'badge-present' : 'badge-warning'}">${c.is_completed ? 'Completed' : 'Pending'}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Duration: ${c.duration_minutes} min | Category: ${c.category}</div>
          <div class="progress-bar-bg"><div class="progress-bar-fill ${c.is_completed ? 'success' : ''}" style="width: ${c.progress}%;"></div></div>
          ${!c.is_completed ? `<button class="btn btn-primary btn-sm" style="margin-top: 0.5rem;" onclick="handleCourseComplete('${c.id}')">Mark Complete & Certify</button>` : ''}
        </div>
      `).join('');
    }
    const pBox = document.getElementById('emp-policies-list');
    if (pBox) {
      pBox.innerHTML = data.my_policies.map(p => `
        <div style="background: var(--bg-surface-alt); padding: 0.85rem; border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between;">
            <strong>${p.title} (v${p.version})</strong>
            <span class="badge ${p.is_acknowledged ? 'badge-present' : 'badge-danger'}">${p.is_acknowledged ? 'Acknowledged' : 'Pending Sign-off'}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${p.summary}</div>
          ${!p.is_acknowledged ? `<button class="btn btn-primary btn-sm" style="margin-top: 0.5rem;" onclick="handlePolicyAcknowledge('${p.id}')">Electronically Acknowledge</button>` : ''}
        </div>
      `).join('');
    }
  } catch (err) {}
}

async function renderManagerTeamView(container) {
  renderManagerDashboard(container);
}

async function renderManagerApprovalsView(container) {
  renderManagerDashboard(container);
}

async function renderManagerExpensesView(container) {
  renderManagerDashboard(container);
}

async function renderRecruiterJobsView(container) {
  renderRecruitmentView(container);
}

async function renderRecruiterInterviewsView(container) {
  renderRecruiterDashboard(container);
}

async function renderPayrollCompensationView(container) {
  renderPayrollDashboard(container);
}

async function renderPayrollReconciliationView(container) {
  renderPayrollDashboard(container);
}

async function renderAssetRequestsView(container) {
  renderITAssetDashboard(container);
}

async function renderAssetClearanceView(container) {
  renderITAssetDashboard(container);
}

async function renderAssetWarrantyView(container) {
  renderITAssetDashboard(container);
}

async function renderAuditorLogsView(container) {
  renderAuditorDashboard(container);
}

async function renderAuditorScorecardView(container) {
  renderAuditorDashboard(container);
}

// --------------------------------------------------------------------------- //
// Interactive Operational Handlers
// --------------------------------------------------------------------------- //
async function handlePunchIn() {
  try {
    const res = await API.punchIn(AppState.user.emp_code, null, 'PRESENT');
    API.toast(`Punched in successfully for ${res.date}`, 'success');
    navigate(AppState.currentView);
  } catch (err) {}
}

async function handlePunchOut() {
  try {
    const res = await API.punchOut(AppState.user.emp_code, null);
    API.toast(`Punched out successfully. Total work hours: ${res.work_hours}`, 'success');
    navigate(AppState.currentView);
  } catch (err) {}
}

async function handleCandidateStageChange(candId, newStage) {
  try {
    await API.updateCandidateStage(candId, newStage);
    API.toast(`Candidate stage updated to ${newStage}`, 'success');
    navigate('recruiter-dashboard');
  } catch (err) {}
}

async function handleConvertToEmployee(candId) {
  try {
    const res = await API.convertCandidate(candId);
    API.toast(res.message + ` (${res.employee.emp_code})`, 'success');
    navigate('recruiter-dashboard');
  } catch (err) {}
}

async function handleManagerAction(itemType, itemId, action) {
  try {
    await API.actionManagerApproval(itemType, itemId, action);
    API.toast(`Request ${action === 'APPROVE' ? 'Approved' : 'Rejected'} successfully`, 'success');
    navigate('manager-dashboard');
  } catch (err) {}
}

async function handleAssetRequestAction(reqId, action) {
  try {
    await API.actionAssetRequest(reqId, action, 'AST-1004', 'Allocated from primary inventory');
    API.toast(`Asset requisition ${action === 'APPROVE' ? 'Approved' : 'Rejected'}`, 'success');
    navigate('asset-dashboard');
  } catch (err) {}
}

async function handleReturnAsset(assetId) {
  try {
    await API.returnAsset(assetId);
    API.toast('Equipment returned to inventory successfully', 'success');
    navigate('asset-dashboard');
  } catch (err) {}
}

async function handlePolicyAcknowledge(policyId) {
  try {
    await API.acknowledgePolicy(policyId);
    API.toast('Policy electronically acknowledged and recorded in audit ledger', 'success');
    navigate(AppState.currentView);
  } catch (err) {}
}

async function handleCourseComplete(courseId) {
  try {
    const res = await API.completeCourse(courseId);
    API.toast(`Course completed! Certificate: ${res.certificate_id}`, 'success');
    navigate(AppState.currentView);
  } catch (err) {}
}

function openRequestAssetModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Request IT Equipment Requisition';
  body.innerHTML = `
    <form id="req-asset-form">
      <div class="form-group">
        <label class="form-label">Equipment Category</label>
        <select id="req-asset-cat" class="form-control">
          <option value="LAPTOP">Laptop (MacBook / ThinkPad)</option>
          <option value="MONITOR">External 4K Monitor</option>
          <option value="WORKSTATION">Workstation Tower</option>
          <option value="MOBILE">Mobile Test Device</option>
          <option value="ACCESS_CARD">Security Access Key</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Preferred Model / Specs</label>
        <input type="text" id="req-asset-pref" class="form-control" placeholder="MacBook Pro 16 M3 Max or Dell 32 4K">
      </div>
      <div class="form-group">
        <label class="form-label">Business Justification</label>
        <textarea id="req-asset-reason" class="form-control" rows="3" placeholder="Provide business requirement for this hardware" required></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Urgency Level</label>
        <select id="req-asset-urgency" class="form-control">
          <option value="MEDIUM">Medium (Standard 5-day fulfillment)</option>
          <option value="HIGH">High (Needed within 48 hours)</option>
          <option value="CRITICAL">Critical (Immediate blocker)</option>
        </select>
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitRequestAsset()">Submit Request</button>
  `;
  modal.classList.add('open');
}

async function submitRequestAsset() {
  const cat = document.getElementById('req-asset-cat').value;
  const pref = document.getElementById('req-asset-pref').value;
  const reason = document.getElementById('req-asset-reason').value;
  const urgency = document.getElementById('req-asset-urgency').value;

  if (!reason || reason.length < 5) {
    API.toast('Please provide a valid business justification (at least 5 characters).', 'danger');
    return;
  }

  try {
    await API.requestAsset({ category: cat, model_preference: pref, reason, urgency });
    API.toast('IT asset requisition submitted successfully', 'success');
    closeModal();
    navigate(AppState.currentView);
  } catch (err) {}
}

function openSubmitExpenseModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Submit Expense Reimbursement Claim';
  body.innerHTML = `
    <form id="submit-expense-form">
      <div class="form-group">
        <label class="form-label">Expense Category</label>
        <select id="exp-cat" class="form-control">
          <option value="Client Entertainment">Client Entertainment / Dining</option>
          <option value="Travel / Commute">Travel / Commute (Cab, Flights)</option>
          <option value="IT Hardware">IT Hardware & Office Accessories</option>
          <option value="Professional Certification">Professional Training / Books</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Amount (INR)</label>
        <input type="number" id="exp-amount" class="form-control" placeholder="2500" required min="1">
      </div>
      <div class="form-group">
        <label class="form-label">Merchant Name</label>
        <input type="text" id="exp-merchant" class="form-control" placeholder="Uber / Taj Hotels / AWS" required>
      </div>
      <div class="form-group">
        <label class="form-label">Expense Date</label>
        <input type="date" id="exp-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Description / Business Purpose</label>
        <textarea id="exp-desc" class="form-control" rows="2" placeholder="Explain the business purpose" required></textarea>
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitExpenseClaim()">Submit Claim</button>
  `;
  modal.classList.add('open');
}

async function submitExpenseClaim() {
  const cat = document.getElementById('exp-cat').value;
  const amount = parseFloat(document.getElementById('exp-amount').value);
  const merchant = document.getElementById('exp-merchant').value;
  const date = document.getElementById('exp-date').value;
  const desc = document.getElementById('exp-desc').value;

  if (!amount || amount <= 0 || !merchant || !desc) {
    API.toast('Please fill out all required expense fields.', 'danger');
    return;
  }

  try {
    await API.submitExpense({ category: cat, amount, merchant, date, description: desc, currency: 'INR' });
    API.toast('Expense claim submitted for manager approval', 'success');
    closeModal();
    navigate(AppState.currentView);
  } catch (err) {}
}

function openEmployeeLifecycleModal(empCode = 'EMP0002') {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Employee Lifecycle Transition — ${empCode}`;
  body.innerHTML = `
    <form id="lifecycle-form">
      <input type="hidden" id="lc-emp-code" value="${empCode}">
      <div class="form-group">
        <label class="form-label">Lifecycle Action</label>
        <select id="lc-action" class="form-control" onchange="toggleLifecycleFields(this.value)">
          <option value="PROMOTION">Promotion / Title Change</option>
          <option value="TRANSFER">Departmental Transfer</option>
          <option value="EXIT_INITIATE">Initiate Exit / Offboarding</option>
        </select>
      </div>
      <div id="lc-promotion-fields">
        <div class="form-group">
          <label class="form-label">New Designation</label>
          <input type="text" id="lc-designation" class="form-control" placeholder="Senior Staff Architect">
        </div>
        <div class="form-group">
          <label class="form-label">New Monthly Compensation (INR)</label>
          <input type="number" id="lc-salary" class="form-control" placeholder="180000">
        </div>
      </div>
      <div id="lc-transfer-fields" style="display: none;">
        <div class="form-group">
          <label class="form-label">Target Department</label>
          <select id="lc-department" class="form-control">
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product Management">Product Management</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
      </div>
      <div id="lc-exit-fields" style="display: none;">
        <div class="form-group">
          <label class="form-label">Last Working Day</label>
          <input type="date" id="lc-last-day" class="form-control" value="2026-08-15">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Remarks / Audit Note</label>
        <input type="text" id="lc-reason" class="form-control" placeholder="Approved via H2 Executive Review">
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitEmployeeLifecycle()">Execute Lifecycle Action</button>
  `;
  modal.classList.add('open');
}

function toggleLifecycleFields(action) {
  const p = document.getElementById('lc-promotion-fields');
  const t = document.getElementById('lc-transfer-fields');
  const e = document.getElementById('lc-exit-fields');
  if (p) p.style.display = action === 'PROMOTION' ? 'block' : 'none';
  if (t) t.style.display = action === 'TRANSFER' ? 'block' : 'none';
  if (e) e.style.display = action === 'EXIT_INITIATE' ? 'block' : 'none';
}

async function submitEmployeeLifecycle() {
  const code = document.getElementById('lc-emp-code').value;
  const action = document.getElementById('lc-action').value;
  const reason = document.getElementById('lc-reason').value;

  const payload = { action, reason };
  if (action === 'PROMOTION') {
    payload.designation = document.getElementById('lc-designation').value;
    const sal = parseFloat(document.getElementById('lc-salary').value);
    if (sal) payload.salary = sal;
  } else if (action === 'TRANSFER') {
    payload.department = document.getElementById('lc-department').value;
  } else if (action === 'EXIT_INITIATE') {
    payload.last_working_day = document.getElementById('lc-last-day').value;
  }

  try {
    const res = await API.handleEmployeeLifecycle(code, payload);
    API.toast(res.message, 'success');
    closeModal();
    navigate(AppState.currentView);
  } catch (err) {}
}

function openTransferAssetModal(assetId, assetTag) {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Transfer Custody: ${assetTag}`;
  body.innerHTML = `
    <form id="transfer-asset-form">
      <input type="hidden" id="tf-asset-id" value="${assetId}">
      <div class="form-group">
        <label class="form-label">Transfer To Employee Code</label>
        <select id="tf-emp-code" class="form-control">
          <option value="EMP0001">Asha Rao (EMP0001)</option>
          <option value="EMP0002">Bikram Roy (EMP0002)</option>
          <option value="EMP0003">Chitra Sen (EMP0003)</option>
          <option value="EMP0004">David Miller (EMP0004)</option>
          <option value="EMP0005">Evelyn Reed (EMP0005)</option>
          <option value="EMP0006">Farhan Ali (EMP0006)</option>
          <option value="EMP0007">Geeta Sharma (EMP0007)</option>
          <option value="EMP0008">Harish Verma (EMP0008)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Custody Notes</label>
        <input type="text" id="tf-notes" class="form-control" placeholder="Reassigned for quarterly project deployment">
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitTransferAsset()">Confirm Transfer</button>
  `;
  modal.classList.add('open');
}

async function submitTransferAsset() {
  const id = document.getElementById('tf-asset-id').value;
  const toEmp = document.getElementById('tf-emp-code').value;
  const notes = document.getElementById('tf-notes').value;

  try {
    await API.transferAsset(id, toEmp, notes);
    API.toast(`Asset transferred to ${toEmp}`, 'success');
    closeModal();
    navigate('asset-dashboard');
  } catch (err) {}
}

function openOffboardingClearanceModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Check Employee Offboarding IT Clearance';
  body.innerHTML = `
    <div class="form-group">
      <label class="form-label">Select Departing Employee</label>
      <select id="clearance-emp-select" class="form-control" onchange="inspectOffboardingClearance(this.value)">
        <option value="">Select an employee</option>
        <option value="EMP0001">Asha Rao (EMP0001)</option>
        <option value="EMP0002">Bikram Roy (EMP0002)</option>
        <option value="EMP0003">Chitra Sen (EMP0003)</option>
        <option value="EMP0004">David Miller (EMP0004)</option>
        <option value="EMP0005">Evelyn Reed (EMP0005)</option>
      </select>
    </div>
    <div id="clearance-result-container" style="padding: 1rem 0; font-size: 0.85rem;">
      <div style="color: var(--text-muted);">Select an employee above to verify hardware custody and clearance certificate.</div>
    </div>
  `;
  footer.innerHTML = `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
  modal.classList.add('open');
}

async function inspectOffboardingClearance(empCode) {
  if (!empCode) return;
  const box = document.getElementById('clearance-result-container');
  if (!box) return;

  try {
    const res = await API.getOffboardingClearance(empCode);
    box.innerHTML = `
      <div style="background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong>Clearance Status:</strong>
          <span class="badge ${res.clearance_status === 'CLEARED' ? 'badge-present' : 'badge-danger'}">${res.clearance_status}</span>
        </div>
        <div style="margin-bottom: 0.5rem;">Pending Hardware Assets: <strong>${res.pending_assets_count}</strong></div>
        ${res.pending_assets.map(a => `
          <div style="padding: 0.35rem 0.5rem; background: var(--bg-surface); border-radius: var(--radius-sm); margin-bottom: 0.35rem; font-size: 0.8rem;">
            ${a.asset_tag} — ${a.model} (${a.serial_no})
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    box.innerHTML = `<div style="color: var(--danger);">Failed to check clearance: ${err.message}</div>`;
  }
}

function openExecutePayrollModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Execute Decimal-Safe Payroll Cycle';
  body.innerHTML = `
    <form id="payroll-run-form">
      <div class="form-group">
        <label class="form-label">Processing Month (YYYY-MM)</label>
        <input type="text" id="run-pay-month" class="form-control" value="2026-07" pattern="^\\d{4}-(0[1-9]|1[0-2])$" required>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
        Execution processes basic, HRA, special allowances, EPF caps (₹1,800), professional tax, and standard TDS with decimal-safe half-up precision across all active workforce records.
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitExecutePayrollRun()">Execute Payroll</button>
  `;
  modal.classList.add('open');
}

async function submitExecutePayrollRun() {
  const month = document.getElementById('run-pay-month').value;
  try {
    const res = await API.executePayrollRun(month);
    API.toast(res.message, 'success');
    closeModal();
    navigate('payroll-dashboard');
  } catch (err) {}
}

function openRequestRegularizationModal(date, punchIn, punchOut) {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Regularize Attendance for ${date}`;
  body.innerHTML = `
    <form id="reg-form">
      <input type="hidden" id="reg-date" value="${date}">
      <div class="form-group">
        <label class="form-label">Proposed Punch In Time</label>
        <input type="text" id="reg-in" class="form-control" value="${punchIn !== '--' ? punchIn : '09:30 AM'}">
      </div>
      <div class="form-group">
        <label class="form-label">Proposed Punch Out Time</label>
        <input type="text" id="reg-out" class="form-control" value="${punchOut !== '--' ? punchOut : '06:30 PM'}">
      </div>
      <div class="form-group">
        <label class="form-label">Reason for Discrepancy</label>
        <textarea id="reg-reason" class="form-control" rows="2" placeholder="Biometric terminal offline / onsite client visit" required></textarea>
      </div>
    </form>
  `;
  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitRegularizationRequest()">Submit for Manager Approval</button>
  `;
  modal.classList.add('open');
}

async function submitRegularizationRequest() {
  const d = document.getElementById('reg-date').value;
  const pin = document.getElementById('reg-in').value;
  const pout = document.getElementById('reg-out').value;
  const reason = document.getElementById('reg-reason').value;

  if (!reason || reason.length < 5) {
    API.toast('Please provide a valid reason (minimum 5 characters).', 'danger');
    return;
  }

  try {
    await API.requestRegularization({ date: d, punch_in: pin, punch_out: pout, reason });
    API.toast('Regularization request submitted to manager for approval', 'success');
    closeModal();
    navigate(AppState.currentView);
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: Employee Directory
// --------------------------------------------------------------------------- //
async function renderEmployeesView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Global Workforce Directory</h1>
        <p>Comprehensive corporate directory with departmental filtering and profiling.</p>
      </div>
      <div class="page-actions">
        <a href="/api/export/employees" class="btn btn-secondary" download>📥 Export CSV</a>
        <button class="btn btn-primary" onclick="openAddEmployeeModal()">+ Add Employee</button>
      </div>
    </div>

    <div class="card" style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <input type="text" id="emp-search-input" class="form-control" style="max-width: 300px;" placeholder="Filter by Department or Code..." onkeyup="filterEmployees()">
        <select id="emp-dept-filter" class="form-control" style="max-width: 220px;" onchange="filterEmployees()">
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Product Management">Product Management</option>
          <option value="Operations">Operations</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Shift Window</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="employees-table-body">
            <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading employees...</td></tr>
          </tbody>
        </table>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <span id="emp-total-count" style="font-size: 0.8rem; color: var(--text-muted);">Showing records</span>
        <div style="display: flex; gap: 0.5rem;" id="emp-pagination-controls"></div>
      </div>
    </div>
  `;

  loadEmployeesData();
}

let currentEmpPage = 1;
async function loadEmployeesData(dept = null, page = 1) {
  currentEmpPage = page;
  try {
    const data = await API.getEmployees(dept, page, 10);
    const tbody = document.getElementById('employees-table-body');
    const totalEl = document.getElementById('emp-total-count');
    const pagEl = document.getElementById('emp-pagination-controls');

    if (totalEl) totalEl.textContent = `Showing ${data.items.length} of ${data.total} total employees`;

    if (tbody) {
      if (data.items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No employees found.</td></tr>';
      } else {
        tbody.innerHTML = data.items.map(e => `
          <tr>
            <td><span class="badge" style="background: rgba(79, 70, 229, 0.1); color: var(--primary-600);">${e.emp_code}</span></td>
            <td style="font-weight: 600;">${e.name}</td>
            <td style="color: var(--text-muted);">${e.email}</td>
            <td>${e.department}</td>
            <td>${e.shift_start} - ${e.shift_end}</td>
            <td>${e.joined_on}</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="viewEmployeeProfile('${e.emp_code}', '${encodeURIComponent(JSON.stringify(e))}')">View Profile</button>
            </td>
          </tr>
        `).join('');
      }
    }

    if (pagEl) {
      const totalPages = Math.ceil(data.total / 10);
      pagEl.innerHTML = `
        <button class="btn btn-secondary btn-sm" ${page <= 1 ? 'disabled' : ''} onclick="loadEmployeesData('${dept || ''}', ${page - 1})">Prev</button>
        <span style="font-size: 0.8rem; align-self: center;">Page ${page} of ${totalPages || 1}</span>
        <button class="btn btn-secondary btn-sm" ${page >= totalPages ? 'disabled' : ''} onclick="loadEmployeesData('${dept || ''}', ${page + 1})">Next</button>
      `;
    }
  } catch (err) {
    console.error('Employees load failed:', err);
  }
}

function filterEmployees() {
  const dept = document.getElementById('emp-dept-filter').value || null;
  loadEmployeesData(dept, 1);
}

async function viewEmployeeProfile(empCode, rawJson) {
  let emp = null;
  try {
    emp = JSON.parse(decodeURIComponent(rawJson));
  } catch (_) {
    emp = { emp_code: empCode, name: empCode, department: 'Corporate' };
  }

  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Employee Dossier — ${emp.name} (${emp.emp_code})`;
  const initials = (emp.name || 'EM').split(' ').map(n => n[0]).join('').substring(0, 2);

  body.innerHTML = `
    <div class="dossier-header">
      <div class="dossier-avatar">${initials}</div>
      <div style="flex: 1;">
        <h3 style="margin: 0; font-size: 1.25rem; color: var(--text-primary);">${emp.name}</h3>
        <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">${emp.email || '--'}</div>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <span class="badge" style="background: rgba(79, 70, 229, 0.1); color: var(--primary-600);">${emp.emp_code}</span>
          <span class="badge badge-present">${emp.department}</span>
        </div>
      </div>
    </div>

    <div class="dossier-grid">
      <div class="dossier-item">
        <div class="d-label">Assigned Shift (IST)</div>
        <div class="d-value">⏱️ ${emp.shift_start || '09:30'} - ${emp.shift_end || '18:30'}</div>
      </div>
      <div class="dossier-item">
        <div class="d-label">Joining Date</div>
        <div class="d-value">📅 ${emp.joined_on || '--'}</div>
      </div>
    </div>

    <div style="margin-bottom: 1rem;">
      <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase;">Leave Balances (Days)</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
        <div style="padding: 0.75rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Casual (CL)</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--info);" id="dossier-cl">--</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Sick (SL)</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--warning);" id="dossier-sl">--</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Earned (EL)</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary-500);" id="dossier-el">--</div>
        </div>
      </div>
    </div>

    <div>
      <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase;">Recent Attendance History</h4>
      <div class="table-container" style="max-height: 180px; overflow-y: auto;">
        <table style="font-size: 0.8rem;">
          <thead>
            <tr><th>Date</th><th>Status</th><th>Work Hours</th><th>Late</th></tr>
          </thead>
          <tbody id="dossier-att-body">
            <tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Loading logs...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    <button class="btn btn-primary" onclick="closeModal(); viewPayslipModal('${emp.emp_code}')">📄 View Payslip</button>
  `;

  modal.classList.add('open');

  try {
    const [bal, logs] = await Promise.all([
      API.getLeaveBalances(emp.emp_code).catch(() => null),
      API.getAttendance({ emp_code: emp.emp_code, page: 1, page_size: 5 }).catch(() => null)
    ]);

    if (bal && bal.balances) {
      const cl = document.getElementById('dossier-cl');
      const sl = document.getElementById('dossier-sl');
      const el = document.getElementById('dossier-el');
      if (cl) cl.textContent = bal.balances.CASUAL;
      if (sl) sl.textContent = bal.balances.SICK;
      if (el) el.textContent = bal.balances.EARNED;
    }

    const attBody = document.getElementById('dossier-att-body');
    if (attBody && logs && logs.items) {
      if (logs.items.length === 0) {
        attBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No records in period</td></tr>';
      } else {
        attBody.innerHTML = logs.items.map(l => `
          <tr>
            <td>${l.date}</td>
            <td><span class="badge badge-${l.status.toLowerCase()}">${l.status}</span></td>
            <td>${l.work_hours !== null ? l.work_hours.toFixed(2) + ' hrs' : '--'}</td>
            <td>${l.late_minutes > 0 ? l.late_minutes + ' min' : '0'}</td>
          </tr>
        `).join('');
      }
    }
  } catch (_) {}
}

// --------------------------------------------------------------------------- //
// VIEW: Attendance Management & Regularization
// --------------------------------------------------------------------------- //
async function renderAttendanceView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Attendance & Time Tracking</h1>
        <p>Verified attendance logs with audit histories and manual regularization.</p>
      </div>
      <div class="page-actions">
        <a href="/api/export/attendance" class="btn btn-secondary" download>📥 Export CSV</a>
      </div>
    </div>

    <div class="card" style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <input type="text" id="att-emp-filter" class="form-control" style="max-width: 180px;" placeholder="Employee Code (e.g. EMP0001)">
        <input type="date" id="att-date-from" class="form-control" style="max-width: 160px;" placeholder="Date From">
        <input type="date" id="att-date-to" class="form-control" style="max-width: 160px;" placeholder="Date To">
        <select id="att-status-filter" class="form-control" style="max-width: 160px;">
          <option value="">All Statuses</option>
          <option value="PRESENT">PRESENT</option>
          <option value="WFH">WFH</option>
          <option value="ON_DUTY">ON_DUTY</option>
          <option value="LEAVE">LEAVE</option>
          <option value="ABSENT">ABSENT</option>
        </select>
        <button class="btn btn-primary" onclick="loadAttendanceLogs(1)">Apply Filters</button>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Punch In (IST)</th>
              <th>Punch Out (IST)</th>
              <th>Work Hours</th>
              <th>Late Min</th>
              <th>OT Min</th>
              <th>Half Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="attendance-table-body">
            <tr><td colspan="10" style="text-align: center; color: var(--text-muted);">Loading logs...</td></tr>
          </tbody>
        </table>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <span id="att-total-count" style="font-size: 0.8rem; color: var(--text-muted);">Showing logs</span>
        <div style="display: flex; gap: 0.5rem;" id="att-pagination-controls"></div>
      </div>
    </div>
  `;

  loadAttendanceLogs(1);
}

async function loadAttendanceLogs(page = 1) {
  const empCode = document.getElementById('att-emp-filter')?.value || null;
  const dateFrom = document.getElementById('att-date-from')?.value || null;
  const dateTo = document.getElementById('att-date-to')?.value || null;
  const status = document.getElementById('att-status-filter')?.value || null;

  try {
    const data = await API.getAttendance({
      emp_code: empCode,
      date_from: dateFrom,
      date_to: dateTo,
      status: status,
      page: page,
      page_size: 15
    });

    const tbody = document.getElementById('attendance-table-body');
    const totalEl = document.getElementById('att-total-count');
    const pagEl = document.getElementById('att-pagination-controls');

    if (totalEl) totalEl.textContent = `Showing ${data.items.length} of ${data.total} filtered records`;

    if (tbody) {
      if (data.items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: var(--text-muted);">No attendance logs matching criteria.</td></tr>';
      } else {
        tbody.innerHTML = data.items.map(l => `
          <tr>
            <td><span class="badge" style="background: rgba(79, 70, 229, 0.1); color: var(--primary-600);">${l.emp_code}</span></td>
            <td style="font-weight: 600;">${l.date}</td>
            <td><span class="badge badge-${l.status.toLowerCase()}">${l.status}</span></td>
            <td>${l.punch_in ? new Date(l.punch_in).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) : '--'}</td>
            <td>${l.punch_out ? new Date(l.punch_out).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) : '--'}</td>
            <td>${l.work_hours !== null ? l.work_hours.toFixed(2) : '--'}</td>
            <td>${l.late_minutes > 0 ? `<span style="color: var(--danger); font-weight: 600;">${l.late_minutes}</span>` : '0'}</td>
            <td>${l.overtime_minutes > 0 ? `<span style="color: var(--success); font-weight: 600;">${l.overtime_minutes}</span>` : '0'}</td>
            <td>${l.half_day ? '<span class="badge badge-leave">Yes</span>' : 'No'}</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="openRegularizeModal('${l.emp_code}', '${l.date}', '${encodeURIComponent(JSON.stringify(l))}')">Regularize</button>
            </td>
          </tr>
        `).join('');
      }
    }

    if (pagEl) {
      const totalPages = Math.ceil(data.total / 15);
      pagEl.innerHTML = `
        <button class="btn btn-secondary btn-sm" ${page <= 1 ? 'disabled' : ''} onclick="loadAttendanceLogs(${page - 1})">Prev</button>
        <span style="font-size: 0.8rem; align-self: center;">Page ${page} of ${totalPages || 1}</span>
        <button class="btn btn-secondary btn-sm" ${page >= totalPages ? 'disabled' : ''} onclick="loadAttendanceLogs(${page + 1})">Next</button>
      `;
    }
  } catch (err) {
    console.error('Attendance fetch error:', err);
  }
}

// --------------------------------------------------------------------------- //
// VIEW: Leave Management
// --------------------------------------------------------------------------- //
async function renderLeavesView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Leave Management & Approval Workflows</h1>
        <p>Apply for leaves, track balances, and authorize team requests.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openApplyLeaveModal()">+ New Leave Request</button>
      </div>
    </div>

    <div class="dashboard-grid" style="margin-bottom: 1.5rem;" id="leave-balances-cards">
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon primary">🌴</div>
        <div class="stat-info">
          <span class="stat-value" id="lb-earned">--</span>
          <span class="stat-label">Earned Leave (EL) Balance</span>
        </div>
      </div>
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon warning">🤒</div>
        <div class="stat-info">
          <span class="stat-value" id="lb-sick">--</span>
          <span class="stat-label">Sick Leave (SL) Balance</span>
        </div>
      </div>
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon info">☕</div>
        <div class="stat-info">
          <span class="stat-value" id="lb-casual">--</span>
          <span class="stat-label">Casual Leave (CL) Balance</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Leave Applications & Approval Queue</div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action Details</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody id="leaves-table-body">
            <tr><td colspan="8" style="text-align: center; color: var(--text-muted);">Loading leaves...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  loadLeavesData();
}

async function loadLeavesData() {
  try {
    const [balances, leaves] = await Promise.all([
      API.getLeaveBalances(AppState.user.emp_code),
      API.getLeaves()
    ]);

    document.getElementById('lb-earned').textContent = `${balances.balances.EARNED} Days`;
    document.getElementById('lb-sick').textContent = `${balances.balances.SICK} Days`;
    document.getElementById('lb-casual').textContent = `${balances.balances.CASUAL} Days`;

    const tbody = document.getElementById('leaves-table-body');
    if (tbody) {
      if (leaves.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No leave requests found.</td></tr>';
      } else {
        const canApprove = ['Manager', 'HR Admin'].includes(AppState.user.role);
        tbody.innerHTML = leaves.map(l => `
          <tr>
            <td><strong>${l.emp_code}</strong></td>
            <td><span class="badge badge-leave">${l.leave_type}</span></td>
            <td>${l.start_date}</td>
            <td>${l.end_date}</td>
            <td>${l.reason}</td>
            <td>
              <span class="badge ${l.status === 'APPROVED' ? 'badge-present' : l.status === 'REJECTED' ? 'badge-absent' : 'badge-leave'}">${l.status}</span>
            </td>
            <td>${l.action_by ? `${l.action_by} (${l.status})` : 'Pending'}</td>
            <td>
              ${l.status === 'PENDING' && canApprove ? `
                <div style="display: flex; gap: 0.35rem;">
                  <button class="btn btn-success btn-sm" onclick="handleActionLeave('${l.id}', 'APPROVED')">Approve</button>
                  <button class="btn btn-danger btn-sm" onclick="handleActionLeave('${l.id}', 'REJECTED')">Reject</button>
                </div>
              ` : '<span style="color: var(--text-muted); font-size: 0.75rem;">None</span>'}
            </td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {
    console.error('Leaves load failed:', err);
  }
}

async function handleActionLeave(id, action) {
  try {
    await API.actionLeave(id, action, 'Processed via HR portal');
    API.toast(`Leave request ${action.toLowerCase()} successfully`, 'success');
    loadLeavesData();
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: Recruitment & ATS
// --------------------------------------------------------------------------- //
async function renderRecruitmentView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Recruitment & Talent Acquisition</h1>
        <p>Open job requisitions and candidate hiring pipeline.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openAddCandidateModal()">+ Add Candidate</button>
        <button class="btn btn-primary" onclick="openAddJobModal()">+ Create Requisition</button>
      </div>
    </div>

    <div class="dashboard-grid" style="margin-bottom: 1.5rem;" id="jobs-container">
      <!-- Jobs rendered dynamically -->
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Candidate Pipeline & Stage Tracking</div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Applied For</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Stage</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody id="candidates-table-body">
            <tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Loading candidates...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  loadRecruitmentData();
}

async function loadRecruitmentData() {
  try {
    const [jobs, candidates] = await Promise.all([
      API.getJobs(),
      API.getCandidates()
    ]);

    const jobsContainer = document.getElementById('jobs-container');
    if (jobsContainer) {
      if (jobs.length === 0) {
        jobsContainer.innerHTML = '<div class="card" style="grid-column: span 12; text-align: center; color: var(--text-muted);">No open job requisitions. Create one above!</div>';
      } else {
        jobsContainer.innerHTML = jobs.map(j => `
          <div class="card" style="grid-column: span 3;">
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary);">${j.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin: 0.25rem 0;">${j.department} • ${j.location}</div>
            <div style="margin: 0.75rem 0; display: flex; justify-content: space-between;">
              <span class="badge badge-wfh">${j.type}</span>
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary-600);">${j.applicants_count} Applicants</span>
            </div>
          </div>
        `).join('');
      }
    }

    const candBody = document.getElementById('candidates-table-body');
    if (candBody) {
      if (candidates.length === 0) {
        candBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No candidates in pipeline.</td></tr>';
      } else {
        candBody.innerHTML = candidates.map(c => `
          <tr>
            <td>
              <div style="font-weight: 600;">${c.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${c.email}</div>
            </td>
            <td>${c.job_title}</td>
            <td>${c.department}</td>
            <td>${c.experience_years} years</td>
            <td>
              <select class="form-control" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;" onchange="handleStageChange('${c.id}', this.value)">
                ${['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'].map(st => `
                  <option value="${st}" ${c.stage === st ? 'selected' : ''}>${st}</option>
                `).join('')}
              </select>
            </td>
            <td>
              ${c.stage === 'Hired' && !c.converted_emp_code ? `
                <button class="btn btn-success btn-sm" onclick="handleConvertCandidate('${c.id}')">Convert to Employee</button>
              ` : c.converted_emp_code ? `
                <span class="badge badge-present">Converted: ${c.converted_emp_code}</span>
              ` : '<span style="color: var(--text-muted); font-size: 0.75rem;">In Progress</span>'}
            </td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {
    console.error('Recruitment load error:', err);
  }
}

async function handleStageChange(candId, newStage) {
  try {
    await API.updateCandidateStage(candId, newStage);
    API.toast(`Candidate stage updated to ${newStage}`, 'success');
    loadRecruitmentData();
  } catch (err) {}
}

async function handleConvertCandidate(candId) {
  try {
    const res = await API.convertCandidate(candId);
    API.toast(res.message, 'success');
    loadRecruitmentData();
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: Payroll & Compensation
// --------------------------------------------------------------------------- //
async function renderPayrollView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Payroll & Compensation Operations</h1>
        <p>Restricted payroll periods and itemized employee payslip generator.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="viewPayslipModal('${AppState.user.emp_code}')">📄 View My Payslip</button>
      </div>
    </div>

    <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon primary">💰</div>
        <div class="stat-info">
          <span class="stat-value">₹9,50,000</span>
          <span class="stat-label">July 2026 Disbursed</span>
        </div>
      </div>
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon success">🛡️</div>
        <div class="stat-info">
          <span class="stat-value">100%</span>
          <span class="stat-label">Tax & PF Compliant</span>
        </div>
      </div>
      <div class="card stat-card" style="grid-column: span 4;">
        <div class="stat-icon info">👥</div>
        <div class="stat-info">
          <span class="stat-value">8</span>
          <span class="stat-label">Employees on Payroll</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Processed Payroll Disbursement Cycles</div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payroll Month</th>
              <th>Employees Count</th>
              <th>Total Gross (INR)</th>
              <th>Total Net Pay (INR)</th>
              <th>Status</th>
              <th>Disbursed On</th>
            </tr>
          </thead>
          <tbody id="payroll-periods-body">
            <tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Loading payroll records...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  try {
    const periods = await API.getPayrollPeriods();
    const tbody = document.getElementById('payroll-periods-body');
    if (tbody) {
      tbody.innerHTML = periods.map(p => `
        <tr>
          <td style="font-weight: 600;">${p.month}</td>
          <td>${p.employees_count}</td>
          <td>₹${p.total_gross.toLocaleString()}</td>
          <td style="font-weight: 700; color: var(--success);">₹${p.total_net.toLocaleString()}</td>
          <td><span class="badge badge-present">${p.status}</span></td>
          <td>${p.processed_on}</td>
        </tr>
      `).join('');
    }
  } catch (err) {}
}

async function viewPayslipModal(empCode) {
  try {
    const payslip = await API.getPayslip(empCode);
    const modal = document.getElementById('common-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const footer = document.getElementById('modal-footer');

    title.textContent = `Itemized Payslip — ${payslip.name} (${payslip.month})`;
    body.innerHTML = `
      <div style="background-color: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
          <div><strong>Employee:</strong> ${payslip.name} (${payslip.emp_code})</div>
          <div><strong>Department:</strong> ${payslip.department}</div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-top: 0.5rem;">
          <div><strong>Disbursement Date:</strong> ${payslip.payment_date}</div>
          <div><strong>Currency:</strong> ${payslip.currency}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h4 style="font-size: 0.85rem; color: var(--success); margin-bottom: 0.5rem;">Earnings</h4>
          <table style="font-size: 0.8rem;">
            ${payslip.earnings.map(e => `
              <tr>
                <td>${e.component}</td>
                <td style="text-align: right; font-weight: 600;">₹${e.amount.toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr style="border-top: 1px solid var(--border-color); font-weight: 700;">
              <td>Total Gross Earnings</td>
              <td style="text-align: right;">₹${payslip.gross_earnings.toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div>
          <h4 style="font-size: 0.85rem; color: var(--danger); margin-bottom: 0.5rem;">Deductions</h4>
          <table style="font-size: 0.8rem;">
            ${payslip.deductions.map(d => `
              <tr>
                <td>${d.component}</td>
                <td style="text-align: right; font-weight: 600;">₹${d.amount.toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr style="border-top: 1px solid var(--border-color); font-weight: 700;">
              <td>Total Deductions</td>
              <td style="text-align: right;">₹${payslip.total_deductions.toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: var(--text-primary);">Net Disbursed Take-Home</span>
        <span style="font-size: 1.5rem; font-weight: 800; color: var(--success);">₹${payslip.net_salary.toLocaleString()}</span>
      </div>
    `;

    footer.innerHTML = `
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">Print Payslip</button>
    `;

    modal.classList.add('open');
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: IT Asset Management
// --------------------------------------------------------------------------- //
async function renderAssetsView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>IT Hardware & Equipment Management</h1>
        <p>Enterprise physical asset repository, serial tracking, and allocations.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openAddAssetModal()">+ Register Asset</button>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Asset Tag</th>
              <th>Category</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody id="assets-table-body">
            <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading assets...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  loadAssetsData();
}

async function loadAssetsData() {
  try {
    const assets = await API.getAssets();
    const tbody = document.getElementById('assets-table-body');
    if (tbody) {
      if (assets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No assets registered yet.</td></tr>';
      } else {
        tbody.innerHTML = assets.map(a => `
          <tr>
            <td><strong>${a.asset_tag}</strong></td>
            <td><span class="badge badge-wfh">${a.category}</span></td>
            <td>${a.model}</td>
            <td style="font-family: monospace; font-size: 0.8rem;">${a.serial_no}</td>
            <td>
              <span class="badge ${a.status === 'ASSIGNED' ? 'badge-present' : 'badge-leave'}">${a.status}</span>
            </td>
            <td>${a.assigned_to_name ? `${a.assigned_to_name} (${a.assigned_to})` : '<span style="color: var(--text-muted);">Unassigned</span>'}</td>
            <td>
              ${a.status === 'ASSIGNED' ? `
                <button class="btn btn-secondary btn-sm" onclick="handleReturnAsset('${a.id}')">Return</button>
              ` : `
                <button class="btn btn-primary btn-sm" onclick="openAssignAssetModal('${a.id}', '${a.asset_tag}')">Assign</button>
              `}
            </td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {}
}

async function handleReturnAsset(assetId) {
  try {
    await API.returnAsset(assetId);
    API.toast('Asset marked as returned and available', 'success');
    loadAssetsData();
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: HR Helpdesk & Policies
// --------------------------------------------------------------------------- //
async function renderHelpdeskView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>HR Helpdesk & Policy Assistant</h1>
        <p>Raise service tickets and explore official company policies.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openCreateTicketModal()">+ Raise Helpdesk Ticket</button>
      </div>
    </div>

    <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div class="card-title">Official HR Policy & Knowledge Base</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;" id="kb-articles-grid">
          <!-- KB Articles -->
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">My Tickets & Queries</div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody id="tickets-table-body">
            <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Loading tickets...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  loadHelpdeskData();
}

async function loadHelpdeskData() {
  try {
    const [kb, tickets] = await Promise.all([
      API.getKnowledgeBase(),
      API.getTickets()
    ]);

    const kbGrid = document.getElementById('kb-articles-grid');
    if (kbGrid) {
      kbGrid.innerHTML = kb.map(a => `
        <div style="background-color: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-500);">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${a.title}</div>
          <div style="font-size: 0.75rem; color: var(--primary-600); margin: 0.2rem 0;">${a.category}</div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">${a.summary}</p>
        </div>
      `).join('');
    }

    const tbody = document.getElementById('tickets-table-body');
    if (tbody) {
      if (tickets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No open tickets found.</td></tr>';
      } else {
        tbody.innerHTML = tickets.map(t => `
          <tr>
            <td><strong>${t.ticket_no}</strong></td>
            <td>${t.category}</td>
            <td><span class="badge ${t.priority === 'HIGH' ? 'badge-absent' : 'badge-leave'}">${t.priority}</span></td>
            <td style="font-weight: 600;">${t.subject}</td>
            <td><span class="badge ${t.status === 'RESOLVED' ? 'badge-present' : 'badge-leave'}">${t.status}</span></td>
            <td>${new Date(t.created_at).toLocaleDateString()}</td>
            <td>${t.resolution || '<span style="color: var(--text-muted);">Awaiting response</span>'}</td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {}
}

// --------------------------------------------------------------------------- //
// VIEW: Analytics & MongoDB Explain Inspector
// --------------------------------------------------------------------------- //
async function renderAnalyticsView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Workforce Analytics & Query Optimization</h1>
        <p>MongoDB aggregation pipelines, competition leaderboards, and execution plan verification.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="openExplainModal()">🔍 View Query Explain Plans</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Department Summary Bar Chart -->
      <div class="card" style="grid-column: span 7;">
        <div class="card-header">
          <div>
            <div class="card-title">Department Attendance & Average Hours (July 2026)</div>
            <div class="card-subtitle">Real aggregation from GET /analytics/departments/summary</div>
          </div>
        </div>
        <div style="height: 280px; position: relative;">
          <canvas id="dept-summary-chart"></canvas>
        </div>
      </div>

      <!-- Late Leaderboard -->
      <div class="card" style="grid-column: span 5;">
        <div class="card-header">
          <div>
            <div class="card-title">Late-Arrival Leaderboard</div>
            <div class="card-subtitle">Standard Competition Ranking (R2, ties preserved)</div>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Employee</th>
                <th>Dept</th>
                <th>Late (Min)</th>
                <th>Occurrences</th>
              </tr>
            </thead>
            <tbody id="leaderboard-table-body">
              <tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Loading ranking...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Department Trend Chart -->
      <div class="card" style="grid-column: span 12;">
        <div class="card-header">
          <div>
            <div class="card-title">Engineering Daily Attendance Trend & 7-Day Moving Average</div>
            <div class="card-subtitle">Aggregated via $densify gap-filling from GET /analytics/departments/Engineering/trend</div>
          </div>
        </div>
        <div style="height: 300px; position: relative;">
          <canvas id="dept-trend-chart"></canvas>
        </div>
      </div>
    </div>
  `;

  loadAnalyticsVisuals();
}

async function loadAnalyticsVisuals() {
  const month = '2026-07';

  try {
    const [summary, lead, trend] = await Promise.all([
      API.getDepartmentSummary(month),
      API.getLateLeaderboard(month, 5),
      API.getDepartmentTrend('Engineering', '2026-07-01', '2026-07-15')
    ]);

    // 1. Department Summary Chart
    const deptCanvas = document.getElementById('dept-summary-chart');
    if (deptCanvas && typeof Chart !== 'undefined') {
      const labels = summary.items.map(d => d.department);
      const presentDays = summary.items.map(d => d.present_days);
      const avgHours = summary.items.map(d => d.avg_work_hours || 0);

      AppState.activeCharts.dept = new Chart(deptCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Present Days',
              data: presentDays,
              backgroundColor: '#4f46e5',
              borderRadius: 6
            },
            {
              label: 'Avg Work Hours',
              data: avgHours,
              backgroundColor: '#10b981',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // 2. Leaderboard Table
    const leadBody = document.getElementById('leaderboard-table-body');
    if (leadBody) {
      if (lead.items.length === 0) {
        leadBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No late records in period.</td></tr>';
      } else {
        leadBody.innerHTML = lead.items.map(l => `
          <tr>
            <td><strong style="color: var(--primary-600);">#${l.rank}</strong></td>
            <td style="font-weight: 600;">${l.name}</td>
            <td>${l.department}</td>
            <td style="color: var(--danger); font-weight: 700;">${l.total_late_minutes} min</td>
            <td>${l.late_count}</td>
          </tr>
        `).join('');
      }
    }

    // 3. Department Trend Chart
    const trendCanvas = document.getElementById('dept-trend-chart');
    if (trendCanvas && typeof Chart !== 'undefined') {
      const dates = trend.items.map(t => t.date);
      const rates = trend.items.map(t => t.attendance_rate !== null ? (t.attendance_rate * 100) : null);
      const movAvg = trend.items.map(t => t.moving_avg_7d !== null ? (t.moving_avg_7d * 100) : null);

      AppState.activeCharts.trend = new Chart(trendCanvas, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Daily Attendance Rate (%)',
              data: rates,
              borderColor: '#0ea5e9',
              backgroundColor: 'rgba(14, 165, 233, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: '7-Day Moving Average (%)',
              data: movAvg,
              borderColor: '#f59e0b',
              borderDash: [5, 5],
              tension: 0.2,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' } },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: { callback: v => `${v}%` }
            }
          }
        }
      });
    }

  } catch (err) {
    console.error('Analytics visuals load failed:', err);
  }
}

// --------------------------------------------------------------------------- //
// MODAL WORKFLOWS
// --------------------------------------------------------------------------- //
function closeModal() {
  const modal = document.getElementById('common-modal');
  if (modal) modal.classList.remove('open');
}

function openAddEmployeeModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Add Corporate Employee Record';
  body.innerHTML = `
    <form id="add-employee-form">
      <div class="form-group">
        <label class="form-label">Employee Code (EMP followed by 4-6 digits)</label>
        <input type="text" id="new-emp-code" class="form-control" placeholder="EMP0012" required pattern="^EMP\\d{4,6}$">
      </div>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" id="new-emp-name" class="form-control" placeholder="Vikram Malhotra" required>
      </div>
      <div class="form-group">
        <label class="form-label">Corporate Email</label>
        <input type="email" id="new-emp-email" class="form-control" placeholder="vikram@example.com" required>
      </div>
      <div class="form-group">
        <label class="form-label">Department</label>
        <select id="new-emp-dept" class="form-control">
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Product Management">Product Management</option>
          <option value="Operations">Operations</option>
        </select>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Shift Start (HH:MM)</label>
          <input type="text" id="new-emp-shift-start" class="form-control" value="09:30" required>
        </div>
        <div class="form-group">
          <label class="form-label">Shift End (HH:MM)</label>
          <input type="text" id="new-emp-shift-end" class="form-control" value="18:30" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Joined On (YYYY-MM-DD)</label>
        <input type="date" id="new-emp-joined" class="form-control" value="2026-07-01" required>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitAddEmployee()">Create Record</button>
  `;

  modal.classList.add('open');
}

async function submitAddEmployee() {
  const code = document.getElementById('new-emp-code').value;
  const name = document.getElementById('new-emp-name').value;
  const email = document.getElementById('new-emp-email').value;
  const dept = document.getElementById('new-emp-dept').value;
  const sStart = document.getElementById('new-emp-shift-start').value;
  const sEnd = document.getElementById('new-emp-shift-end').value;
  const joined = document.getElementById('new-emp-joined').value;

  try {
    await API.createEmployee({
      emp_code: code,
      name: name,
      email: email,
      department: dept,
      shift_start: sStart,
      shift_end: sEnd,
      joined_on: joined
    });
    API.toast(`Employee ${code} successfully created`, 'success');
    closeModal();
    navigate('employees');
  } catch (err) {}
}

function openRegularizeModal(empCode, date, rawJson) {
  const l = JSON.parse(decodeURIComponent(rawJson));
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Regularize Attendance — ${empCode} (${date})`;
  body.innerHTML = `
    <form id="reg-form">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select id="reg-status" class="form-control">
          ${['PRESENT', 'WFH', 'ON_DUTY', 'ABSENT', 'LEAVE'].map(st => `
            <option value="${st}" ${l.status === st ? 'selected' : ''}>${st}</option>
          `).join('')}
        </select>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Punch In Time (IST)</label>
          <input type="text" id="reg-punch-in-str" class="form-control" value="${l.punch_in ? new Date(l.punch_in).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) : ''}" placeholder="09:30:00">
        </div>
        <div class="form-group">
          <label class="form-label">Punch Out Time (IST)</label>
          <input type="text" id="reg-punch-out-str" class="form-control" value="${l.punch_out ? new Date(l.punch_out).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) : ''}" placeholder="18:30:00">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Reason for Regularization (min 5 chars)</label>
        <input type="text" id="reg-reason" class="form-control" placeholder="Biometric scan failure at front desk" required minlength="5">
      </div>
      <div class="form-group">
        <label class="form-label">Authorized By</label>
        <input type="text" id="reg-by" class="form-control" value="${AppState.user.name}" required>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitRegularization('${empCode}', '${date}', ${l.punch_in || 0}, ${l.punch_out || 0})">Submit Correction</button>
  `;

  modal.classList.add('open');
}

async function submitRegularization(empCode, dateStr, oldInMs, oldOutMs) {
  const statusVal = document.getElementById('reg-status').value;
  const inStr = document.getElementById('reg-punch-in-str').value.trim();
  const outStr = document.getElementById('reg-punch-out-str').value.trim();
  const reason = document.getElementById('reg-reason').value.trim();
  const regBy = document.getElementById('reg-by').value.trim();

  let pInMs = null;
  let pOutMs = null;

  if (['PRESENT', 'WFH', 'ON_DUTY'].includes(statusVal)) {
    if (inStr) {
      const [h, m, s] = inStr.split(':').map(Number);
      const dt = new Date(`${dateStr}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s||0).padStart(2,'0')}+05:30`);
      pInMs = dt.getTime();
    } else {
      pInMs = oldInMs || null;
    }

    if (outStr) {
      const [h, m, s] = outStr.split(':').map(Number);
      const dt = new Date(`${dateStr}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s||0).padStart(2,'0')}+05:30`);
      pOutMs = dt.getTime();
    } else {
      pOutMs = oldOutMs || null;
    }
  }

  try {
    const payload = {
      status: statusVal,
      reason: reason,
      regularized_by: regBy
    };
    if (pInMs) payload.punch_in = pInMs;
    if (pOutMs) payload.punch_out = pOutMs;

    await API.regularizeAttendance(empCode, dateStr, payload);
    API.toast('Record regularized and audit history recorded', 'success');
    closeModal();
    loadAttendanceLogs(1);
  } catch (err) {}
}

function openApplyLeaveModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Submit Leave Application';
  body.innerHTML = `
    <form id="apply-leave-form">
      <div class="form-group">
        <label class="form-label">Leave Category</label>
        <select id="leave-type-input" class="form-control">
          <option value="CASUAL">Casual Leave (CL)</option>
          <option value="SICK">Sick Leave (SL)</option>
          <option value="EARNED">Earned / Privilege Leave (EL)</option>
        </select>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="date" id="leave-start-input" class="form-control" value="2026-07-20" required>
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="date" id="leave-end-input" class="form-control" value="2026-07-21" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Reason for Absence</label>
        <textarea id="leave-reason-input" class="form-control" rows="3" placeholder="Personal emergency or scheduled holiday..." required></textarea>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitApplyLeave()">Submit Request</button>
  `;

  modal.classList.add('open');
}

async function submitApplyLeave() {
  const type = document.getElementById('leave-type-input').value;
  const start = document.getElementById('leave-start-input').value;
  const end = document.getElementById('leave-end-input').value;
  const reason = document.getElementById('leave-reason-input').value;

  try {
    await API.applyLeave({
      emp_code: AppState.user.emp_code,
      leave_type: type,
      start_date: start,
      end_date: end,
      reason: reason
    });
    API.toast('Leave application submitted for approval', 'success');
    closeModal();
    if (AppState.currentView === 'leaves') loadLeavesData();
  } catch (err) {}
}

function openAddJobModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Create New Job Requisition';
  body.innerHTML = `
    <form id="add-job-form">
      <div class="form-group">
        <label class="form-label">Job Title</label>
        <input type="text" id="job-title-input" class="form-control" placeholder="Lead Software Architect" required>
      </div>
      <div class="form-group">
        <label class="form-label">Department</label>
        <select id="job-dept-input" class="form-control">
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Location</label>
          <input type="text" id="job-loc-input" class="form-control" value="Bengaluru, India">
        </div>
        <div class="form-group">
          <label class="form-label">Open Positions</label>
          <input type="number" id="job-openings-input" class="form-control" value="2" min="1" max="20">
        </div>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitAddJob()">Publish Requisition</button>
  `;

  modal.classList.add('open');
}

async function submitAddJob() {
  const title = document.getElementById('job-title-input').value;
  const dept = document.getElementById('job-dept-input').value;
  const loc = document.getElementById('job-loc-input').value;
  const openings = parseInt(document.getElementById('job-openings-input').value, 10);

  try {
    await API.createJob({
      title: title,
      department: dept,
      location: loc,
      openings: openings
    });
    API.toast('Job requisition created', 'success');
    closeModal();
    loadRecruitmentData();
  } catch (err) {}
}

function openAddCandidateModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Add Candidate Application';
  body.innerHTML = `
    <form id="add-cand-form">
      <div class="form-group">
        <label class="form-label">Candidate Full Name</label>
        <input type="text" id="cand-name-input" class="form-control" placeholder="Rohan Mehra" required>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" id="cand-email-input" class="form-control" placeholder="rohan@example.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="text" id="cand-phone-input" class="form-control" placeholder="+91 98765 43210" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Relevant Experience (Years)</label>
        <input type="number" id="cand-exp-input" class="form-control" value="4.5" step="0.5">
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitAddCandidate()">Add Candidate</button>
  `;

  modal.classList.add('open');
}

async function submitAddCandidate() {
  const name = document.getElementById('cand-name-input').value;
  const email = document.getElementById('cand-email-input').value;
  const phone = document.getElementById('cand-phone-input').value;
  const exp = parseFloat(document.getElementById('cand-exp-input').value);

  try {
    await API.addCandidate({
      job_id: "general",
      name: name,
      email: email,
      phone: phone,
      experience_years: exp
    });
    API.toast('Candidate added to pipeline', 'success');
    closeModal();
    loadRecruitmentData();
  } catch (err) {}
}

function openAddAssetModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Register IT Hardware Asset';
  body.innerHTML = `
    <form id="add-asset-form">
      <div class="form-group">
        <label class="form-label">Asset Tag</label>
        <input type="text" id="asset-tag-input" class="form-control" placeholder="AST-1005" required>
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select id="asset-cat-input" class="form-control">
          <option value="LAPTOP">Laptop</option>
          <option value="MONITOR">Monitor / Display</option>
          <option value="MOBILE">Mobile Device</option>
          <option value="ACCESS_CARD">Security Token</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Make & Model</label>
        <input type="text" id="asset-model-input" class="form-control" placeholder="Dell XPS 15 9530" required>
      </div>
      <div class="form-group">
        <label class="form-label">Serial Number</label>
        <input type="text" id="asset-serial-input" class="form-control" placeholder="SN-9982410" required>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitAddAsset()">Register</button>
  `;

  modal.classList.add('open');
}

async function submitAddAsset() {
  const tag = document.getElementById('asset-tag-input').value;
  const cat = document.getElementById('asset-cat-input').value;
  const model = document.getElementById('asset-model-input').value;
  const serial = document.getElementById('asset-serial-input').value;

  try {
    await API.addAsset({
      asset_tag: tag,
      category: cat,
      model: model,
      serial_no: serial
    });
    API.toast('Asset registered successfully', 'success');
    closeModal();
    loadAssetsData();
  } catch (err) {}
}

async function openAssignAssetModal(assetId, tag) {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = `Assign Hardware Asset — ${tag}`;
  body.innerHTML = `
    <div class="form-group">
      <label class="form-label">Select Employee to Assign</label>
      <select id="assign-emp-select" class="form-control">
        <option value="">Loading workforce records...</option>
      </select>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitAssignAsset('${assetId}')">Confirm Assignment</button>
  `;

  modal.classList.add('open');

  try {
    const emps = await API.getEmployees(null, 1, 100);
    const sel = document.getElementById('assign-emp-select');
    if (sel && emps.items) {
      sel.innerHTML = emps.items.map(e => `
        <option value="${e.emp_code}">${e.name} (${e.emp_code}) — ${e.department}</option>
      `).join('');
    }
  } catch (err) {
    const sel = document.getElementById('assign-emp-select');
    if (sel) sel.innerHTML = '<option value="EMP0001">Asha Rao (EMP0001)</option>';
  }
}

async function submitAssignAsset(assetId) {
  const sel = document.getElementById('assign-emp-select');
  const empCode = sel ? sel.value : null;
  if (!empCode) return;
  try {
    await API.assignAsset(assetId, empCode);
    API.toast(`Asset assigned successfully to ${empCode}`, 'success');
    closeModal();
    loadAssetsData();
  } catch (err) {}
}

function openCreateTicketModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Submit HR Support Ticket';
  body.innerHTML = `
    <form id="create-ticket-form">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select id="ticket-cat-input" class="form-control">
          <option value="Payroll">Payroll & Salary</option>
          <option value="Attendance">Attendance Regularization</option>
          <option value="Benefits">Health Insurance & Benefits</option>
          <option value="IT Support">Hardware & Accounts</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Priority</label>
        <select id="ticket-prio-input" class="form-control">
          <option value="LOW">Low</option>
          <option value="MEDIUM" selected>Medium</option>
          <option value="HIGH">High (Urgent)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Subject</label>
        <input type="text" id="ticket-sub-input" class="form-control" placeholder="Brief issue summary" required minlength="3">
      </div>
      <div class="form-group">
        <label class="form-label">Detailed Description</label>
        <textarea id="ticket-desc-input" class="form-control" rows="3" placeholder="Provide background and necessary context..." required minlength="5"></textarea>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitCreateTicket()">Submit Ticket</button>
  `;

  modal.classList.add('open');
}

async function submitCreateTicket() {
  const cat = document.getElementById('ticket-cat-input').value;
  const prio = document.getElementById('ticket-prio-input').value;
  const sub = document.getElementById('ticket-sub-input').value;
  const desc = document.getElementById('ticket-desc-input').value;

  try {
    await API.createTicket({
      emp_code: AppState.user.emp_code,
      category: cat,
      priority: prio,
      subject: sub,
      description: desc
    });
    API.toast('Helpdesk ticket raised successfully', 'success');
    closeModal();
    if (AppState.currentView === 'helpdesk') loadHelpdeskData();
  } catch (err) {}
}

async function openExplainModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'MongoDB Query Plan & Index Inspector';
  body.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <label class="form-label">Select Endpoint Query to Explain</label>
      <select id="explain-endpoint-select" class="form-control" onchange="runExplainQuery()">
        <option value="attendance_list">attendance_list (GET /attendance)</option>
        <option value="employee_monthly">employee_monthly (GET /analytics/employees/{id}/monthly)</option>
        <option value="department_summary">department_summary (GET /analytics/departments/summary)</option>
        <option value="late_leaderboard">late_leaderboard (GET /analytics/leaderboard/late)</option>
        <option value="department_trend">department_trend (GET /analytics/departments/{dept}/trend)</option>
      </select>
    </div>
    <div id="explain-results-box" style="background-color: #0b0f19; color: #10b981; padding: 1rem; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.75rem; max-height: 400px; overflow-y: auto;">
      Executing plan inspection...
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  modal.classList.add('open');
  runExplainQuery();
}

async function runExplainQuery() {
  const ep = document.getElementById('explain-endpoint-select').value;
  const box = document.getElementById('explain-results-box');
  box.textContent = 'Analyzing MongoDB executionStats...';

  try {
    let params = {};
    if (ep === 'attendance_list') params = { page: 1, page_size: 20 };
    if (ep === 'employee_monthly') params = { emp_code: 'EMP0001', month: '2026-07' };
    if (ep === 'department_summary') params = { month: '2026-07' };
    if (ep === 'late_leaderboard') params = { month: '2026-07' };
    if (ep === 'department_trend') params = { department: 'Engineering', from: '2026-07-06', to: '2026-07-10' };

    const res = await API.getExplain(ep, params);
    box.textContent = JSON.stringify(res, null, 2);
  } catch (err) {
    box.textContent = 'Explain query failed: ' + err.message;
  }
}

async function seedEnterpriseData() {
  try {
    const res = await API.seedEnterprise();
    API.toast(res.message, 'success');
    navigate(AppState.currentView);
  } catch (err) {}
}

function setupGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const dropdown = document.getElementById('global-search-results');
  if (!input || !dropdown) return;

  let debounceTimer;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const q = e.target.value.trim();
    if (q.length < 2) {
      dropdown.classList.add('hidden');
      dropdown.innerHTML = '';
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const results = await API.omniSearch(q);
        renderGlobalSearchResults(results, dropdown);
      } catch (err) {
        dropdown.classList.add('hidden');
      }
    }, 300);
  });

  // Hide on click outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  input.addEventListener('focus', () => {
    if (dropdown.innerHTML.trim().length > 0) {
      dropdown.classList.remove('hidden');
    }
  });
}

function renderGlobalSearchResults(results, dropdown) {
  let html = '';
  let count = 0;

  if (results.employees && results.employees.length > 0) {
    count += results.employees.length;
    html += `<div class="search-category-title">Employees</div>`;
    results.employees.forEach(emp => {
      const safeJson = encodeURIComponent(JSON.stringify(emp));
      html += `
        <div class="search-result-item" onclick="viewEmployeeProfile('${emp.emp_code}', '${safeJson}')">
          <div>
            <div class="item-title">${emp.name}</div>
            <div class="item-desc">${emp.department} • ${emp.email || ''}</div>
          </div>
          <span class="badge" style="background: rgba(79,70,229,0.1); color: var(--primary-600);">${emp.emp_code}</span>
        </div>
      `;
    });
  }

  if (results.jobs && results.jobs.length > 0) {
    count += results.jobs.length;
    html += `<div class="search-category-title">Open Job Requisitions</div>`;
    results.jobs.forEach(j => {
      html += `
        <div class="search-result-item" onclick="navigate('recruitment')">
          <div>
            <div class="item-title">${j.title}</div>
            <div class="item-desc">${j.department} • ${j.location || ''}</div>
          </div>
          <span class="badge badge-wfh">${j.openings || 1} Openings</span>
        </div>
      `;
    });
  }

  if (results.assets && results.assets.length > 0) {
    count += results.assets.length;
    html += `<div class="search-category-title">IT Equipment</div>`;
    results.assets.forEach(a => {
      html += `
        <div class="search-result-item" onclick="navigate('assets')">
          <div>
            <div class="item-title">${a.model}</div>
            <div class="item-desc">${a.category} • ${a.serial_no || ''}</div>
          </div>
          <span class="badge badge-present">${a.asset_tag}</span>
        </div>
      `;
    });
  }

  if (results.tickets && results.tickets.length > 0) {
    count += results.tickets.length;
    html += `<div class="search-category-title">Helpdesk Tickets</div>`;
    results.tickets.forEach(t => {
      html += `
        <div class="search-result-item" onclick="navigate('helpdesk')">
          <div>
            <div class="item-title">${t.subject}</div>
            <div class="item-desc">${t.category} • Priority: ${t.priority}</div>
          </div>
          <span class="badge badge-leave">${t.ticket_no}</span>
        </div>
      `;
    });
  }

  if (count === 0) {
    dropdown.innerHTML = `<div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No matching records found</div>`;
  } else {
    dropdown.innerHTML = html;
  }
  dropdown.classList.remove('hidden');
}

// --------------------------------------------------------------------------- //
// VIEW: PowerBI Interactive Employee Dataset & Analytics Studio
// --------------------------------------------------------------------------- //
AppState.powerbi = {
  rawDataset: [],
  activeFilters: {
    department: 'ALL',
    month: 'ALL',
    employee: 'ALL',
    leave_type: 'ALL',
    crossFilter: null // { field, value, label }
  },
  chartModes: {
    monthly: 'combo', // combo | bar | line
    employee: 'bar',
    category: 'doughnut',
    daily: 'line'
  },
  tablePage: 1,
  tablePageSize: 10,
  tableQuery: ''
};

async function renderPowerbiView(container) {
  // If no dataset currently loaded, fetch default 12-month enterprise dataset
  if (!AppState.powerbi.rawDataset || AppState.powerbi.rawDataset.length === 0) {
    try {
      const data = await API.getPowerBiSampleDataset();
      AppState.powerbi.rawDataset = data.records;
    } catch (err) {
      console.warn('PowerBI sample dataset fetch fallback:', err);
    }
  }

  container.innerHTML = `
    <!-- PowerBI Header Banner -->
    <div class="powerbi-banner">
      <div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.75rem;">📈</span>
          <h1 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 800;">PowerBI Employee Analytics Studio</h1>
          <span class="badge" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);">Interactive Cross-Filtering</span>
        </div>
        <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin-top: 0.35rem;">
          Insert any employee dataset. Click on any bar, slice, or timeline point to slice and filter all charts and records dynamically.
        </p>
      </div>

      <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
        <button class="btn btn-secondary" onclick="openPowerBiUploadModal()" style="background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.25);">
          📂 Upload Dataset (CSV/JSON)
        </button>
        <button class="btn btn-secondary" onclick="openPowerBiPasteModal()" style="background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.25);">
          📋 Paste Raw Table
        </button>
        <button class="btn btn-secondary" onclick="loadLiveDbDataset()" style="background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.25);">
          🗄️ Live DB Sync
        </button>
        <button class="btn btn-primary" onclick="exportPowerBiFilteredCsv()" style="background: white; color: var(--primary-700); font-weight: 700;">
          📥 Export Slice CSV
        </button>
      </div>
    </div>

    <!-- Active Cross-Filter Indicator Banner (Visible when cross-filtered) -->
    <div id="pbi-crossfilter-bar" class="crossfilter-active-bar" style="display: none;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1.25rem;">🎯</span>
        <div>
          <strong style="color: var(--primary-600);">Active PowerBI Cross-Filter:</strong>
          <span id="pbi-crossfilter-desc" style="font-weight: 600; margin-left: 0.35rem;">None</span>
          <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.5rem;">(All charts & tables are synchronized to this selection)</span>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="clearPowerBiCrossFilter()">✕ Clear Cross-Filter</button>
    </div>

    <!-- Interactive PowerBI Slicers Bar -->
    <div class="card" style="margin-bottom: 1.25rem; padding: 1rem;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Department Slicer:</span>
          <select id="pbi-slicer-dept" class="form-control" style="width: 170px; font-size: 0.8rem;" onchange="handlePowerBiSlicerChange()">
            <option value="ALL">All Departments</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Month Slicer:</span>
          <select id="pbi-slicer-month" class="form-control" style="width: 150px; font-size: 0.8rem;" onchange="handlePowerBiSlicerChange()">
            <option value="ALL">All Months</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Employee:</span>
          <select id="pbi-slicer-emp" class="form-control" style="width: 180px; font-size: 0.8rem;" onchange="handlePowerBiSlicerChange()">
            <option value="ALL">All Employees</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Leave / Status:</span>
          <select id="pbi-slicer-type" class="form-control" style="width: 160px; font-size: 0.8rem;" onchange="handlePowerBiSlicerChange()">
            <option value="ALL">All Categories</option>
            <option value="LEAVE">Leaves Only</option>
            <option value="PERMISSION">Permissions Only</option>
            <option value="PRESENT">Present Only</option>
            <option value="WFH">WFH Only</option>
          </select>
        </div>

        <button class="btn btn-secondary btn-sm" onclick="resetPowerBiFilters()" style="margin-left: auto;">
          🔄 Reset Slicers
        </button>
      </div>
    </div>

    <!-- PowerBI KPI Scorecards -->
    <div class="dashboard-grid" style="margin-bottom: 1.25rem;">
      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon primary">👥</div>
        <div class="stat-info">
          <span class="stat-value" id="pbi-kpi-employees">0</span>
          <span class="stat-label">Employees in Active Slice</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon warning">🏖️</div>
        <div class="stat-info">
          <span class="stat-value" id="pbi-kpi-leaves">0</span>
          <span class="stat-label">Total Leaves (Days)</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon info">🎫</div>
        <div class="stat-info">
          <span class="stat-value" id="pbi-kpi-permissions">0</span>
          <span class="stat-label">Permissions / Gate Passes</span>
        </div>
      </div>

      <div class="card stat-card" style="grid-column: span 3;">
        <div class="stat-icon success">⏱️</div>
        <div class="stat-info">
          <span class="stat-value" id="pbi-kpi-presence">0%</span>
          <span class="stat-label">Workforce Presence Rate</span>
        </div>
      </div>
    </div>

    <!-- PowerBI 4 Dynamic Visualizations Grid -->
    <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
      <!-- Chart 1: Monthly Leaves & Permissions Trajectory -->
      <div class="card" style="grid-column: span 7;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="card-title">1. Monthly Leaves & Permissions Trajectory</div>
            <div class="card-subtitle">💡 Click any bar to cross-filter the dashboard to that month</div>
          </div>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('monthly', 'combo')">Combo</button>
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('monthly', 'bar')">Bar</button>
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('monthly', 'line')">Line</button>
          </div>
        </div>
        <div style="height: 300px; position: relative;">
          <canvas id="pbi-chart-monthly" class="chart-clickable-canvas"></canvas>
        </div>
      </div>

      <!-- Chart 2: Employee Leave & Permission Distribution (Ranking) -->
      <div class="card" style="grid-column: span 5;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="card-title">2. Employee Leaves & Permissions Ranking</div>
            <div class="card-subtitle">💡 Click an employee row to isolate their personal trends</div>
          </div>
        </div>
        <div style="height: 300px; position: relative;">
          <canvas id="pbi-chart-employee" class="chart-clickable-canvas"></canvas>
        </div>
      </div>

      <!-- Chart 3: Leave Type & Permission Category Distribution -->
      <div class="card" style="grid-column: span 5;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="card-title">3. Leave Type & Reason Distribution</div>
            <div class="card-subtitle">💡 Click slice to filter by leave category</div>
          </div>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('category', 'doughnut')">Doughnut</button>
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('category', 'pie')">Pie</button>
            <button class="btn btn-secondary btn-sm" onclick="togglePowerBiChartMode('category', 'polarArea')">Polar</button>
          </div>
        </div>
        <div style="height: 290px; position: relative;">
          <canvas id="pbi-chart-category" class="chart-clickable-canvas"></canvas>
        </div>
      </div>

      <!-- Chart 4: Daily Timeline of Leaves & Permissions -->
      <div class="card" style="grid-column: span 7;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="card-title">4. Daily Workforce Timeline & Absence Waves</div>
            <div class="card-subtitle">Daily fluctuations of leaves, permissions, and work hours</div>
          </div>
        </div>
        <div style="height: 290px; position: relative;">
          <canvas id="pbi-chart-daily" class="chart-clickable-canvas"></canvas>
        </div>
      </div>
    </div>

    <!-- PowerBI Data Table Explorer -->
    <div class="card">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <div class="card-title">Active Dataset Records Explorer</div>
          <div class="card-subtitle" id="pbi-table-subtitle">Showing synchronized filtered records</div>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <input type="text" id="pbi-table-search" class="form-control" style="width: 220px; font-size: 0.8rem;" placeholder="Search in slice..." onkeyup="handlePowerBiTableSearch()">
          <button class="btn btn-secondary btn-sm" onclick="exportPowerBiFilteredCsv()">📥 Export CSV</button>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Leaves (Days)</th>
              <th>Leave Type</th>
              <th>Permissions</th>
              <th>Perm Reason</th>
              <th>Work Hours</th>
              <th>Overtime Min</th>
            </tr>
          </thead>
          <tbody id="pbi-table-body">
            <tr><td colspan="11" style="text-align: center; color: var(--text-muted);">Loading records...</td></tr>
          </tbody>
        </table>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <span id="pbi-table-pagination-info" style="font-size: 0.8rem; color: var(--text-muted);">Showing records</span>
        <div style="display: flex; gap: 0.5rem;" id="pbi-table-pagination-controls"></div>
      </div>
    </div>
  `;

  // Populate slicers dropdowns based on loaded dataset
  populatePowerBiSlicers();

  // Compute metrics and render all interconnected charts & tables
  updatePowerBiStudio();
}

function populatePowerBiSlicers() {
  const records = AppState.powerbi.rawDataset || [];
  const depts = Array.from(new Set(records.map(r => r.department).filter(Boolean))).sort();
  const months = Array.from(new Set(records.map(r => r.month).filter(Boolean))).sort();
  const emps = Array.from(new Set(records.map(r => `${r.name} (${r.emp_code})`))).sort();

  const deptSel = document.getElementById('pbi-slicer-dept');
  if (deptSel) {
    deptSel.innerHTML = '<option value="ALL">All Departments</option>' +
      depts.map(d => `<option value="${d}" ${AppState.powerbi.activeFilters.department === d ? 'selected' : ''}>${d}</option>`).join('');
  }

  const monthSel = document.getElementById('pbi-slicer-month');
  if (monthSel) {
    monthSel.innerHTML = '<option value="ALL">All Months</option>' +
      months.map(m => `<option value="${m}" ${AppState.powerbi.activeFilters.month === m ? 'selected' : ''}>${m}</option>`).join('');
  }

  const empSel = document.getElementById('pbi-slicer-emp');
  if (empSel) {
    empSel.innerHTML = '<option value="ALL">All Employees</option>' +
      emps.map(e => {
        const code = e.match(/\((.*?)\)/)?.[1] || e;
        return `<option value="${code}" ${AppState.powerbi.activeFilters.employee === code ? 'selected' : ''}>${e}</option>`;
      }).join('');
  }
}

function getFilteredPowerBiRecords() {
  const { department, month, employee, leave_type, crossFilter } = AppState.powerbi.activeFilters;
  let records = AppState.powerbi.rawDataset || [];

  // Standard slicer filters
  if (department !== 'ALL') {
    records = records.filter(r => r.department === department);
  }
  if (month !== 'ALL') {
    records = records.filter(r => r.month === month);
  }
  if (employee !== 'ALL') {
    records = records.filter(r => r.emp_code === employee);
  }
  if (leave_type !== 'ALL') {
    if (leave_type === 'LEAVE') records = records.filter(r => r.leaves > 0 || r.status === 'LEAVE');
    else if (leave_type === 'PERMISSION') records = records.filter(r => r.permissions > 0);
    else if (leave_type === 'PRESENT') records = records.filter(r => r.status === 'PRESENT');
    else if (leave_type === 'WFH') records = records.filter(r => r.status === 'WFH');
  }

  // Cross-Filter (applied when user clicks any graph segment)
  if (crossFilter) {
    const { field, value } = crossFilter;
    if (field === 'month') records = records.filter(r => r.month === value);
    else if (field === 'emp_code') records = records.filter(r => r.emp_code === value);
    else if (field === 'department') records = records.filter(r => r.department === value);
    else if (field === 'leave_type') records = records.filter(r => (r.leave_type === value) || (r.permission_reason === value));
  }

  return records;
}

function updatePowerBiStudio() {
  const records = getFilteredPowerBiRecords();

  // 1. Update Cross-Filter Banner
  const crossBanner = document.getElementById('pbi-crossfilter-bar');
  const crossDesc = document.getElementById('pbi-crossfilter-desc');
  const cf = AppState.powerbi.activeFilters.crossFilter;
  if (crossBanner && crossDesc) {
    if (cf) {
      crossBanner.style.display = 'flex';
      crossDesc.textContent = `${cf.label || cf.field}: ${cf.value}`;
    } else {
      crossBanner.style.display = 'none';
    }
  }

  // 2. Compute KPI Scorecards
  const uniqueEmps = new Set(records.map(r => r.emp_code)).size;
  const totalLeaves = records.reduce((acc, r) => acc + (Number(r.leaves) || 0), 0);
  const totalPermissions = records.reduce((acc, r) => acc + (Number(r.permissions) || 0), 0);
  const totalRecords = records.length;
  const presentCount = records.filter(r => ['PRESENT', 'WFH', 'ON_DUTY'].includes(r.status)).length;
  const presenceRate = totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : '0';

  const kpiEmp = document.getElementById('pbi-kpi-employees');
  const kpiLeaves = document.getElementById('pbi-kpi-leaves');
  const kpiPerm = document.getElementById('pbi-kpi-permissions');
  const kpiPres = document.getElementById('pbi-kpi-presence');

  if (kpiEmp) kpiEmp.textContent = uniqueEmps;
  if (kpiLeaves) kpiLeaves.textContent = totalLeaves.toFixed(1);
  if (kpiPerm) kpiPerm.textContent = totalPermissions;
  if (kpiPres) kpiPres.textContent = `${presenceRate}%`;

  // 3. Render Interconnected Charts
  renderPowerBiCharts(records);

  // 4. Render Table
  renderPowerBiTable(records);
}

function renderPowerBiCharts(records) {
  // Clear any existing powerbi chart instances
  ['pbi_monthly', 'pbi_employee', 'pbi_category', 'pbi_daily'].forEach(key => {
    if (AppState.activeCharts[key] && typeof AppState.activeCharts[key].destroy === 'function') {
      AppState.activeCharts[key].destroy();
    }
  });

  const isDark = AppState.theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  // -------------------------------------------------------------------------
  // CHART 1: Monthly Leaves & Permissions Trajectory
  // -------------------------------------------------------------------------
  const monthlyCanvas = document.getElementById('pbi-chart-monthly');
  if (monthlyCanvas && typeof Chart !== 'undefined') {
    // Group by month
    const monthMap = {};
    // Ensure all 12 months or active months appear ordered
    const allMonths = Array.from(new Set((AppState.powerbi.rawDataset || []).map(r => r.month))).sort();
    allMonths.forEach(m => { monthMap[m] = { leaves: 0, permissions: 0 }; });

    records.forEach(r => {
      if (r.month) {
        if (!monthMap[r.month]) monthMap[r.month] = { leaves: 0, permissions: 0 };
        monthMap[r.month].leaves += Number(r.leaves) || 0;
        monthMap[r.month].permissions += Number(r.permissions) || 0;
      }
    });

    const labels = Object.keys(monthMap).sort();
    const leavesData = labels.map(m => monthMap[m].leaves);
    const permData = labels.map(m => monthMap[m].permissions);

    const mode = AppState.powerbi.chartModes.monthly;
    let datasets = [];

    if (mode === 'combo') {
      datasets = [
        {
          type: 'bar',
          label: 'Total Leaves (Days)',
          data: leavesData,
          backgroundColor: '#4f46e5',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Permissions / Gate Passes',
          data: permData,
          borderColor: '#f59e0b',
          backgroundColor: '#f59e0b',
          tension: 0.3,
          borderWidth: 3,
          pointRadius: 4,
          yAxisID: 'y1'
        }
      ];
    } else if (mode === 'bar') {
      datasets = [
        { label: 'Total Leaves (Days)', data: leavesData, backgroundColor: '#4f46e5', borderRadius: 6 },
        { label: 'Permissions', data: permData, backgroundColor: '#f59e0b', borderRadius: 6 }
      ];
    } else {
      datasets = [
        { label: 'Total Leaves (Days)', data: leavesData, borderColor: '#4f46e5', tension: 0.3, fill: false },
        { label: 'Permissions', data: permData, borderColor: '#f59e0b', tension: 0.3, fill: false }
      ];
    }

    AppState.activeCharts.pbi_monthly = new Chart(monthlyCanvas, {
      type: mode === 'combo' ? 'bar' : mode,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: textColor } },
          tooltip: {
            callbacks: {
              afterBody: () => '\n💡 Click this month to cross-filter dashboard'
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: {
            ticks: { color: textColor },
            grid: { color: gridColor },
            title: { display: true, text: 'Leaves (Days)', color: textColor },
            beginAtZero: true
          },
          ...(mode === 'combo' ? {
            y1: {
              position: 'right',
              grid: { drawOnChartArea: false },
              ticks: { color: textColor },
              title: { display: true, text: 'Permissions', color: textColor },
              beginAtZero: true
            }
          } : {})
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const clickedMonth = labels[index];
            setPowerBiCrossFilter('month', clickedMonth, `Month: ${clickedMonth}`);
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // CHART 2: Employee Leave & Permission Distribution (Ranking)
  // -------------------------------------------------------------------------
  const empCanvas = document.getElementById('pbi-chart-employee');
  if (empCanvas && typeof Chart !== 'undefined') {
    const empMap = {};
    records.forEach(r => {
      const key = r.name || r.emp_code;
      if (!empMap[key]) empMap[key] = { leaves: 0, permissions: 0, code: r.emp_code };
      empMap[key].leaves += Number(r.leaves) || 0;
      empMap[key].permissions += Number(r.permissions) || 0;
    });

    // Sort by leaves descending
    const sortedEmps = Object.keys(empMap).sort((a, b) => (empMap[b].leaves + empMap[b].permissions) - (empMap[a].leaves + empMap[a].permissions));
    const empLabels = sortedEmps.slice(0, 8); // Top 8
    const empLeaves = empLabels.map(e => empMap[e].leaves);
    const empPerms = empLabels.map(e => empMap[e].permissions);

    AppState.activeCharts.pbi_employee = new Chart(empCanvas, {
      type: 'bar',
      data: {
        labels: empLabels,
        datasets: [
          {
            label: 'Leaves (Days)',
            data: empLeaves,
            backgroundColor: '#0ea5e9',
            borderRadius: 4
          },
          {
            label: 'Permissions',
            data: empPerms,
            backgroundColor: '#10b981',
            borderRadius: 4
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor } },
          tooltip: {
            callbacks: {
              afterBody: () => '\n💡 Click employee to isolate their records'
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: true },
          y: { ticks: { color: textColor }, grid: { display: false } }
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const clickedEmpName = empLabels[index];
            const clickedEmpCode = empMap[clickedEmpName]?.code || clickedEmpName;
            setPowerBiCrossFilter('emp_code', clickedEmpCode, `Employee: ${clickedEmpName}`);
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // CHART 3: Leave Type & Permission Category Distribution
  // -------------------------------------------------------------------------
  const catCanvas = document.getElementById('pbi-chart-category');
  if (catCanvas && typeof Chart !== 'undefined') {
    const catMap = {};
    records.forEach(r => {
      if (r.leave_type && r.leave_type !== 'None') {
        catMap[r.leave_type] = (catMap[r.leave_type] || 0) + (Number(r.leaves) || 1);
      }
      if (r.permission_reason && r.permission_reason !== 'None') {
        catMap[r.permission_reason] = (catMap[r.permission_reason] || 0) + (Number(r.permissions) || 1);
      }
    });

    const catLabels = Object.keys(catMap);
    const catValues = catLabels.map(k => catMap[k]);
    const palette = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];

    const catMode = AppState.powerbi.chartModes.category;

    AppState.activeCharts.pbi_category = new Chart(catCanvas, {
      type: catMode,
      data: {
        labels: catLabels.length > 0 ? catLabels : ['No absence events'],
        datasets: [{
          data: catValues.length > 0 ? catValues : [1],
          backgroundColor: catValues.length > 0 ? palette.slice(0, catLabels.length) : ['#94a3b8'],
          borderWidth: 2,
          borderColor: isDark ? '#111827' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } },
          tooltip: {
            callbacks: {
              afterBody: () => '\n💡 Click slice to filter by category'
            }
          }
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const clickedCat = catLabels[index];
            if (clickedCat) {
              setPowerBiCrossFilter('leave_type', clickedCat, `Category: ${clickedCat}`);
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // CHART 4: Daily Timeline of Leaves & Permissions
  // -------------------------------------------------------------------------
  const dailyCanvas = document.getElementById('pbi-chart-daily');
  if (dailyCanvas && typeof Chart !== 'undefined') {
    const dailyMap = {};
    records.forEach(r => {
      const d = r.date;
      if (d) {
        if (!dailyMap[d]) dailyMap[d] = { leaves: 0, permissions: 0, work_hours: 0, count: 0 };
        dailyMap[d].leaves += Number(r.leaves) || 0;
        dailyMap[d].permissions += Number(r.permissions) || 0;
        dailyMap[d].work_hours += Number(r.work_hours) || 0;
        dailyMap[d].count += 1;
      }
    });

    const dates = Object.keys(dailyMap).sort().slice(0, 30); // Show recent 30 dates for smooth clarity
    const dLeaves = dates.map(d => dailyMap[d].leaves);
    const dPerms = dates.map(d => dailyMap[d].permissions);
    const dHours = dates.map(d => dailyMap[d].count > 0 ? (dailyMap[d].work_hours / dailyMap[d].count).toFixed(1) : 0);

    AppState.activeCharts.pbi_daily = new Chart(dailyCanvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Daily Leaves',
            data: dLeaves,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.2,
            fill: true
          },
          {
            label: 'Daily Permissions',
            data: dPerms,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.2,
            fill: true
          },
          {
            label: 'Avg Work Hours',
            data: dHours,
            borderColor: '#10b981',
            borderDash: [4, 4],
            tension: 0.2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
          x: { ticks: { color: textColor, maxTicksLimit: 10 }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: true }
        }
      }
    });
  }
}

function renderPowerBiTable(records) {
  const tbody = document.getElementById('pbi-table-body');
  const infoEl = document.getElementById('pbi-table-pagination-info');
  const pagEl = document.getElementById('pbi-table-pagination-controls');
  const subtitle = document.getElementById('pbi-table-subtitle');

  if (!tbody) return;

  // Search filter inside table
  let displayList = records;
  const q = AppState.powerbi.tableQuery.toLowerCase().trim();
  if (q) {
    displayList = displayList.filter(r =>
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.emp_code && r.emp_code.toLowerCase().includes(q)) ||
      (r.department && r.department.toLowerCase().includes(q)) ||
      (r.date && r.date.includes(q)) ||
      (r.leave_type && r.leave_type.toLowerCase().includes(q)) ||
      (r.permission_reason && r.permission_reason.toLowerCase().includes(q))
    );
  }

  const total = displayList.length;
  const page = AppState.powerbi.tablePage;
  const size = AppState.powerbi.tablePageSize;
  const totalPages = Math.ceil(total / size) || 1;
  const startIdx = (page - 1) * size;
  const pageItems = displayList.slice(startIdx, startIdx + size);

  if (subtitle) {
    subtitle.textContent = `Showing ${total} synchronized records in current slice`;
  }

  if (infoEl) {
    infoEl.textContent = `Showing ${pageItems.length} of ${total} records`;
  }

  if (pageItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; color: var(--text-muted);">No records match the active slice filters.</td></tr>';
  } else {
    tbody.innerHTML = pageItems.map(r => `
      <tr>
        <td style="font-weight: 600;">${r.date || '--'}</td>
        <td><span class="badge" style="background: rgba(79,70,229,0.1); color: var(--primary-600);">${r.emp_code}</span></td>
        <td style="font-weight: 600;">${r.name || '--'}</td>
        <td>${r.department || '--'}</td>
        <td><span class="badge badge-${(r.status || 'present').toLowerCase()}">${r.status || 'PRESENT'}</span></td>
        <td style="font-weight: 700; color: ${r.leaves > 0 ? 'var(--danger)' : 'var(--text-muted)'};">${r.leaves || 0}</td>
        <td>${r.leave_type && r.leave_type !== 'None' ? `<span class="badge badge-leave">${r.leave_type}</span>` : '--'}</td>
        <td style="font-weight: 700; color: ${r.permissions > 0 ? 'var(--warning)' : 'var(--text-muted)'};">${r.permissions || 0}</td>
        <td>${r.permission_reason && r.permission_reason !== 'None' ? r.permission_reason : '--'}</td>
        <td>${r.work_hours !== undefined ? Number(r.work_hours).toFixed(2) : '--'}</td>
        <td>${r.overtime_minutes || 0} min</td>
      </tr>
    `).join('');
  }

  if (pagEl) {
    pagEl.innerHTML = `
      <button class="btn btn-secondary btn-sm" ${page <= 1 ? 'disabled' : ''} onclick="changePowerBiPage(${page - 1})">Prev</button>
      <span style="font-size: 0.8rem; align-self: center;">Page ${page} of ${totalPages}</span>
      <button class="btn btn-secondary btn-sm" ${page >= totalPages ? 'disabled' : ''} onclick="changePowerBiPage(${page + 1})">Next</button>
    `;
  }
}

function handlePowerBiSlicerChange() {
  const dept = document.getElementById('pbi-slicer-dept')?.value || 'ALL';
  const month = document.getElementById('pbi-slicer-month')?.value || 'ALL';
  const emp = document.getElementById('pbi-slicer-emp')?.value || 'ALL';
  const type = document.getElementById('pbi-slicer-type')?.value || 'ALL';

  AppState.powerbi.activeFilters.department = dept;
  AppState.powerbi.activeFilters.month = month;
  AppState.powerbi.activeFilters.employee = emp;
  AppState.powerbi.activeFilters.leave_type = type;
  AppState.powerbi.tablePage = 1;

  updatePowerBiStudio();
}

function setPowerBiCrossFilter(field, value, label) {
  // If clicking same cross-filter, toggle it off (PowerBI behavior)
  if (AppState.powerbi.activeFilters.crossFilter &&
      AppState.powerbi.activeFilters.crossFilter.field === field &&
      AppState.powerbi.activeFilters.crossFilter.value === value) {
    clearPowerBiCrossFilter();
    return;
  }

  AppState.powerbi.activeFilters.crossFilter = { field, value, label };
  AppState.powerbi.tablePage = 1;
  API.toast(`PowerBI cross-filter applied: ${label}`, 'info');
  updatePowerBiStudio();
}

function clearPowerBiCrossFilter() {
  AppState.powerbi.activeFilters.crossFilter = null;
  AppState.powerbi.tablePage = 1;
  updatePowerBiStudio();
}

function resetPowerBiFilters() {
  AppState.powerbi.activeFilters = {
    department: 'ALL',
    month: 'ALL',
    employee: 'ALL',
    leave_type: 'ALL',
    crossFilter: null
  };
  AppState.powerbi.tablePage = 1;
  AppState.powerbi.tableQuery = '';
  populatePowerBiSlicers();
  updatePowerBiStudio();
  API.toast('All PowerBI slicers and filters reset', 'success');
}

function togglePowerBiChartMode(chartKey, mode) {
  AppState.powerbi.chartModes[chartKey] = mode;
  updatePowerBiStudio();
}

function handlePowerBiTableSearch() {
  const val = document.getElementById('pbi-table-search')?.value || '';
  AppState.powerbi.tableQuery = val;
  AppState.powerbi.tablePage = 1;
  renderPowerBiTable(getFilteredPowerBiRecords());
}

function changePowerBiPage(p) {
  AppState.powerbi.tablePage = p;
  renderPowerBiTable(getFilteredPowerBiRecords());
}

function exportPowerBiFilteredCsv() {
  const records = getFilteredPowerBiRecords();
  if (records.length === 0) {
    API.toast('No records to export in active slice', 'warning');
    return;
  }

  const headers = ["Employee Code", "Name", "Department", "Month", "Date", "Status", "Leaves", "Leave Type", "Permissions", "Permission Reason", "Work Hours", "Overtime Minutes"];
  const rows = records.map(r => [
    r.emp_code,
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.department || '').replace(/"/g, '""')}"`,
    r.month || '',
    r.date || '',
    r.status || 'PRESENT',
    r.leaves || 0,
    `"${(r.leave_type || '').replace(/"/g, '""')}"`,
    r.permissions || 0,
    `"${(r.permission_reason || '').replace(/"/g, '""')}"`,
    r.work_hours || 0,
    r.overtime_minutes || 0
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `powerbi_workforce_slice_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  API.toast('Exported filtered PowerBI dataset to CSV', 'success');
}

// --------------------------------------------------------------------------- //
// PowerBI Dataset Ingestion Modals (File Upload & Raw Paste)
// --------------------------------------------------------------------------- //
function openPowerBiUploadModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Upload Employee Dataset (PowerBI Ingestion)';
  body.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
        Select or drag a CSV or JSON file containing employee attendance, leaves, and permission records.
      </p>
      <div id="pbi-drop-zone" class="powerbi-drop-area" onclick="document.getElementById('pbi-file-input').click()">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📁</div>
        <div style="font-weight: 700; font-size: 1rem;">Click to choose file or drag & drop here</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Supports .csv, .json, .tsv files</div>
        <input type="file" id="pbi-file-input" style="display: none;" accept=".csv,.json,.tsv,.txt" onchange="handlePowerBiFileSelect(event)">
      </div>
      <div id="pbi-upload-preview" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 600; color: var(--primary-600);"></div>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
  `;

  modal.classList.add('open');

  // Drag and drop listeners
  const dropZone = document.getElementById('pbi-drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });
  }
}

function handlePowerBiFileSelect(event) {
  if (event.target.files.length) {
    processUploadedFile(event.target.files[0]);
  }
}

function processUploadedFile(file) {
  const reader = new FileReader();
  const preview = document.getElementById('pbi-upload-preview');
  if (preview) preview.textContent = `Reading ${file.name}...`;

  reader.onload = (e) => {
    const content = e.target.result;
    try {
      let parsed = [];
      if (file.name.endsWith('.json')) {
        const json = JSON.parse(content);
        parsed = Array.isArray(json) ? json : (json.records || json.data || [json]);
      } else {
        parsed = parseCsvDataset(content);
      }

      if (parsed.length === 0) {
        API.toast('File contains no valid employee records', 'warning');
        return;
      }

      AppState.powerbi.rawDataset = normalizeDataset(parsed);
      resetPowerBiFilters();
      closeModal();
      API.toast(`Successfully imported ${AppState.powerbi.rawDataset.length} employee records!`, 'success');
      navigate('powerbi');
    } catch (err) {
      API.toast('Failed to parse file: ' + err.message, 'danger');
    }
  };
  reader.readAsText(file);
}

function openPowerBiPasteModal() {
  const modal = document.getElementById('common-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');

  title.textContent = 'Paste Tabular Dataset (Excel / Google Sheets / CSV)';
  body.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        Paste your comma-separated or tab-separated data below with columns such as <code>emp_code, name, department, date, leaves, permissions</code>:
      </p>
      <textarea id="pbi-paste-textarea" class="form-control" rows="10" placeholder="emp_code,name,department,date,leaves,permissions,status\nEMP0001,Asha Rao,Engineering,2026-07-06,1,0,LEAVE\nEMP0002,Bikram Roy,Sales,2026-07-06,0,1,PRESENT"></textarea>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="submitPowerBiPasteData()">Load & Visualize</button>
  `;

  modal.classList.add('open');
}

function submitPowerBiPasteData() {
  const text = document.getElementById('pbi-paste-textarea')?.value || '';
  if (!text.trim()) {
    API.toast('Please paste data before submitting', 'warning');
    return;
  }

  const parsed = parseCsvDataset(text);
  if (parsed.length === 0) {
    API.toast('No valid records parsed from pasted text', 'warning');
    return;
  }

  AppState.powerbi.rawDataset = normalizeDataset(parsed);
  resetPowerBiFilters();
  closeModal();
  API.toast(`Loaded ${AppState.powerbi.rawDataset.length} employee records from clipboard!`, 'success');
  navigate('powerbi');
}

async function loadLiveDbDataset() {
  API.toast('Syncing live MongoDB employees and attendance logs...', 'info');
  try {
    const [empRes, attRes] = await Promise.all([
      API.getEmployees(null, 1, 100),
      API.getAttendance({ page: 1, page_size: 100 })
    ]);

    const empMap = {};
    (empRes.items || []).forEach(e => { empMap[e.emp_code] = e; });

    const liveRecords = (attRes.items || []).map(a => {
      const emp = empMap[a.emp_code] || {};
      const isLeave = a.status === 'LEAVE';
      return {
        emp_code: a.emp_code,
        name: emp.name || a.emp_code,
        department: emp.department || 'Corporate',
        date: a.date,
        month: a.date ? a.date.slice(0, 7) : '2026-07',
        status: a.status,
        leaves: isLeave ? 1.0 : (a.half_day ? 0.5 : 0.0),
        leave_type: isLeave ? 'Casual Leave' : 'None',
        permissions: a.late_minutes > 0 ? 1 : 0,
        permission_hours: a.late_minutes > 0 ? Number((a.late_minutes / 60).toFixed(1)) : 0,
        permission_reason: a.late_minutes > 0 ? 'Late Entry Pass' : 'None',
        work_hours: a.work_hours || 0,
        overtime_minutes: a.overtime_minutes || 0
      };
    });

    if (liveRecords.length === 0) {
      API.toast('No live attendance records found. Reset seed first.', 'warning');
      return;
    }

    AppState.powerbi.rawDataset = liveRecords;
    resetPowerBiFilters();
    API.toast(`Synchronized ${liveRecords.length} live records into PowerBI Studio!`, 'success');
    navigate('powerbi');
  } catch (err) {
    API.toast('Failed to load live database records: ' + err.message, 'danger');
  }
}

function parseCsvDataset(csvText) {
  const lines = csvText.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Detect delimiter: comma, tab, or semicolon
  const headerLine = lines[0];
  let delimiter = ',';
  if (headerLine.includes('\t')) delimiter = '\t';
  else if (headerLine.includes(';') && !headerLine.includes(',')) delimiter = ';';

  const rawHeaders = headerLine.split(delimiter).map(h => h.trim().toLowerCase().replace(/['"]/g, ''));

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim().replace(/^["']|["']$/g, ''));
    if (values.length < 2) continue;

    const row = {};
    rawHeaders.forEach((h, idx) => {
      row[h] = values[idx] !== undefined ? values[idx] : '';
    });
    records.push(row);
  }
  return records;
}

function normalizeDataset(parsed) {
  return parsed.map((r, idx) => {
    const empCode = r.emp_code || r.code || r.employee_code || r.id || `EMP${String(idx + 1).padStart(4, '0')}`;
    const name = r.name || r.employee_name || r.emp_name || empCode;
    const dept = r.department || r.dept || r.division || 'Engineering';
    const dateStr = r.date || r.attendance_date || '2026-07-06';
    const month = r.month || (dateStr.length >= 7 ? dateStr.slice(0, 7) : '2026-07');
    const status = (r.status || 'PRESENT').toUpperCase();

    const leaves = r.leaves !== undefined ? parseFloat(r.leaves) : (status === 'LEAVE' ? 1 : 0);
    const leaveType = r.leave_type || (leaves > 0 ? 'Casual Leave' : 'None');
    const permissions = r.permissions !== undefined ? parseInt(r.permissions, 10) : (r.permission_hours > 0 ? 1 : 0);
    const permReason = r.permission_reason || r.reason || (permissions > 0 ? 'General Permission' : 'None');

    return {
      id: idx + 1,
      emp_code: empCode,
      name: name,
      department: dept,
      date: dateStr,
      month: month,
      status: status,
      leaves: isNaN(leaves) ? 0 : leaves,
      leave_type: leaveType,
      permissions: isNaN(permissions) ? 0 : permissions,
      permission_hours: parseFloat(r.permission_hours || (permissions > 0 ? 1.0 : 0.0)),
      permission_reason: permReason,
      work_hours: parseFloat(r.work_hours || (status === 'PRESENT' ? 8.5 : 0)),
      overtime_minutes: parseInt(r.overtime_minutes || 0, 10)
    };
  });
}

