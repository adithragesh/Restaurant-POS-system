/* ==========================================================================
   ZENITH RESTAURANT OPERATIONS SUITE — JAVASCRIPT APPLICATION ENGINE (script.js)
   Full Functional Prototype Architecture & Reactive Data Engine
   ========================================================================== */

// --- INITIAL STATE DATA STORE ---
const AppState = {
  currentRole: 'manager', // 'captain', 'manager', 'owner'
  currentOutlet: 'Ahmedabad — Drive-In',
  language: 'en', // 'en' | 'hi'
  isOnline: true,
  offlineQueue: [],
  activeView: 'dashboard',
  selectedPosArea: 'Garden Terrace',
  selectedPosTable: 'Table 14',
  guestCount: 4,
  posVegOnly: false,
  posCategoryFilter: 'All',
  posCart: [],

  // Digital Ready Notifications for Captains
  readyNotifications: [
    { id: 'K-202', orderId: '#1040', table: 'Table 4', area: 'AC Hall', items: 'Paneer Tikka x 2, Mango Lassi x 2', time: '14:28' }
  ],

  // Order Modifications Change Logs
  orderModifications: {
    'K-204': {
      orderId: '#1043',
      kotId: 'K-204',
      table: 'Table 14',
      area: 'Garden Terrace',
      originalItems: [
        { qty: 1, name: 'Paneer Tikka Special', price: 300, mod: 'Medium Spicy' },
        { qty: 2, name: 'Butter Naan (Garlic)', price: 130, mod: 'Crispy' }
      ],
      pendingDeltas: [],
      timeline: [
        { time: '14:32', user: 'Rahul (Captain)', action: 'Order K-204 Created (Paneer Tikka x1, Butter Naan x2)' }
      ]
    }
  },

  // Temporary Pending Item Modifiers
  pendingModifierDish: null,
  pendingModifiers: {
    spice: 'Medium Spicy',
    tags: [],
    customNote: ''
  },

  // Mock Menu Catalog with High-Quality Food Photos
  menuCatalog: [
    { id: 'm1', name: 'Paneer Tikka Special', category: 'Starters', price: 280, areaPrices: { 'AC Hall': 320, 'Garden Terrace': 300, 'Non-AC Main': 280 }, isVeg: true, available: true, img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300' },
    { id: 'm2', name: 'Butter Naan (Garlic)', category: 'Breads', price: 120, areaPrices: { 'AC Hall': 140, 'Garden Terrace': 130, 'Non-AC Main': 120 }, isVeg: true, available: true, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300' },
    { id: 'm3', name: 'Dal Makhani Special', category: 'Mains', price: 240, areaPrices: { 'AC Hall': 280, 'Garden Terrace': 260, 'Non-AC Main': 240 }, isVeg: true, available: true, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300' },
    { id: 'm4', name: 'Chicken Biryani', category: 'Mains', price: 360, areaPrices: { 'AC Hall': 420, 'Garden Terrace': 390, 'Non-AC Main': 360 }, isVeg: false, available: true, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300' },
    { id: 'm5', name: 'Crispy Veg Spring Roll', category: 'Starters', price: 220, areaPrices: { 'AC Hall': 250, 'Garden Terrace': 240, 'Non-AC Main': 220 }, isVeg: true, available: true, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
    { id: 'm6', name: 'Mango Lassi', category: 'Beverages', price: 110, areaPrices: { 'AC Hall': 130, 'Garden Terrace': 120, 'Non-AC Main': 110 }, isVeg: true, available: true, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300' }
  ],

  // Table Floor Map Data
  tablesData: [
    { id: 't1', name: 'Table 1', area: 'AC Hall', capacity: 4, status: 'available', orderId: null },
    { id: 't2', name: 'Table 2', area: 'AC Hall', capacity: 2, status: 'occupied', orderId: '#1042', captain: 'Rahul' },
    { id: 't3', name: 'Table 14', area: 'Garden Terrace', capacity: 4, status: 'preparing', orderId: '#K-204', captain: 'Rahul' },
    { id: 't4', name: 'Table 4', area: 'AC Hall', capacity: 4, status: 'bill-requested', orderId: '#1040', total: 1240 },
    { id: 't5', name: 'Garden 1', area: 'Garden Terrace', capacity: 4, status: 'available', orderId: null },
    { id: 't6', name: 'Garden 2', area: 'Garden Terrace', capacity: 8, status: 'occupied', orderId: '#1044', captain: 'Sanjay' },
    { id: 't7', name: 'Main 1', area: 'Non-AC Main', capacity: 4, status: 'available', orderId: null },
    { id: 't8', name: 'Main 2', area: 'Non-AC Main', capacity: 4, status: 'available', orderId: null }
  ],

  // Active Orders Tracker
  activeOrders: [
    { id: '#1040', table: 'Table 4', area: 'AC Hall', captain: 'Rahul', items: 'Paneer Tikka x 2, Mango Lassi x 2', amount: 1240, status: 'Bill Requested', syncState: 'Synced', time: '14:10' },
    { id: '#1042', table: 'Table 2', area: 'AC Hall', captain: 'Rahul', items: 'Dal Makhani x 1, Garlic Naan x 2', amount: 480, status: 'Preparing', syncState: 'Synced', time: '14:25' },
    { id: '#1043', kotId: 'K-204', table: 'Table 14', area: 'Garden Terrace', captain: 'Rahul', items: 'Paneer Tikka x 1, Garlic Naan x 2', amount: 560, status: 'Preparing', syncState: 'Synced', time: '14:32' }
  ],

  // KDS Tickets Queue
  kotQueue: [
    { 
      id: 'K-204', 
      orderId: '#1043', 
      table: 'Table 14', 
      area: 'Garden Terrace',
      captain: 'Rahul', 
      elapsed: '08:15', 
      status: 'PREPARING', 
      timerClass: 'normal',
      isUpdated: false,
      deltaText: '',
      items: [
        { qty: 1, name: 'Paneer Tikka Special', mod: 'Medium Spicy' }, 
        { qty: 2, name: 'Butter Naan (Garlic)', mod: 'Crispy' }
      ] 
    },
    { 
      id: 'K-203', 
      orderId: '#1042', 
      table: 'Table 2', 
      area: 'AC Hall',
      captain: 'Rahul', 
      elapsed: '14:20', 
      status: 'PREPARING', 
      timerClass: 'warn',
      isUpdated: false,
      deltaText: '',
      items: [
        { qty: 1, name: 'Dal Makhani Special', mod: 'Less Butter' }, 
        { qty: 2, name: 'Butter Naan (Garlic)', mod: '--' }
      ] 
    }
  ],

  // Inventory Master & Audit Ledger History
  inventoryMaster: [
    { sku: 'SKU-TOM-001', name: 'Tomato — Standard Grade', category: 'Vegetables', stock: 42.0, unit: 'kg', min: 15.0, supplier: 'Metro Wholesale', status: 'In Stock', ledger: [
      { date: '26 Aug, 14:10', action: 'Stock In', qty: '+20.0 kg', reason: 'PO Received (PO-1082)', user: 'Sanjay (Manager)' },
      { date: '25 Aug, 22:30', action: 'Kitchen Usage', qty: '-8.5 kg', reason: 'KOT Deductions', user: 'System (KDS)' },
      { date: '25 Aug, 11:15', action: 'Waste Log', qty: '-2.0 kg', reason: 'Spoilage / Damage', user: 'Chef Ram' }
    ]},
    { sku: 'SKU-PAN-002', name: 'Fresh Paneer (Cottage Cheese)', category: 'Dairy', stock: 8.5, unit: 'kg', min: 10.0, supplier: 'Amul Dairy Direct', status: 'Low Stock', ledger: [
      { date: '26 Aug, 10:00', action: 'Stock In', qty: '+10.0 kg', reason: 'Morning Delivery', user: 'Sanjay' },
      { date: '26 Aug, 14:32', action: 'Kitchen Usage', qty: '-1.5 kg', reason: 'KOT-204 Deduction', user: 'System' }
    ]},
    { sku: 'SKU-OIL-003', name: 'Refined Sunflower Cooking Oil', category: 'Oils & Ghee', stock: 4.0, unit: 'L', min: 20.0, supplier: 'Prime Agro', status: 'Low Stock', ledger: [] },
    { sku: 'SKU-FLR-004', name: 'Maida Wheat Flour (Grade A)', category: 'Grains', stock: 65.0, unit: 'kg', min: 25.0, supplier: 'Metro Wholesale', status: 'In Stock', ledger: [] }
  ],

  // Supplier Price Matrix
  supplierQuotes: [
    { supplier: 'Metro Cash & Carry', product: 'Refined Cooking Oil (20L Can)', price: 2150, minOrder: '2 Cans', leadTime: 'Same Day', tag: 'BEST PRICE' },
    { supplier: 'Royal Wholesalers', product: 'Refined Cooking Oil (20L Can)', price: 2220, minOrder: '1 Can', leadTime: 'Next Day', tag: 'Standard' },
    { supplier: 'Prime Agro Supplies', product: 'Refined Cooking Oil (20L Can)', price: 2180, minOrder: '5 Cans', leadTime: '2 Days', tag: 'Bulk Only' }
  ],

  // Recent Purchase Orders
  purchaseOrders: [
    { poNum: 'PO-1082', supplier: 'Metro Cash & Carry', item: 'Tomato 20kg + Flour 50kg', total: 3450, date: '26 Aug 2026', status: 'Received' },
    { poNum: 'PO-1083', supplier: 'Amul Dairy Direct', item: 'Fresh Paneer 15kg', total: 4200, date: '26 Aug 2026', status: 'Pending Approval' }
  ],
};

// --- MULTILINGUAL TRANSLATION DICTIONARY ---
const I18N = {
  en: {
    dashboard: 'Dashboard',
    pos: 'POS Workspace',
    tables: 'Tables & Floor',
    orders: 'Active Orders',
    kot: 'Kitchen (KDS)',
    menu: 'Menu & Pricing',
    inventory: 'Inventory Master',
    purchasing: 'Purchasing & POs',
    reports: 'Operational Reports',
    settings: 'Settings & RBAC',
    readyPickup: 'Ready Pickup',
    roleCaptain: 'Captain',
    roleManager: 'Manager',
    roleOwner: 'Owner',
    subtotal: 'Subtotal:',
    tax: 'GST (5%):',
    grandTotal: 'Grand Total:',
    btnClear: 'Clear',
    btnPrint: 'Print Bill',
    btnSendKot: 'SEND KOT TO KITCHEN'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    pos: 'ऑर्डर POS',
    tables: 'टेबल और फ़्लोर',
    orders: 'सक्रिय ऑर्डर',
    kot: 'रसोई (KDS)',
    menu: 'मेनू और मूल्य',
    inventory: 'इन्वेंट्री मास्टर',
    purchasing: 'खरीद और PO',
    reports: 'ऑपरेशनल रिपोर्ट',
    settings: 'सेटिंग्स और RBAC',
    readyPickup: 'तैयार ऑर्डर',
    roleCaptain: 'कैप्टन',
    roleManager: 'मैनेजर',
    roleOwner: 'ऑनर',
    subtotal: 'उप योग:',
    tax: 'जीएसटी (5%):',
    grandTotal: 'कुल राशि:',
    btnClear: 'साफ़ करें',
    btnPrint: 'बिल प्रिंट',
    btnSendKot: 'रसोई में ऑर्डर भेजें'
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  setupEventListeners();
  renderRoleSidebar();
  renderDashboard();
  renderPosCatalog();
  renderPosCart();
  renderFloorMap();
  renderOrdersTable();
  renderKdsQueue();
  renderMenuManagementTable();
  renderInventoryTable();
  renderPriceMatrix();
  renderPoTable();
  updateReadyNotificationsBadge();
});

// --- EVENT LISTENERS & NAVIGATION ENGINE ---
function setupEventListeners() {
  // Role Switcher Buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      AppState.currentRole = e.target.dataset.role;
      
      const badge = document.getElementById('active-role-badge');
      badge.textContent = `${AppState.currentRole.toUpperCase()} WORKSPACE`;

      renderRoleSidebar();
      switchView('dashboard');
      showToast(`Switched to ${AppState.currentRole.toUpperCase()} Role`);
    });
  });

  // Outlet Switcher
  document.getElementById('outlet-select').addEventListener('change', (e) => {
    AppState.currentOutlet = e.target.value;
    document.getElementById('dashboard-subtitle').textContent = `Real-time status overview for ${AppState.currentOutlet}`;
    showToast(`Switched Outlet to ${AppState.currentOutlet}`);
  });

  // Demo Offline Toggle
  document.getElementById('demo-toggle-offline-btn').addEventListener('click', toggleOfflineMode);

  // System Status Pill Modal Trigger
  document.getElementById('system-status-pill').addEventListener('click', () => {
    openModal('modal-system-status');
  });

  // Sidebar Collapse Toggle
  document.getElementById('sidebar-collapse-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });

  // POS Menu Search
  document.getElementById('pos-menu-search').addEventListener('input', (e) => {
    renderPosCatalog(e.target.value);
  });

  // POS Veg Only Toggle
  document.getElementById('pos-veg-filter-btn').addEventListener('click', (e) => {
    AppState.posVegOnly = !AppState.posVegOnly;
    e.currentTarget.classList.toggle('active', AppState.posVegOnly);
    renderPosCatalog();
  });

  // Global Keyboard Shortcuts (Ctrl + F for fast search)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      switchView('pos');
      document.getElementById('pos-menu-search').focus();
    }
  });
}

