# Navigation & Routing Clarification

## 🎫 Ticket Pages - Clear Distinction

### Two Different Pages:

#### 1. `/tickets` - Ticket Designer (Organizer Tool)
**Purpose:** Design and manage ticket templates for events
**Who uses it:** Event organizers
**Features:**
- Create custom ticket designs
- Set ticket dimensions (150mm x 80mm)
- Add branding elements
- Configure QR code placement
- Preview ticket layouts

**Access:** Sidebar → "Ticket Designer"

---

#### 2. `/my-orders` - Customer Purchases
**Purpose:** View purchased tickets and order history
**Who uses it:** Event attendees/customers
**Features:**
- View all purchased tickets
- Download tickets (PDF)
- See QR codes for entry
- Check order status
- View order history

**Access:** User dropdown menu (top-right) → "My Orders"

---

## 🧭 Navigation Structure

### Sidebar Menu (Organizer Tools)
```
Dashboard          → /dashboard
Events             → /events
Bookings           → /bookings
Ticket Designer    → /tickets        ← Organizer tool
Financials         → /financials
Customers          → /customers
Promotions         → /promotions
Event Timeline     → /event-timeline
Branding & Design  → /branding
Communications     → /communications
Gallery            → /gallery
```

### User Dropdown Menu (Personal)
```
Dashboard          → /dashboard
My Orders          → /my-orders      ← Customer purchases
Settings           → /settings
Sign Out           → (logout)
```

---

## 🔄 User Flows

### Organizer Flow (Design Tickets)
1. Click "Ticket Designer" in sidebar
2. Create/edit ticket templates
3. Assign templates to events
4. Preview and save designs

### Customer Flow (Buy & View Tickets)
1. Browse events at `/events`
2. Click event to view details
3. Select tickets and checkout
4. After purchase → View in "My Orders"
5. Click user avatar (top-right)
6. Click "My Orders"
7. Download/view tickets

---

## 📋 Route Mapping

| Route | Purpose | User Type | Access |
|-------|---------|-----------|--------|
| `/tickets` | Ticket design tool | Organizer | Sidebar |
| `/my-orders` | Purchased tickets | Customer | User menu |
| `/events` | Browse events | Both | Sidebar |
| `/events/[id]` | Event details & purchase | Customer | Public |
| `/checkout` | Complete purchase | Customer | After selecting tickets |
| `/bookings` | Manage all bookings | Organizer | Sidebar |

---

## ✅ Changes Made

### 1. Sidebar Updated
- Changed "Tickets" → "Ticket Designer"
- Added description: "Design & manage tickets"
- Clarifies this is an organizer tool

### 2. Header Dropdown Updated
- Added "My Orders" menu item
- Positioned between Dashboard and Settings
- Easy access for customers to view purchases

### 3. Clear Separation
- **Organizers** use `/tickets` for design
- **Customers** use `/my-orders` for purchases
- No more confusion!

---

## 🎯 Quick Access

### For Customers:
**To view your purchased tickets:**
1. Click your avatar (top-right corner)
2. Click "My Orders"
3. See all your tickets and orders

### For Organizers:
**To design ticket templates:**
1. Click "Ticket Designer" in sidebar
2. Create/edit templates
3. Assign to events

---

## 📱 Mobile Considerations

On mobile devices:
- Sidebar becomes a hamburger menu
- User dropdown still accessible
- "My Orders" always available in user menu
- Clear labels prevent confusion

---

## 🔍 Related Pages

### Customer Journey:
```
/events → /events/[id] → /checkout → /my-orders
```

### Organizer Journey:
```
/events/create → /tickets (design) → /bookings (manage)
```

---

## ✅ Best Practices

### URL Naming:
- ✅ `/my-orders` - Clear it's personal
- ✅ `/tickets` - Tool/resource (organizer)
- ❌ `/tickets` for both - Confusing!

### Menu Placement:
- ✅ Organizer tools → Sidebar
- ✅ Personal items → User dropdown
- ✅ Public pages → Top navigation

### Labels:
- ✅ "Ticket Designer" - Clear purpose
- ✅ "My Orders" - Personal ownership
- ❌ "Tickets" - Ambiguous

---

**Status:** ✅ Navigation conflict resolved!

**Last Updated:** 2025-12-12
