# Hardcoded Colors Migration Status

## Overview
This document tracks the migration of hardcoded color values to design tokens across the Tickex application.

---

## ✅ Completed Files

### Core Layout & UI
- [x] `app/globals.css` - CSS variables defined
- [x] `app/layout.tsx` - Font and metadata updated
- [x] `tailwind.config.ts` - Design tokens configured
- [x] `components/layout/Sidebar.tsx`
- [x] `components/layout/Header.tsx`
- [x] `components/layout/DashboardLayout.tsx`
- [x] `components/ui/Button.tsx`
- [x] `components/ui/Card.tsx`
- [x] `components/ui/DateRangePicker.tsx` ✨ **Just updated**

### Dashboard Components
- [x] `components/dashboard/MetricGrid.tsx`
- [x] `components/dashboard/MetricCard.tsx`
- [x] `components/dashboard/TimelineSection.tsx`
- [x] `components/dashboard/PredictiveForecast.tsx`

### Bookings Components
- [x] `components/bookings/BookingsStats.tsx`
- [x] `components/bookings/BookingsTable.tsx`
- [x] `components/bookings/BookingsFilters.tsx`
- [x] `components/bookings/SalesIntelligenceSidebar.tsx`
- [x] `components/bookings/BookingDetailsModal.tsx` ✨ **Just updated**
- [x] `app/bookings/page.tsx` ✨ **Just updated**

### Timeline Components
- [x] `components/timeline/TimelineStats.tsx`

### Email & Branding
- [x] `components/emails/TicketEmail.tsx` (using constants for email compatibility)
- [x] `components/branding/ComponentRenderer.tsx`

---

## 🔄 Files Needing Migration

### Timeline Components (High Priority)
- [ ] `components/timeline/TimelineManager.tsx`
- [ ] `components/timeline/TimelineGantt.tsx`
- [ ] `components/timeline/AddMilestoneModal.tsx`

### Tickets Components
- [ ] `components/tickets/TicketSidebar.tsx`
- [ ] `components/tickets/TicketPreview.tsx`
- [ ] `components/tickets/TicketEditor.tsx`
- [ ] `components/tickets/TicketDistribution.tsx`
- [ ] `components/tickets/TicketDesigner.tsx`
- [ ] `components/tickets/CustomerTicketsClient.tsx`

### Events Components
- [ ] `components/events/EventsSidebar.tsx`
- [ ] `components/events/EventsHeader.tsx`
- [ ] `components/events/EventsGrid.tsx`
- [ ] `components/events/EventsFilters.tsx`
- [ ] `components/events/EventDetailsClient.tsx`
- [ ] `components/events/create/CreateEventWizard.tsx`
- [ ] `components/events/create/steps/EventBranding.tsx`
- [ ] `components/events/create/steps/TicketSetup.tsx`
- [ ] `components/events/create/steps/EventPolicies.tsx`
- [ ] `components/events/create/steps/EventBasics.tsx`
- [ ] `components/events/create/steps/ReviewPublish.tsx`

### Financials Components
- [ ] `components/financials/TaxCompliance.tsx`
- [ ] `components/financials/RevenueAnalytics.tsx`
- [ ] `components/financials/PayoutSchedule.tsx`
- [ ] `components/financials/PaymentMethods.tsx`
- [ ] `components/financials/InvoicesSidebar.tsx`
- [ ] `components/financials/FinancialsMetrics.tsx`

### Gallery Components
- [ ] `components/gallery/UploadModal.tsx`
- [ ] `components/gallery/GalleryHeader.tsx`
- [ ] `components/gallery/GalleryGrid.tsx`
- [ ] `components/gallery/GalleryFilters.tsx`

### Communications Components
- [ ] `components/communications/CampaignAnalytics.tsx`
- [ ] `components/communications/ChannelList.tsx`
- [ ] `components/communications/CreateCampaignModal.tsx`
- [ ] `components/communications/CampaignHub.tsx`