// --- MULTILINGUAL ENGINE ---
function setLanguage(lang) {
  AppState.language = lang;
  document.getElementById('lang-btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-btn-hi').classList.toggle('active', lang === 'hi');

  const dict = I18N[lang] || I18N.en;

  document.getElementById('i18n-ready-pickup-btn').textContent = dict.readyPickup;
  document.getElementById('i18n-role-captain').textContent = dict.roleCaptain;
  document.getElementById('i18n-role-manager').textContent = dict.roleManager;
  document.getElementById('i18n-role-owner').textContent = dict.roleOwner;

  document.getElementById('i18n-subtotal').textContent = dict.subtotal;
  document.getElementById('i18n-tax').textContent = dict.tax;
  document.getElementById('i18n-grand-total').textContent = dict.grandTotal;
  document.getElementById('i18n-btn-clear').textContent = dict.btnClear;
  document.getElementById('i18n-btn-print').textContent = dict.btnPrint;
  document.getElementById('i18n-btn-send-kot').textContent = dict.btnSendKot;

  renderRoleSidebar();
  showToast(lang === 'hi' ? 'भाषा हिंदी में बदल दी गई है' : 'Language changed to English');
}

// --- NAVIGATION & ROLE SIDEBAR ENGINE (RBAC ENFORCEMENT) ---
function renderRoleSidebar() {
  const container = document.getElementById('sidebar-nav-items');
  container.innerHTML = '';

  const dict = I18N[AppState.language] || I18N.en;

  const navSchema = [
    { id: 'dashboard', label: dict.dashboard, icon: 'layout-dashboard', roles: ['captain', 'manager', 'owner'] },
    { id: 'pos', label: dict.pos, icon: 'shopping-cart', roles: ['captain', 'manager', 'owner'] },
    { id: 'tables', label: dict.tables, icon: 'grid', roles: ['captain', 'manager', 'owner'] },
    { id: 'orders', label: dict.orders, icon: 'receipt', roles: ['captain', 'manager', 'owner'] },
    { id: 'kot', label: dict.kot, icon: 'flame', roles: ['captain', 'manager', 'owner'], badge: AppState.kotQueue.length },
    { id: 'menu', label: dict.menu, icon: 'book-open', roles: ['manager', 'owner'] },
    { id: 'inventory', label: dict.inventory, icon: 'box', roles: ['manager', 'owner'] },
    { id: 'purchasing', label: dict.purchasing, icon: 'truck', roles: ['manager', 'owner'] },
    { id: 'reports', label: dict.reports, icon: 'bar-chart-3', roles: ['manager', 'owner'] },
    { id: 'settings', label: dict.settings, icon: 'settings', roles: ['manager', 'owner'] }
  ];


  navSchema.forEach(item => {
    const isAllowedForRole = item.roles.includes(AppState.currentRole);
    const link = document.createElement('a');
    
    link.className = `nav-item ${item.id === AppState.activeView ? 'active' : ''}`;
    link.dataset.view = item.id;
    
    link.innerHTML = `
      <i data-lucide="${item.icon}"></i>
      <span class="nav-text">${item.label}</span>
      ${!isAllowedForRole ? `<span style="margin-left:auto; font-size:11px;">🔒</span>` : ''}
      ${item.badge && isAllowedForRole ? `<span class="badge-count">${item.badge}</span>` : ''}
    `;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAllowedForRole) {
        showRoleRestrictionModal(item.label);
        return;
      }
      switchView(item.id);
    });

    container.appendChild(link);
  });

  lucide.createIcons();
}

