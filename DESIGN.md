# Restaurant Operations Platform — Design Specification (DESIGN.md)

**Product Title:** Zenith Restaurant Operations Suite  
**Target Platform:** Desktop / Laptop-First Web Application (1366×768, 1440×900, 1920×1080 | Min Supported: 1024px)  
**Architecture:** Offline-First, Role-Aware, High-Efficiency Restaurant Operations  
**Design System Version:** 2.0.0  

---

## 1. Product Context & Operational Objectives

Zenith is a unified, desktop-first restaurant management platform built specifically for high-pressure restaurant operating environments. It integrates POS, Tables, KOT/Kitchen Queue, Menu & Area Pricing, Inventory, Purchasing, Customer Records, Reports, and System Settings into a fast, reliable, low-cognitive-load laptop interface.

Restaurant operations frequently suffer from internet drops and local network unreliability. Zenith operates under an **Offline-First Operating Model**: all critical front-of-house (POS, Table management, KOT firing, Billing) and back-of-house operations run locally without internet dependency. When connectivity restores, local data synchronizes automatically with the cloud server without order duplication or sequence alteration.

---

## 2. Core UX Principle: Offline-First Operation

> **"THE RESTAURANT SHOULD KEEP WORKING EVEN WHEN THE INTERNET DOESN'T."**

### 2.1 Operational Capability Matrix
```
┌──────────────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ WHEN INTERNET IS UNAVAILABLE (OFFLINE)           │ WHEN INTERNET IS AVAILABLE (ONLINE)              │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ ✓ Create, edit, and void table orders            │ ✓ Real-time multi-terminal cloud sync            │
│ ✓ Assign and update table states                 │ ✓ Menu and price updates sync from cloud         │
│ ✓ Generate and dispatch digital & printed KOTs   │ ✓ Third-party online order ingestion             │
│ ✓ Complete guest billing & print tax receipts    │ ✓ Multi-outlet aggregated owner analytics        │
│ ✓ Record local sales data & daily shift totals   │ ✓ Supplier catalog updates & price sync          │
│ ✓ Access cached menu catalog & customer records  │ ✓ Cloud backup of end-of-day reports             │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────┘
```

### 2.2 System Status Architecture: "Locally Stored, Fully Synced"
The top navigation contains a persistent, two-tier system status component that clearly distinguishes between local operations and cloud synchronization.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SYSTEM STATUS CONTAINER: [Locally Stored, Fully Synced]                                │
├────────────────────────────────────────┬───────────────────────────────────────────────┤
│ LOCAL SERVER / DEVICE (ACTIVE)         │ CLOUD SYNC ENGINE (STATUS)                    │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ ● Local Node: ONLINE (0ms Latency)     │ Status: Online — Syncing in real time         │
│ • Every Bill & KOT                     │ [Cloud Indicator: Green Dot ●]                │
│ • All Dine-In & Takeaway Orders        │ Last Cloud Sync: 4 seconds ago                │
│ • Sales Records & Day-End Reports      │ Pending Uploads: 0 Queue                      │
├────────────────────────────────────────┴───────────────────────────────────────────────┤
│ WHEN OFFLINE:                                                                          │
│ Local Side: Fully Active (100% Operations Continue)                                    │
│ Cloud Side: Amber Pill [● Sync Paused — Local Orders Safe]                              │
│ Subtext: "Billing and orders continue locally. Sync will resume automatically."        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. MoSCoW Feature Priorities

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ MOSCOW PRIORITY MATRIX                                                                      │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ MUST HAVE (V1 Core Operational Foundation)                                                  │
│ • Fix order failures caused by poor/no network (Offline-first local writes)                 │
│ • Prevent duplicate/jumbled orders during offline-to-online reconnection                    │
│ • Distinct, role-tailored interfaces for Captain, Manager, and Owner                        │
│ • Ultra-fast menu search and rapid order entry cart with inline [- 2 +] steppers            │
│ • Food photos (48–64px) alongside item names & dietary tags for visual recognition          │
│ • Clear real-time order and kitchen lifecycle status indicators                             │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ SHOULD HAVE (V1 Operational Efficiency Expansion)                                           │
│ • Inventory movement ledger and SKU history audit trail                                     │
│ • Reusable inventory item lookup engine (forces search before SKU creation)                 │
│ • Streamlined stock adjustments with mandatory reason logging                               │
│ • Fine-grained Role-Based Access Control (RBAC)                                             │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ COULD HAVE (V1 Kitchen & Workflow Enhancements)                                             │
│ • Multi-facet inventory table filtering (by category, stock level, supplier)                │
│ • Multilingual UI framework (EN, HI, MR, TA, KN) with flexible layout bounds                 │
│ • Smart kitchen ticket prioritization scoring (prep time + wait duration + table tags)      │
│ • Digital kitchen audio/visual alert notifications for delayed tickets (>15m)              │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ WON'T HAVE CURRENTLY (Extensible Future Modules)                                            │
│ • CRM & Loyalty rewards program                                                             │
│ • Marketing SMS/WhatsApp campaign dispatcher                                                │
│ • Advanced multi-outlet yield analytics                                                     │
│ • Third-party delivery aggregator auto-dispatch                                             │
│ *Note: Architecture & navigation sidebar reserve extensible slots for future activation.     │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Complete Design Tokens (CSS Variables)