### Customers Components
- [ ] `components/customers/CustomerList.tsx`
- [ ] `components/customers/CustomerDetails.tsx`

### Branding Components
- [ ] `components/branding/PageManager.tsx`
- [ ] `components/branding/DesignPanel.tsx`
- [ ] `components/branding/ComponentLibrary.tsx`
- [ ] `components/branding/BuilderCanvas.tsx`

### Other Components
- [ ] `components/landing/LandingPageClient.tsx`
- [ ] `components/dashboard/metrics/DemographicsMetric.tsx`
- [ ] `components/dashboard/metrics/TicketsSoldMetric.tsx`
- [ ] `components/dashboard/metrics/RealTimeSalesMetric.tsx`

---

## 🎨 Common Color Mappings

Use this reference when migrating files:

### Old → New Mappings

```tsx
// Backgrounds
"bg-white" → "bg-card"
"bg-slate-50" → "bg-muted"
"bg-slate-100" → "bg-muted"
"bg-[#f8fafc]" → "bg-background"

// Text Colors
"text-[#0f172a]" → "text-foreground"
"text-[#64748b]" → "text-muted-foreground"
"text-[#333333]" → "text-foreground"

// Borders
"border-[#e2e8f0]" → "border-border"

// Brand Colors (OLD GREEN → NEW PURPLE)
"bg-[#1DB954]" → "bg-primary"
"text-[#1DB954]" → "text-primary"
"border-[#1DB954]" → "border-primary"

// Status Colors
"bg-green-50" → "bg-success/10"
"text-green-600" → "text-success"
"bg-red-50" → "bg-error/10"
"text-red-500" → "text-error"
"bg-orange-50" → "bg-warning/10"
"text-orange-500" → "text-warning"
"bg-blue-50" → "bg-info/10"
"text-blue-500" → "text-info"

// Hover States
"hover:bg-slate-50" → "hover:bg-muted"
"hover:bg-slate-100" → "hover:bg-muted"
"hover:text-[#0f172a]" → "hover:text-foreground"
```

---

## 📝 Migration Checklist

When migrating a file:

1. ✅ Replace `bg-white` with `bg-card`
2. ✅ Replace `bg-slate-50/100` with `bg-muted`
3. ✅ Replace `text-[#0f172a]` with `text-foreground`
4. ✅ Replace `text-[#64748b]` with `text-muted-foreground`
5. ✅ Replace `border-[#e2e8f0]` with `border-border`
6. ✅ Replace `#1DB954` (old green) with `primary` (new purple)
7. ✅ Update status colors to use semantic tokens
8. ✅ Test the component visually
9. ✅ Mark as complete in this document

---

## 🚀 Priority Order

1. **High Priority** (User-facing, frequently used)
   - Timeline components
   - Events components
   - Tickets components

2. **Medium Priority** (Admin/management features)
   - Financials components
   - Communications components
   - Customers components

3. **Low Priority** (Less frequently accessed)
   - Gallery components
   - Branding components (uses dynamic colors)
   - Dashboard metrics (mostly done)

---

## 📊 Progress

- **Completed**: ~27 files ✨
- **Remaining**: ~48 files
- **Overall Progress**: ~36%

---

## 🔧 Automated Migration Script

For bulk updates, consider using this find-and-replace pattern:

```bash
# Replace common patterns (use with caution)
find . -name "*.tsx" -type f -exec sed -i 's/bg-white/bg-card/g' {} +
find . -name "*.tsx" -type f -exec sed -i 's/text-\[#0f172a\]/text-foreground/g' {} +
find . -name "*.tsx" -type f -exec sed -i 's/text-\[#64748b\]/text-muted-foreground/g' {} +
find . -name "*.tsx" -type f -exec sed -i 's/border-\[#e2e8f0\]/border-border/g' {} +
```

**⚠️ Warning**: Always review changes manually and test thoroughly!

---

Last Updated: 2025-12-12