function showRoleRestrictionModal(featureName) {
  document.getElementById('role-restricted-msg').innerHTML = `
    Captain role does not have permission to access <strong>${featureName}</strong>.
  `;
  openModal('modal-role-restricted');
}

function switchView(viewId) {
  // Enforce Captain RBAC check
  const managerOnlyViews = ['menu', 'inventory', 'purchasing', 'reports', 'settings'];
  if (AppState.currentRole === 'captain' && managerOnlyViews.includes(viewId)) {
    showRoleRestrictionModal(viewId.toUpperCase());
    return;
  }

  AppState.activeView = viewId;
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
  
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewId);
  });

  renderDashboard();
  updateOperationalReport();
}

// --- OFFLINE / ONLINE SYSTEM SIMULATION ENGINE ---
function toggleOfflineMode() {
  AppState.isOnline = !AppState.isOnline;
  const pill = document.getElementById('system-status-pill');
  const statusText = document.getElementById('status-text');
  const toggleBtnText = document.getElementById('toggle-btn-text');

  if (AppState.isOnline) {
    pill.className = 'system-status-pill syncing';
    statusText.textContent = `↻ Syncing ${AppState.offlineQueue.length || 1} local orders...`;
    
    setTimeout(() => {
      pill.className = 'system-status-pill online';
      statusText.textContent = '● Online — Syncing real-time';
      toggleBtnText.textContent = 'Simulate Offline Mode';
      
      if (AppState.offlineQueue.length > 0) {
        const count = AppState.offlineQueue.length;
        AppState.offlineQueue.forEach(item => {
          item.syncState = 'Synced';
          AppState.activeOrders.unshift(item);
        });
        showToast(`Successfully synchronized ${count} offline orders to cloud server!`, 'success');
        AppState.offlineQueue = [];
        renderOrdersTable();
      } else {
        showToast('System reconnected to Cloud Server. Synchronized!', 'success');
      }
      updateSyncModal();
    }, 1200);

  } else {
    pill.className = 'system-status-pill offline';
    statusText.textContent = '● Offline — Orders continue locally';
    toggleBtnText.textContent = 'Restore Online Mode';
    showToast('Switched to OFFLINE Mode. Billing & POS continue locally on IndexedDB.', 'warning');
    updateSyncModal();
  }
}