```css
:root {
  /* ==========================================
     4.1 COLOR SYSTEM
     ========================================== */
  /* Primary Brand Accent */
  --color-primary: #D71936;
  --color-primary-hover: #B8132C;
  --color-primary-active: #960F23;
  --color-primary-light: #FDECEF;

  /* Typography Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #667085;
  --color-text-muted: #98A2B3;
  --color-text-on-primary: #FFFFFF;

  /* Surface & Background Colors */
  --color-background: #F7F5F1; /* Warm off-white background */
  --color-surface: #FFFFFF;    /* Clean white cards and modals */
  --color-surface-subtle: #F9FAFB;
  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;

  /* Status Colors */
  --color-success: #22A06B;
  --color-success-bg: #E9F8F1;
  --color-success-border: #A3E6C5;

  --color-warning: #F59E0B;
  --color-warning-bg: #FFF7E6;
  --color-warning-border: #FDE68A;

  --color-danger: #D71936;
  --color-danger-bg: #FDECEF;
  --color-danger-border: #FCA5A5;

  --color-info: #4F6BFF;
  --color-info-bg: #EEF2FF;
  --color-info-border: #C7D2FE;

  --color-disabled: #98A2B3;
  --color-disabled-bg: #F3F4F6;

  /* Area-Specific Accents (Used Sparingly for Dining Sections) */
  --color-area-ac-bg: #F4F0FF;
  --color-area-ac-border: #DDD6FE;
  --color-area-ac-text: #6B21A8;

  --color-area-garden-bg: #E6F4EA;
  --color-area-garden-border: #A7F3D0;
  --color-area-garden-text: #047857;

  --color-area-nonac-bg: #FEF9C3;
  --color-area-nonac-border: #FDE047;
  --color-area-nonac-text: #A16207;

  /* ==========================================
     4.2 TYPOGRAPHY TOKENS
     ========================================== */
  --font-family-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Font Sizes & Weights */
  --font-size-display: 34px;     --font-weight-display: 700;  --line-height-display: 42px;
  --font-size-page-heading: 26px;--font-weight-page-heading: 700;--line-height-page-heading: 32px;
  --font-size-section-heading: 18px;--font-weight-section-heading: 600;--line-height-section-heading: 24px;
  --font-size-body: 14px;        --font-weight-body: 400;     --line-height-body: 20px;
  --font-size-body-bold: 14px;   --font-weight-body-bold: 600;--line-height-body-bold: 20px;
  --font-size-label: 13px;       --font-weight-label: 600;    --line-height-label: 18px;
  --font-size-table: 14px;       --font-weight-table: 400;    --line-height-table: 20px;
  --font-size-button: 14px;      --font-weight-button: 600;   --line-height-button: 20px;
  --font-size-meta: 12px;        --font-weight-meta: 500;     --line-height-meta: 16px;

  /* ==========================================
     4.3 SPACING TOKENS (8px Grid)
     ========================================== */
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-40: 40px;
  --space-48: 48px;

  /* ==========================================
     4.4 COMPONENT DIMENSIONS & RADII
     ========================================== */
  --radius-sm: 6px;
  --radius-md: 8px;   /* Inputs, Buttons */
  --radius-lg: 12px;  /* Cards, Containers */
  --radius-xl: 16px;  /* Modals, Drawers */
  --radius-pill: 999px;

  --sidebar-width-expanded: 230px;
  --sidebar-width-collapsed: 68px;
  --topbar-height: 60px;

  --button-height-sm: 32px;
  --button-height-md: 40px;
  --button-height-lg: 48px;
  --input-height: 40px;
  --input-search-height: 44px;

  --shadow-subtle: 0px 1px 3px rgba(17, 24, 39, 0.05);
  --shadow-card: 0px 2px 4px rgba(17, 24, 39, 0.06);
  --shadow-modal: 0px 12px 24px -4px rgba(17, 24, 39, 0.12);

  --z-index-sticky: 100;
  --z-index-dropdown: 200;
  --z-index-modal-backdrop: 500;
  --z-index-modal: 600;
  --z-index-toast: 1000;
}
```