function updateSyncModal() {
  const statusTxt = document.getElementById('sync-modal-status-text');
  const badgesContainer = document.getElementById('sync-modal-badges');

  if (AppState.isOnline) {
    statusTxt.textContent = 'Status: Online — Syncing in real-time with cloud server.';
    badgesContainer.innerHTML = `<span class="badge badge-success">Cloud Sync: Active</span><span class="badge badge-info">0 Queued Uploads</span>`;
  } else {
    statusTxt.textContent = 'Status: OFFLINE — Local server active. Billing & Orders continue seamlessly. Cloud sync paused.';
    badgesContainer.innerHTML = `<span class="badge badge-warning">Cloud Sync: Paused</span><span class="badge badge-info">${AppState.offlineQueue.length} Orders Queued</span>`;
  }
}

// --- DASHBOARD RENDERER ---
function renderDashboard() {
  const kpiGrid = document.getElementById('dashboard-kpi-grid');
  kpiGrid.innerHTML = '';

  if (AppState.currentRole === 'captain') {
    kpiGrid.innerHTML = `
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Assigned Tables</h4><div class="value">4 / 12</div></div>
        <div class="kpi-icon"><i data-lucide="grid"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Active Orders</h4><div class="value">${AppState.activeOrders.length} Orders</div></div>
        <div class="kpi-icon"><i data-lucide="receipt"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Ready for Pickup</h4><div class="value">${AppState.readyNotifications.length} Ticket</div></div>
        <div class="kpi-icon"><i data-lucide="check-circle"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Network Status</h4><div class="value">${AppState.isOnline ? 'ONLINE' : 'OFFLINE'}</div></div>
        <div class="kpi-icon"><i data-lucide="wifi"></i></div>
      </div>
    `;
  } else if (AppState.currentRole === 'manager') {
    kpiGrid.innerHTML = `
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Today's Sales</h4><div class="value">₹48,250.00</div></div>
        <div class="kpi-icon"><i data-lucide="indian-rupee"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Active Dine-In</h4><div class="value">8 Tables</div></div>
        <div class="kpi-icon"><i data-lucide="users"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Pending Kitchen KOTs</h4><div class="value">${AppState.kotQueue.length} Tickets</div></div>
        <div class="kpi-icon"><i data-lucide="flame"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Low Stock Alerts</h4><div class="value">2 SKUs</div></div>
        <div class="kpi-icon"><i data-lucide="alert-triangle"></i></div>
      </div>
    `;
  } else {
    // Owner
    kpiGrid.innerHTML = `
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Gross Revenue (Monthly)</h4><div class="value">₹14,85,000</div></div>
        <div class="kpi-icon"><i data-lucide="trending-up"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Net Profit Margin</h4><div class="value">28.4%</div></div>
        <div class="kpi-icon"><i data-lucide="pie-chart"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Total Covers Served</h4><div class="value">3,420</div></div>
        <div class="kpi-icon"><i data-lucide="smile"></i></div>
      </div>
      <div class="card kpi-card">
        <div class="kpi-info"><h4>Outlets Operational</h4><div class="value">3 Outlets</div></div>
        <div class="kpi-icon"><i data-lucide="building"></i></div>
      </div>
    `;
  }

  // Mini Floor Map Grid
  const miniGrid = document.getElementById('dashboard-floor-mini-grid');
  if (miniGrid) {
    miniGrid.innerHTML = '';
    AppState.tablesData.slice(0, 6).forEach(t => {
      miniGrid.innerHTML += `
        <div class="table-card ${t.status}" style="padding: 10px; font-size: 12px;" onclick="selectTableForPos('${t.name}', '${t.area}')">
          <div class="table-num" style="font-size: 14px;">${t.name}</div>
          <div class="table-cap">${t.area}</div>
          <span class="badge ${t.status === 'available' ? 'badge-success' : 'badge-warning'}" style="font-size: 10px; height: 18px; margin-top: 4px;">${t.status.toUpperCase()}</span>
        </div>
      `;
    });
  }

  // Mini KOT List
  const miniKot = document.getElementById('dashboard-kot-mini-list');
  if (miniKot) {
    miniKot.innerHTML = '';
    AppState.kotQueue.forEach(k => {
      miniKot.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: 8px;">
          <div>
            <strong>${k.id} (${k.table})</strong>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${k.items.map(i => i.name).join(', ')}</div>
          </div>
          <span class="badge ${k.status === 'READY' ? 'badge-success' : 'badge-warning'}">${k.status} (${k.elapsed})</span>
        </div>
      `;
    });
  }

  lucide.createIcons();
}

// --- TABLE SELECTION & STICKY CONTEXT ---
function adjustGuestCount(delta) {
  AppState.guestCount = Math.max(1, Math.min(20, AppState.guestCount + delta));
  document.getElementById('pos-guest-count-val').textContent = AppState.guestCount;
  document.getElementById('pos-guests-count-badge').textContent = `${AppState.guestCount} Guests`;
}

function selectTableForPos(tableName, areaName) {
  AppState.selectedPosTable = tableName;
  AppState.selectedPosArea = areaName;

  document.getElementById('pos-selected-table-title').textContent = `${tableName} — ${areaName}`;
  document.getElementById('pos-order-id-label').textContent = `Order #K-204`;
  document.getElementById('pos-guests-count-badge').textContent = `${AppState.guestCount} Guests`;

  // Update area tabs active state
  document.querySelectorAll('.area-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.includes(areaName));
  });

  // Check if Table 14 has active sent KOT
  const existingKotBtn = document.getElementById('btn-modify-existing-kot');
  const contextDesc = document.getElementById('pos-context-status-desc');

  if (tableName === 'Table 14') {
    existingKotBtn.style.display = 'inline-flex';
    contextDesc.textContent = 'Active KOT #K-204 sent to kitchen (Preparing). Click Modify to add items/notes.';
  } else {
    existingKotBtn.style.display = 'none';
    contextDesc.textContent = `New Order Workspace for ${tableName} (${areaName})`;
  }

  switchView('pos');
  renderPosCatalog();
  showToast(`Selected ${tableName} (${areaName}) for POS Order`);
}

// --- DISH MODIFIERS ENGINE ---
function openItemModifierModal(itemId) {
  const dish = AppState.menuCatalog.find(m => m.id === itemId);
  if (!dish) return;

  AppState.pendingModifierDish = dish;
  AppState.pendingModifiers = {
    spice: 'Medium Spicy',
    tags: [],
    customNote: ''
  };

  document.getElementById('modifier-dish-title').textContent = dish.name;
  document.getElementById('modifier-custom-note').value = '';
  
  document.querySelectorAll('.mod-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes('Medium'));
  });
  document.querySelectorAll('.mod-tag-btn').forEach(btn => btn.classList.remove('active'));

  openModal('modal-item-modifier');
}

function selectModOption(btnElement, value) {
  AppState.pendingModifiers.spice = value;
  document.querySelectorAll('.mod-option-btn').forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
}

function toggleModTag(btnElement, tagValue) {
  btnElement.classList.toggle('active');
  const index = AppState.pendingModifiers.tags.indexOf(tagValue);
  if (index > -1) {
    AppState.pendingModifiers.tags.splice(index, 1);
  } else {
    AppState.pendingModifiers.tags.push(tagValue);
  }
}

function confirmAddWithModifiers() {
  if (!AppState.pendingModifierDish) return;

  const dish = AppState.pendingModifierDish;
  const areaPrice = dish.areaPrices[AppState.selectedPosArea] || dish.price;
  const note = document.getElementById('modifier-custom-note').value.trim();

  let modParts = [AppState.pendingModifiers.spice, ...AppState.pendingModifiers.tags];
  if (note) modParts.push(`Note: ${note}`);
  const combinedMod = modParts.join(', ');

  AppState.posCart.push({
    id: `${dish.id}-${Date.now()}`,
    baseId: dish.id,
    name: dish.name,
    price: areaPrice,
    qty: 1,
    mod: combinedMod
  });

  closeModal('modal-item-modifier');
  renderPosCart();
  showToast(`Added ${dish.name} (${combinedMod}) to order!`, 'success');
}

// --- POS CATALOG & ORDER ENTRY ENGINE ---
function switchPosArea(areaName) {
  AppState.selectedPosArea = areaName;
  document.querySelectorAll('.area-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.includes(areaName));
  });
  renderPosCatalog();
}

function renderPosCatalog(searchQuery = '') {
  const categories = ['All', 'Starters', 'Mains', 'Breads', 'Beverages'];
  const catContainer = document.getElementById('pos-cat-tabs');
  catContainer.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-tab ${cat === AppState.posCategoryFilter ? 'active' : ''}`;
    btn.textContent = cat;
    btn.onclick = () => {
      AppState.posCategoryFilter = cat;
      renderPosCatalog(searchQuery);
    };
    catContainer.appendChild(btn);
  });

  const menuGrid = document.getElementById('pos-menu-grid');
  menuGrid.innerHTML = '';

  let filtered = AppState.menuCatalog;

  if (AppState.posCategoryFilter !== 'All') {
    filtered = filtered.filter(item => item.category === AppState.posCategoryFilter);
  }
  if (AppState.posVegOnly) {
    filtered = filtered.filter(item => item.isVeg);
  }
  if (searchQuery.trim() !== '') {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  filtered.forEach(item => {
    const areaPrice = item.areaPrices[AppState.selectedPosArea] || item.price;
    
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <span class="diet-tag">${item.isVeg ? '🟢 Veg' : '🔺 Non-Veg'}</span>
      <img src="${item.img}" class="menu-card-img" alt="${item.name}">
      <div class="menu-card-title">${item.name}</div>
      <div class="menu-card-footer">
        <div class="menu-card-price">₹${areaPrice.toFixed(2)}</div>
        <div style="display: flex; gap: 4px;">
          <button class="btn btn-secondary btn-sm" onclick="openItemModifierModal('${item.id}')" title="Add with custom options">⚙️</button>
          <button class="btn btn-primary btn-sm" onclick="addToPosCart('${item.id}')">+ ADD</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

function addToPosCart(itemId) {
  const item = AppState.menuCatalog.find(m => m.id === itemId);
  if (!item) return;

  const areaPrice = item.areaPrices[AppState.selectedPosArea] || item.price;
  const existing = AppState.posCart.find(c => c.baseId === itemId && !c.mod);

  if (existing) {
    existing.qty += 1;
  } else {
    AppState.posCart.push({
      id: item.id,
      baseId: item.id,
      name: item.name,
      price: areaPrice,
      qty: 1,
      mod: ''
    });
  }

  renderPosCart();
  showToast(`Added ${item.name} to cart`);
}

function updateCartQty(cartItemId, delta) {
  const index = AppState.posCart.findIndex(c => c.id === cartItemId);
  if (index === -1) return;

  AppState.posCart[index].qty += delta;
  if (AppState.posCart[index].qty <= 0) {
    AppState.posCart.splice(index, 1);
  }
  renderPosCart();
}

function clearPosCart() {
  AppState.posCart = [];
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('pos-cart-items-container');
  container.innerHTML = '';

  let subtotal = 0;

  if (AppState.posCart.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 40px; font-size: 13px;">Cart is empty. Select menu items to add.</div>`;
  } else {
    AppState.posCart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      container.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-main">
            <div>
              <span class="cart-item-name">${item.name}</span>
              ${item.mod ? `<div style="font-size: 11px; color: var(--color-primary); font-weight: 600;">Mod: ${item.mod}</div>` : ''}
            </div>
            <span class="cart-item-price">₹${itemTotal.toFixed(2)}</span>
          </div>
          <div class="cart-item-actions">
            <div class="stepper">
              <button class="stepper-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span class="stepper-val">${item.qty}</span>
              <button class="stepper-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
            <button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 2px 6px;" onclick="updateCartQty('${item.id}', -100)">Remove</button>
          </div>
        </div>
      `;
    });
  }

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  document.getElementById('pos-subtotal-val').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('pos-tax-val').textContent = `₹${gst.toFixed(2)}`;
  document.getElementById('pos-total-val').textContent = `₹${total.toFixed(2)}`;
}

function fireKOTFromPos() {
  if (AppState.posCart.length === 0) {
    showToast('Cannot send KOT: Cart is empty!', 'danger');
    return;
  }

  const kotId = `K-${Math.floor(200 + Math.random() * 800)}`;
  const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;

  const newTicket = {
    id: kotId,
    orderId: orderId,
    table: AppState.selectedPosTable,
    area: AppState.selectedPosArea,
    captain: 'Rahul',
    elapsed: '00:01',
    status: 'PREPARING',
    timerClass: 'normal',
    isUpdated: false,
    deltaText: '',
    items: AppState.posCart.map(c => ({ qty: c.qty, name: c.name, mod: c.mod || '--' }))
  };

  AppState.kotQueue.unshift(newTicket);

  const orderObj = {
    id: orderId,
    kotId: kotId,
    table: AppState.selectedPosTable,
    area: AppState.selectedPosArea,
    captain: 'Rahul',
    items: AppState.posCart.map(c => `${c.name} x ${c.qty}`).join(', '),
    amount: parseFloat(document.getElementById('pos-total-val').textContent.replace('₹', '')),
    status: 'KOT Sent',
    syncState: AppState.isOnline ? 'Synced' : 'Offline Queued',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  if (AppState.isOnline) {
    AppState.activeOrders.unshift(orderObj);
  } else {
    AppState.offlineQueue.unshift(orderObj);
  }

  clearPosCart();
  renderKdsQueue();
  renderOrdersTable();
  renderFloorMap();

  if (AppState.isOnline) {
    showToast(`KOT ${kotId} sent to Kitchen Queue! Order ${orderId} created for ${AppState.selectedPosTable}.`, 'success');
  } else {
    showToast(`OFFLINE KOT ${kotId} generated locally! Queued for auto-sync.`, 'warning');
  }
}

function printPosDraftBill() {
  if (AppState.posCart.length === 0) {
    showToast('Cart is empty. Nothing to print!', 'warning');
    return;
  }
  showToast('Printing Tax Invoice to ESC/POS Thermal Printer...', 'success');
}

// --- ORDER MODIFICATION & CHANGE LOG SYSTEM ---
function openModifyOrderWorkspace() {
  const modRecord = AppState.orderModifications['K-204'];
  if (!modRecord) return;

  const origContainer = document.getElementById('mod-modal-original-items');
  origContainer.innerHTML = '';
  modRecord.originalItems.forEach(i => {
    origContainer.innerHTML += `
      <div style="display: flex; justify-content: space-between;">
        <span>${i.qty}× ${i.name}</span>
        <strong>₹${(i.price * i.qty).toFixed(2)}</strong>
      </div>
    `;
  });

  const pendContainer = document.getElementById('mod-modal-pending-items');
  pendContainer.innerHTML = `
    <div style="color: var(--color-warning); font-weight: 600;">+ 1× Butter Naan (Garlic) — ₹130.00</div>
    <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">Note: Extra garlic</div>
  `;

  const timelineContainer = document.getElementById('mod-modal-timeline');
  timelineContainer.innerHTML = '';
  modRecord.timeline.forEach(t => {
    timelineContainer.innerHTML += `
      <div>
        <strong>${t.time}</strong> — <span>${t.action}</span>
      </div>
    `;
  });

  document.getElementById('mod-modal-note-input').value = 'Extra garlic on naan';
  openModal('modal-order-modification');
}

function confirmOrderModification() {
  const note = document.getElementById('mod-modal-note-input').value || 'Extra garlic';
  
  const ticket = AppState.kotQueue.find(k => k.id === 'K-204');
  if (ticket) {
    ticket.items.push({ qty: 1, name: 'Butter Naan (Garlic)', mod: `Crispy, ${note}` });
    ticket.isUpdated = true;
    ticket.deltaText = `MODIFIED: +1 Butter Naan (${note})`;
    ticket.status = 'PREPARING';
  }

  const modRecord = AppState.orderModifications['K-204'];
  if (modRecord) {
    modRecord.timeline.push({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: 'Rahul (Captain)',
      action: `Modified Order K-204: +1 Butter Naan (${note})`
    });
  }

  closeModal('modal-order-modification');
  renderKdsQueue();
  renderOrdersTable();
  showToast('Order #K-204 Updated! Kitchen KDS notified with visual delta log.', 'success');
}

// --- KDS QUEUE & DIGITAL READY NOTIFICATIONS ---
function renderKdsQueue() {
  const container = document.getElementById('kds-tickets-grid');
  if (!container) return;
  container.innerHTML = '';

  AppState.kotQueue.forEach(k => {
    let itemsHtml = '';
    k.items.forEach(i => {
      itemsHtml += `
        <div class="kds-item-row ${k.isUpdated && i.name.includes('Butter Naan') ? 'kds-delta-item' : ''}">
          <span class="kds-qty">${i.qty}×</span>
          <div>
            <div class="kds-item-name">${i.name}</div>
            ${i.mod !== '--' ? `<span class="kds-mod">${i.mod}</span>` : ''}
          </div>
        </div>
      `;
    });

    container.innerHTML += `
      <div class="kds-card ${k.isUpdated ? 'updated' : ''}">
        <div class="kds-card-header">
          <div>
            <strong>${k.id}</strong> — ${k.table} (${k.area})
            ${k.isUpdated ? `<span class="kds-delta-badge">MODIFIED</span>` : ''}
          </div>
          <span class="kds-timer ${k.timerClass}">⏱ ${k.elapsed}</span>
        </div>
        <div class="kds-items-list">
          ${k.deltaText ? `<div style="font-size: 11px; font-weight: 700; color: #B54708; background: #FFFBEB; padding: 4px 8px; border-radius: 4px; margin-bottom: 8px;">${k.deltaText}</div>` : ''}
          ${itemsHtml}
        </div>
        <div class="kds-card-actions">
          ${k.status === 'PREPARING' ? 
            `<button class="btn btn-success btn-sm" style="width: 100%;" onclick="updateKotStatus('${k.id}', 'READY')">MARK READY FOR PICKUP</button>` :
            `<button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="updateKotStatus('${k.id}', 'COMPLETED')">MARK COMPLETED / SERVED</button>`
          }
        </div>
      </div>
    `;
  });
}

function updateKotStatus(kotId, newStatus) {
  const ticket = AppState.kotQueue.find(k => k.id === kotId);
  if (!ticket) return;

  if (newStatus === 'READY') {
    ticket.status = 'READY';
    
    // Add digital ready notification for Captain
    AppState.readyNotifications.unshift({
      id: ticket.id,
      orderId: ticket.orderId,
      table: ticket.table,
      area: ticket.area,
      items: ticket.items.map(i => `${i.name} x ${i.qty}`).join(', '),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    updateReadyNotificationsBadge();
    showToast(`🔔 ORDER ${kotId} IS READY FOR PICKUP! (${ticket.table} — ${ticket.area})`, 'success');
  } else if (newStatus === 'COMPLETED') {
    AppState.kotQueue = AppState.kotQueue.filter(k => k.id !== kotId);
    showToast(`KOT ${kotId} marked as Completed & Served!`);
  }

  renderKdsQueue();
  renderDashboard();
  renderRoleSidebar();
}

function updateReadyNotificationsBadge() {
  const countEl = document.getElementById('ready-bell-count');
  if (countEl) {
    countEl.textContent = `[${AppState.readyNotifications.length}]`;
  }
  renderReadyNotificationsModal();
}

function renderReadyNotificationsModal() {
  const container = document.getElementById('modal-ready-notifications-list');
  if (!container) return;
  container.innerHTML = '';

  if (AppState.readyNotifications.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); padding: 20px; font-size: 13px;">No orders currently ready for pickup.</div>`;
  } else {
    AppState.readyNotifications.forEach(n => {
      container.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: var(--color-success-bg); border: 1px solid var(--color-success-border); border-radius: 10px;">
          <div>
            <div style="font-weight: 700; color: var(--color-success); font-size: 15px;">ORDER ${n.id} READY — ${n.table}</div>
            <div style="font-size: 12px; color: var(--color-text-primary); margin-top: 2px;">${n.area} • ${n.items}</div>
            <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">Ready at ${n.time}</div>
          </div>
          <button class="btn btn-success btn-sm" onclick="acknowledgeReadyNotification('${n.id}')">
            ACKNOWLEDGE PICKUP
          </button>
        </div>
      `;
    });
  }
}

function acknowledgeReadyNotification(kotId) {
  AppState.readyNotifications = AppState.readyNotifications.filter(n => n.id !== kotId);
  
  const ticket = AppState.kotQueue.find(k => k.id === kotId);
  if (ticket) {
    ticket.status = 'COMPLETED';
    AppState.kotQueue = AppState.kotQueue.filter(k => k.id !== kotId);
  }

  updateReadyNotificationsBadge();
  renderKdsQueue();
  renderDashboard();
  showToast(`Acknowledged pickup for KOT ${kotId}!`, 'success');
}

// --- FLOOR MAP RENDERER ---
function renderFloorMap() {
  const container = document.getElementById('full-floor-table-grid');
  if (!container) return;
  container.innerHTML = '';

  AppState.tablesData.forEach(t => {
    container.innerHTML += `
      <div class="table-card ${t.status}" onclick="selectTableForPos('${t.name}', '${t.area}')">
        <div class="table-header-row">
          <span class="table-num">${t.name}</span>
          <span class="table-cap">${t.capacity} Seater</span>
        </div>
        <span style="font-size: 11px; font-weight: 600; color: var(--color-text-secondary);">${t.area}</span>
        <span class="badge ${t.status === 'available' ? 'badge-success' : 'badge-warning'}" style="margin-top: 8px;">
          ${t.status.toUpperCase()}
        </span>
      </div>
    `;
  });
}

function filterFloorMap(areaFilter) {
  const container = document.getElementById('full-floor-table-grid');
  if (!container) return;
  container.innerHTML = '';

  const list = areaFilter === 'all' ? AppState.tablesData : AppState.tablesData.filter(t => t.area === areaFilter);

  list.forEach(t => {
    container.innerHTML += `
      <div class="table-card ${t.status}" onclick="selectTableForPos('${t.name}', '${t.area}')">
        <div class="table-header-row">
          <span class="table-num">${t.name}</span>
          <span class="table-cap">${t.capacity} Seater</span>
        </div>
        <span style="font-size: 11px; font-weight: 600; color: var(--color-text-secondary);">${t.area}</span>
        <span class="badge ${t.status === 'available' ? 'badge-success' : 'badge-warning'}" style="margin-top: 8px;">
          ${t.status.toUpperCase()}
        </span>
      </div>
    `;
  });
}

// --- ACTIVE ORDERS TRACKER RENDERER ---
function renderOrdersTable() {
  const tbody = document.querySelector('#orders-master-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const combined = [...AppState.offlineQueue, ...AppState.activeOrders];

  combined.forEach(o => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.table} (${o.area})</td>
        <td>${o.time}</td>
        <td>${o.captain}</td>
        <td style="max-width: 200px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${o.items}</td>
        <td><strong>₹${o.amount.toFixed(2)}</strong></td>
        <td><span class="badge badge-warning">${o.status}</span></td>
        <td><span class="badge ${o.syncState === 'Synced' ? 'badge-success' : 'badge-warning'}">${o.syncState}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openModifyOrderWorkspace()">Modify</button>
        </td>
      </tr>
    `;
  });
}