---

## 5. Layout System & Screen Dimensions

Zenith is engineered specifically for laptop and desktop displays.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR (Height: 60px)                                                      │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR NAV  │ MAIN VIEWPORT CONTAINER (Background: #F7F5F1)                           │
│              │ - Padding: 24px                                                         │
│ Width:       │ - Inner Scrollable Content Area                                         │
│ Expanded:    │ - Split Panels (e.g., POS: 65% Catalog / 35% Order Cart)                │
│ 230px        │                                                                         │
│ Collapsed:   │                                                                         │
│ 68px         │                                                                         │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### Supported Viewport Resolutions
* **1440×900 (Primary Target):** 230px expanded sidebar, 3-column menu grid, persistent 35% cart drawer.
* **1366×768 (Standard Laptop):** 230px expanded sidebar, 3-column menu grid, 35% cart drawer.
* **1024×768 (Minimum Desktop):** Automatically collapses sidebar to 68px (icon-only mode), compresses menu grid to 2 columns, cart drawer remains accessible.

---

## 6. Navigation Architecture & Role-Based Access Control (RBAC)

The persistent left sidebar renders dynamically based on the logged-in user's role. Unpermitted modules are either hidden completely or rendered in a disabled state with discovery tooltips.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR NAVIGATION STRUCTURE                                                                │
├──────────────────────────────┬──────────────────┬──────────────────┬────────────────────────┤
│ MODULE NAVIGATION ITEM       │ CAPTAIN ROLE     │ MANAGER ROLE     │ OWNER ROLE             │
├──────────────────────────────┼──────────────────┼──────────────────┼────────────────────────┤
│ 1. POS Workspace             │ Active (Primary) │ Active           │ Active                 │
│ 2. Tables & Floor Map        │ Active           │ Active           │ Active                 │
│ 3. Active Orders Tracker     │ Active           │ Active           │ Active                 │
│ 4. Kitchen / KOT Display     │ Read-Only Queue  │ Active           │ Read-Only              │
│ 5. Menu & Area Pricing       │ Hidden           │ Active           │ Active                 │
│ 6. Inventory Master          │ Hidden           │ Active           │ Active                 │
│ 7. Purchasing & Suppliers    │ Hidden           │ Active           │ Active                 │
│ 8. Customer Directory (CRM)  │ Selection Only   │ Active           │ Active                 │
│ 9. Reports & Analytics       │ Hidden           │ Operational Only │ Full Business BI       │
│ 10. Settings & RBAC          │ Hidden           │ Operational Only │ Full Admin Access      │
├──────────────────────────────┴──────────────────┴──────────────────┴────────────────────────┤
│ FUTURE MODULE SLOTS (Extensible Navigation Placeholders)                                   │
│ • Campaigns & Marketing [Locked Tag: "Future Module"]                                       │
│ • Loyalty Program [Locked Tag: "Future Module"]                                             │
│ • Aggregator Delivery Stream [Locked Tag: "Future Module"]                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. POS & Order Entry System Specification

The POS workspace uses a high-speed, two-panel layout optimized for minimum click depth:

```
┌───────────────────────────────────────────────────┬─────────────────────────────────────┐
│ LEFT PANEL: MENU CATALOG (65% Width)              │ RIGHT PANEL: ORDER CART (35% Width) │
├───────────────────────────────────────────────────┼─────────────────────────────────────┤
│ AREA FILTER: [AC Hall] [Garden] [Non-AC]          │ Table 14 (AC) | Order #1042 (Rahul) │
│ SEARCH: [ Search dish... (Ctrl+F) ] [Veg Only 🟢] │ Status: Ordering | Sync: ● Synced   │
├───────────────────────────────────────────────────┼─────────────────────────────────────┤
│ CATEGORIES: [All] [Starters] [Mains] [Breads]      │ CART ITEMS LIST:                    │
├───────────────────────────────────────────────────┤ 1. Paneer Tikka             ₹280    │
│ MENU GRID (3 Columns):                            │    - Mod: Extra Spicy               │
│ ┌───────────────────────────────────────────────┐ │    [-]  2  [+]  [Edit]   [Delete]   │
│ │ [Photo 56px]  Paneer Tikka (Veg)      ₹280    │ 2. Garlic Naan              ₹120    │
│ │               Available               [+ ADD] │    [-]  3  [+]  [Delete]            │
│ └───────────────────────────────────────────────┘ ├─────────────────────────────────────┤
│ ┌───────────────────────────────────────────────┐ │ SUBTOTAL:                   ₹400.00 │
│ │ [Photo 56px]  Butter Chicken (NonVeg) ₹360   │ │ GST (5%):                    ₹20.00 │
│ │               Out of Stock          [UNAVAIL] │ │ GRAND TOTAL:                ₹420.00 │
│ └───────────────────────────────────────────────┘ ├─────────────────────────────────────┤
│                                                   │ [Save Draft] [Print Bill] [SEND KOT]│
└───────────────────────────────────────────────────┴─────────────────────────────────────┘
```

### 7.1 Menu Item Card Specs
* Dimensions: Flexible width, height 76px.
* Food Thumbnail: 56px × 56px square with 6px border-radius, `object-fit: cover`.
* Dietary Indicators: Green dot badge for Veg `🟢`, Red triangle for Non-Veg `🔺`.
* Action Target: Tapping card or `+ ADD` button instantly appends item to cart or increments quantity.

### 7.2 Active Cart Specs
* Quantity Stepper: Inline `[-]  2  [+]` stepper with 32px height buttons.
* Special Instructions: Expandable text field per line item (e.g., "Medium spicy, no garlic").
* Action Buttons: Primary Red `SEND KOT` (48px height), Secondary `Print Bill`, Tertiary `Save Draft`.

---

## 8. Table & Area Management System

Tables are visually mapped into Area Sections: **AC Hall**, **Garden Terrace**, and **Non-AC Main**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TABLE MAP — AREA: AC HALL (12 Tables)                                                  │
├─────────────────┬─────────────────┬─────────────────┬──────────────────────────────────┤
│ TABLE 1         │ TABLE 2         │ TABLE 3         │ TABLE 4                          │
│ 4 Seater        │ 2 Seater        │ 6 Seater        │ 4 Seater                         │
│ STATUS:         │ STATUS:         │ STATUS:         │ STATUS:                          │
│ ● Available     │ ● Occupied      │ ● Preparing KOT │ ● Bill Requested                 │
│ (Green Border)  │ (Blue Border)   │ (Amber Border)  │ (Flashing Red Border)            │
│ --              │ Elapsed: 14m    │ Ticket #K-204   │ Total: ₹1,240                    │
│ [Open Order]    │ [View Cart]     │ [View KDS Status│ [Print & Settle]                 │
└─────────────────┴─────────────────┴─────────────────┴──────────────────────────────────┘
```

### Table Lifecycle States & Identifiers
* `Available`: Background `#FFFFFF`, Border 1px solid `#22A06B`, Status text "Available".
* `Occupied / Ordering`: Background `#EEF2FF`, Border 2px solid `#4F6BFF`, Status text "Occupied (14m)".
* `Preparing (KOT Fired)`: Background `#FFF7E6`, Border 2px solid `#F59E0B`, Status text "Preparing (K-204)".
* `Bill Requested`: Background `#FDECEF`, Border 2px solid `#D71936`, Status text "Bill Requested".
* `Paid / Cleaning`: Background `#E9F8F1`, Border 1px solid `#22A06B`, Status text "Paid — Clear Table".

---

## 9. Order & KOT Kitchen Display Architecture

### 9.1 Order Lifecycle States
`Draft` ➔ `Placed` ➔ `KOT Sent` ➔ `Preparing` ➔ `Ready` ➔ `Served` ➔ `Billing` ➔ `Paid` ➔ `Cancelled`

### 9.2 KOT Ticket Card Layout (Dimension: 300px Grid Cards)
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ KOT TICKET #K-204          TABLE: T-12          TIME: 14:32 (Elapsed: 08:15)           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ QTY   ITEM NAME                                MODIFIERS / INSTRUCTIONS                │
│  2 ×  Paneer Butter Masala                     [Extra Butter] [Medium Spicy]          │
│  4 ×  Garlic Naan                              [Crispy]                                │
│  1 ×  Jeera Rice                               --                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ NOTES: Guest has nut allergy. Handle with care.                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STATUS SWITCH:  [ MARK PREPARING ]        ➔       [ MARK READY FOR PICKUP ]            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```
* **Urgency Timer Shift:** 
  * `< 8 mins`: Timer text Green (`#22A06B`).
  * `8–15 mins`: Timer text Amber (`#F59E0B`).
  * `> 15 mins`: Ticket border flashes Red (`#D71936`) + Audible kitchen chime.

---

## 10. Menu Management & Area-Specific Pricing

Zenith supports variable pricing across restaurant dining areas (e.g., AC section commands a premium over Non-AC).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MENU ITEM EDITOR — Item: Chicken Biryani (Special)                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Base Catalog Price: ₹350.00 | Category: Main Course | Tax Code: GST 5%                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ AREA-SPECIFIC PRICING MATRIX:                                                          │
├──────────────────────────┬──────────────────────┬──────────────────────────────────────┤
│ DINING AREA SECTION      │ AREA SURCHARGE / ADJ │ FINAL DISPLAY PRICE                  │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ Non-AC Main              │ Base Price           │ ₹350.00                              │
│ Garden Terrace           │ + ₹50.00             │ ₹400.00                              │
│ AC Hall                  │ + ₹100.00            │ ₹450.00                              │
└──────────────────────────┴──────────────────────┴──────────────────────────────────────┘
```

---

## 11. Inventory & Reusable Item Discovery System

To prevent catalog duplication (e.g., "Tomato", "Tomatoes", "Fresh Tomato"), stock intake enforces a **Typeahead Lookup Engine**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ADD STOCK INGREDIENT — Mandatory SKU Lookup                                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Step 1: Search Existing Master Catalog: [ Tom                        ]                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ MATCHING CATALOG SKUs FOUND:                                                           │
│ 1. Tomato — Standard Grade (Current: 42.0 kg | Supplier: Metro Wholesale)               │
│    [ SELECT & ADD STOCK ]                                                              │
│ 2. Tomato Puree — 1L Can (Current: 8 Cans | Supplier: Prime Agro)                      │
│    [ SELECT & ADD STOCK ]                                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ OR: [ ITEM NOT LISTED — CREATE NEW MASTER SKU ]                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Inventory History Ledger Drawer (500px Right Drawer)
Displays a strict audit trail for every SKU movement: date/time, action (+/-), quantity delta, source document (PO#, KOT#, Waste Log), user badge, and notes.

---

## 12. Purchasing & Supplier Price Discovery System

Enables managers to evaluate supplier quotes side-by-side before creating Purchase Orders.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SUPPLIER PRICE DISCOVERY — Ingredient: Cooking Oil (20L Can)                           │
├──────────────────────────┬──────────────┬──────────────┬──────────────┬────────────────┤
│ SUPPLIER NAME            │ QUOTE / CAN  │ MIN ORDER    │ DELIVERY TIME│ BEST VALUE TAG │
├──────────────────────────┼──────────────┼──────────────┼──────────────┼────────────────┤
│ Metro Cash & Carry       │ ₹2,150.00    │ 2 Cans       │ Same Day     │ ★ BEST PRICE   │
│ Royal Wholesalers        │ ₹2,220.00    │ 1 Can        │ Next Day     │ --             │
│ Prime Agro Supplies      │ ₹2,180.00    │ 5 Cans       │ 2 Days       │ --             │
├──────────────────────────┴──────────────┴──────────────┴──────────────┴────────────────┤
│ ACTION: [ CREATE PURCHASE ORDER WITH METRO CASH & CARRY ]                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 13. Customer Management (CRM)

* **Profile Metadata:** Name, Phone, Source, Registration Date.
* **Customer Metrics:** Visit Count (`28`), Average Bill (`₹1,450`), Lifetime Spend (`₹40,600`), Favorite Table (`Table 14 - AC`).
* **Tags (Reusable Badges):** `VIP Client`, `Corporate Client`, `Premium Client`, `Spicy Food Lover`.
* **Visit History Ledger:** Expandable list of past visits, items ordered, total bill, and assigned captain.

---

## 14. Reusable UI Component Specifications

### 14.1 Buttons
```
┌───────────────┬─────────┬─────────┬──────────────────────┬──────────────────────────────┐
│ BUTTON TYPE   │ HEIGHT  │ PADDING │ COLOR / BACKGROUND   │ HOVER & ACTIVE STATES        │
├───────────────┼─────────┼─────────┼──────────────────────┼──────────────────────────────┤
│ Primary CTA   │ 40px    │ 0 16px  │ BG: #D71936, Text: #FF│ Hover: #B8132C, Active: #960F│
│ Secondary     │ 40px    │ 0 16px  │ BG: #FFFFFF, Border:1│ Hover: #F7F5F1               │
│ Small Action  │ 32px    │ 0 12px  │ BG: #FFFFFF, Text: #1│ Hover: #F3F4F6               │
│ Large POS CTA │ 48px    │ 0 20px  │ BG: #D71936, Text: #FF│ Hover: #B8132C               │
│ Danger        │ 40px    │ 0 16px  │ BG: #FDECEF, Text: #D│ Hover: #FCA5A5               │
│ Icon Button   │ 40px sq │ 8px     │ BG: Transparent/White│ Hover: #F7F5F1               │
└───────────────┴─────────┴─────────┴──────────────────────┴──────────────────────────────┘
```

### 14.2 Form Inputs & Search Fields
* **Standard Input:** Height 40px, Border-radius 8px, Border `1px solid #E5E7EB`, Font 14px `#111827`. Focus Ring `0px 0px 0px 3px rgba(215, 25, 54, 0.15)`.
* **Large POS Search Field:** Height 44px, Integrated 18px Magnifying Glass Icon (Left padding 38px), Keyboard shortcut tag `[Ctrl + F]`.

### 14.3 Status Badges (Height: 24px, Radius: 999px)
* `Success / Synced`: BG `#E9F8F1`, Text `#22A06B`, Border `#A3E6C5`.
* `Warning / Offline`: BG `#FFF7E6`, Text `#F59E0B`, Border `#FDE68A`.
* `Danger / Error`: BG `#FDECEF`, Text `#D71936`, Border `#FCA5A5`.
* `Info / Draft`: BG `#EEF2FF`, Text `#4F6BFF`, Border `#C7D2FE`.

---

## 15. Complete Screen Inventory (31 Defined Screens)

The application design specifies concrete layouts, user permissions, and interactions for **31 system screens**:

```
CAPTAIN WORKSPACE SCREENS (1–9)
1. Captain Login & PIN Verification Screen
2. POS Main Ordering Workspace (Catalog Left / Cart Right)
3. Table Floor Map & Area Selector (AC, Garden, Non-AC)
4. New Order Creation Drawer
5. Active Order Details & Modification View
6. KOT Status Monitor (Captain View)
7. Guest Billing & Tax Receipt Preview Screen
8. Payment Collection Modal (Cash, UPI, Card, Split)
9. Offline Operation Indicator & Local Order Banner

MANAGER WORKSPACE SCREENS (10–21)
10. Manager Operations Command Dashboard
11. Master Live Orders Tracker
12. Kitchen Display System (KDS Command Queue)
13. Menu Catalog Management Screen
14. Menu Item Detail & Modifier Editor Modal
15. Dining Area Setup & Area-Specific Pricing Matrix
16. Master Inventory Stock Level Table
17. Inventory SKU History & Audit Trail Drawer
18. Add/Edit Stock Item & Reusable Search Modal
19. Purchase Manager & Supplier Quotes Comparison
20. Customer Directory (CRM List View)
21. Customer Profile & Order History Drawer

OWNER WORKSPACE SCREENS (22–26)
22. Executive Business Analytics & Profitability Dashboard
23. Multi-Outlet Performance Overview
24. Operational & Financial Reports Generator
25. User Accounts & RBAC Role Permission Matrix
26. Global System Settings (Taxes, Outlet Profile, Printers)

FUTURE EXTENSIBLE MODULE SCREENS (27–31)
27. Customer Loyalty & Points Configuration (Future)
28. Automated Marketing & Campaign Dispatcher (Future)
29. Advanced Multi-Outlet Yield & COGS Analytics (Future)
30. Aggregator Delivery Intake Stream (Future)
31. Automated Supplier PO Bidding Engine (Future)
```

---

## 16. Technical Implementation Guidance

1. **Local Data Persistence Layer:** IndexedDB managed via Dexie.js for 0ms latency local order writes and offline persistence.
2. **State Engine:** Reactive UI state store (Zustand / Redux Toolkit) with automatic local-storage sync hydration.
3. **Receipt & KOT Printing:** Direct ESC/POS thermal printing via WebUSB / Local Network Socket.
4. **i18n Multilingual Safeguards:** Flexbox container rules accommodating 30% label expansion for Hindi, Marathi, Tamil, and Kannada translations.

---

## 17. Quality Checklist & Final Acceptance Criteria

* [x] **Offline Guarantee:** 100% of order entry, table mapping, KOT firing, and billing actions run offline without network latency.
* [x] **Zero Order Duplication:** Deterministic sync engine uses local UUIDs and client timestamps to prevent order jumbling upon reconnection.
* [x] **Role Separation:** Dedicated, non-cluttered interfaces for Captains, Managers, and Owners.
* [x] **Fast POS Intake:** Compact menu cards with 56px food photos, dietary tags, and inline `[-] QTY [+]` cart steppers.
* [x] **Reusable Stock Lookup:** Mandatory typeahead search forces SKU reuse before new inventory item creation.
* [x] **Extensible Design:** Reserved sidebar slots and tokenized design system ready for future CRM and campaign expansion.