// --- MENU MANAGEMENT RENDERER ---
function renderMenuManagementTable() {
  const tbody = document.querySelector('#menu-master-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  AppState.menuCatalog.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${m.img}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;"></td>
        <td><strong>${m.name}</strong> ${m.isVeg ? '🟢' : '🔺'}</td>
        <td>${m.category}</td>
        <td>₹${m.price.toFixed(2)}</td>
        <td>₹${m.areaPrices['AC Hall'].toFixed(2)}</td>
        <td>₹${m.areaPrices['Garden Terrace'].toFixed(2)}</td>
        <td><span class="badge badge-success">Available</span></td>
        <td><button class="btn btn-secondary btn-sm" onclick="showToast('Edit pricing for ${m.name}')">Edit Price</button></td>
      </tr>
    `;
  });
}

// --- INVENTORY MASTER & REUSE FROM HISTORY RENDERER ---
function renderInventoryTable() {
  const tbody = document.querySelector('#inventory-master-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  AppState.inventoryMaster.forEach(inv => {
    const isLow = inv.stock <= inv.min;

    tbody.innerHTML += `
      <tr>
        <td><code>${inv.sku}</code></td>
        <td><strong>${inv.name}</strong></td>
        <td>${inv.category}</td>
        <td style="font-weight: 700; color: ${isLow ? 'var(--color-danger)' : 'var(--color-text-primary)'};">${inv.stock.toFixed(1)}</td>
        <td>${inv.unit}</td>
        <td>${inv.min} ${inv.unit}</td>
        <td>${inv.supplier}</td>
        <td><span class="badge ${isLow ? 'badge-danger' : 'badge-success'}">${isLow ? 'Low Stock' : 'In Stock'}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="viewSkuHistory('${inv.sku}')">History Ledger</button>
        </td>
      </tr>
    `;
  });
}

function openInventoryLookupModal() {
  openModal('modal-inventory-lookup');
  handleSkuLookupSearch();
}

function handleSkuLookupSearch() {
  const inputEl = document.getElementById('sku-lookup-input');
  if (!inputEl) return;
  const query = inputEl.value.toLowerCase();
  const resultsContainer = document.getElementById('sku-lookup-results');
  resultsContainer.innerHTML = '';

  const matches = AppState.inventoryMaster.filter(i => i.name.toLowerCase().includes(query) || i.sku.toLowerCase().includes(query));

  if (matches.length > 0) {
    matches.forEach(m => {
      resultsContainer.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: 8px;">
          <div>
            <strong style="color: var(--color-primary);">${m.name}</strong>
            <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">
              ${m.sku} • Current: <strong>${m.stock.toFixed(1)} ${m.unit}</strong> • Supplier: ${m.supplier}
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="reuseExistingSkuFromHistory('${m.sku}')">
            🔄 REUSE ITEM FROM HISTORY
          </button>
        </div>
      `;
    });
  } else {
    resultsContainer.innerHTML = `<div style="font-size: 13px; color: var(--color-text-muted); padding: 8px;">No matching master item found in catalog. You can create a new SKU below.</div>`;
  }
}

function reuseExistingSkuFromHistory(skuCode) {
  const item = AppState.inventoryMaster.find(i => i.sku === skuCode);
  if (!item) return;

  item.stock += 10.0;
  item.ledger.unshift({
    date: new Date().toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    action: 'Stock In',
    qty: '+10.0 ' + item.unit,
    reason: 'Reused from Master History',
    user: 'Sanjay (Manager)'
  });

  closeModal('modal-inventory-lookup');
  renderInventoryTable();
  showToast(`Reused SKU ${item.sku} (${item.name}) from history! Added +10.0 ${item.unit} stock.`, 'success');
}

function addNewUniqueSku() {
  const newSku = {
    sku: `SKU-NEW-${Math.floor(100 + Math.random() * 900)}`,
    name: 'Basmati Extra Long Rice (25kg Bag)',
    category: 'Grains',
    stock: 25.0,
    unit: 'kg',
    min: 10.0,
    supplier: 'Metro Wholesale',
    status: 'In Stock',
    ledger: [{
      date: new Date().toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      action: 'Created SKU',
      qty: '+25.0 kg',
      reason: 'Initial SKU Creation',
      user: 'Sanjay (Manager)'
    }]
  };

  AppState.inventoryMaster.push(newSku);
  closeModal('modal-inventory-lookup');
  renderInventoryTable();
  showToast(`Created new SKU: ${newSku.name}`, 'success');
}

function viewSkuHistory(skuCode) {
  const item = AppState.inventoryMaster.find(i => i.sku === skuCode);
  if (!item) return;

  document.getElementById('drawer-sku-title').textContent = item.name;
  document.getElementById('drawer-sku-code').textContent = `${item.sku} (Current Stock: ${item.stock} ${item.unit})`;

  const tbody = document.getElementById('drawer-sku-ledger-body');
  tbody.innerHTML = '';

  if (item.ledger.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">No history movements recorded.</td></tr>`;
  } else {
    item.ledger.forEach(l => {
      tbody.innerHTML += `
        <tr>
          <td>${l.date}</td>
          <td><span class="badge ${l.action.includes('In') || l.action.includes('Created') ? 'badge-success' : 'badge-danger'}">${l.action}</span></td>
          <td><strong>${l.qty}</strong></td>
          <td>${l.reason}</td>
          <td>${l.user}</td>
        </tr>
      `;
    });
  }

  openDrawer('drawer-inventory-history');
}

// --- PURCHASING & SUPPLIER MATRIX RENDERER ---
function renderPriceMatrix() {
  const tbody = document.querySelector('#supplier-matrix-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  AppState.supplierQuotes.forEach(q => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${q.supplier}</strong></td>
        <td>${q.product}</td>
        <td><strong style="color: var(--color-primary);">₹${q.price.toFixed(2)}</strong></td>
        <td>${q.minOrder}</td>
        <td>${q.leadTime}</td>
        <td><span class="badge ${q.tag.includes('BEST') ? 'badge-success' : 'badge-info'}">${q.tag}</span></td>
        <td><button class="btn btn-primary btn-sm" onclick="issuePoForSupplier('${q.supplier}')">Issue Purchase Order</button></td>
      </tr>
    `;
  });
}

function issuePoForSupplier(supplierName) {
  const poId = `PO-${Math.floor(1080 + Math.random() * 20)}`;
  AppState.purchaseOrders.unshift({
    poNum: poId,
    supplier: supplierName,
    item: 'Cooking Oil 20L Can x 2',
    total: 4300,
    date: new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Pending Approval'
  });

  renderPoTable();
  showToast(`Issued Purchase Order ${poId} to ${supplierName}!`, 'success');
}

function renderPoTable() {
  const tbody = document.querySelector('#po-list-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  AppState.purchaseOrders.forEach(po => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${po.poNum}</strong></td>
        <td>${po.supplier}</td>
        <td>${po.item}</td>
        <td>₹${po.total.toFixed(2)}</td>
        <td>${po.date}</td>
        <td><span class="badge ${po.status === 'Received' ? 'badge-success' : 'badge-warning'}">${po.status}</span></td>
      </tr>
    `;
  });
}

// --- OPERATIONAL REPORT EXPORT ---
function exportOperationalReport() {
  const rows = [
    ['Metric', 'Value'],
    ["Today's Sales", '148500'],
    ['Active Orders', AppState.activeOrders.length],
    ['KOTs in Queue', AppState.kotQueue.length],
    ['Occupied Tables', AppState.tablesData.filter(t => t.status !== 'available').length],
    ['Offline Queued Orders', AppState.offlineQueue.length],
    ['Sync Status', AppState.isOnline ? 'Synced' : 'Offline / Queued']
  ];
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'zenith-operational-report.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Operational report exported successfully.', 'success');
}

function updateOperationalReport() {
  const active = document.getElementById('report-active-orders');
  const kot = document.getElementById('report-kot-count');
  const occupied = document.getElementById('report-occupied-tables');
  const offline = document.getElementById('report-offline-queued');
  const queued = document.getElementById('report-queued-orders');
  const sync = document.getElementById('report-sync-status');
  if (active) active.textContent = AppState.activeOrders.length;
  if (kot) kot.textContent = AppState.kotQueue.length;
  if (occupied) occupied.textContent = AppState.tablesData.filter(t => t.status !== 'available').length;
  if (offline) offline.textContent = AppState.offlineQueue.length;
  if (queued) queued.textContent = AppState.offlineQueue.length;
  if (sync) sync.textContent = AppState.isOnline ? 'Synced' : 'Paused';
}

// --- UTILITY UI HELPERS ---
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

function openDrawer(id) {
  const backdrop = document.getElementById(`${id}-backdrop`);
  const drawer = document.getElementById(id);
  if (backdrop) backdrop.classList.add('active');
  if (drawer) drawer.classList.add('active');
}

function closeDrawer(id) {
  const backdrop = document.getElementById(`${id}-backdrop`);
  const drawer = document.getElementById(id);
  if (backdrop) backdrop.classList.remove('active');
  if (drawer) drawer.classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
