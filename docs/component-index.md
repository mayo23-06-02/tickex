# Component Index & API Reference

**Date**: 2025-12-10  
**Purpose**: Quick reference for all components and their props

---

## Table of Contents

1. [Layout Components](#1-layout-components)
2. [Dashboard Components](#2-dashboard-components)
3. [Event Components](#3-event-components)
4. [Ticket Components](#4-ticket-components)
5. [Booking Components](#5-booking-components)
6. [Customer Components](#6-customer-components)
7. [Financial Components](#7-financial-components)
8. [Communication Components](#8-communication-components)
9. [Branding Components](#9-branding-components)
10. [Gallery Components](#10-gallery-components)
11. [Timeline Components](#11-timeline-components)

---

## 1. Layout Components

### DashboardLayout
**File**: `components/layout/DashboardLayout.tsx`

**Props**:
```typescript
interface DashboardLayoutProps {
    children: React.ReactNode;
}
```

**Usage**:
```tsx
<DashboardLayout>
    <YourPageContent />
</DashboardLayout>
```

---

### Sidebar
**File**: `components/layout/Sidebar.tsx`

**Props**: None (self-contained)

**Features**:
- Navigation menu
- Active route highlighting
- Icons for each section

---

### Header
**File**: `components/layout/Header.tsx`

**Props**:
```typescript
interface HeaderProps {
    title?: string;
    actions?: React.ReactNode;
}
```

---

## 2. Dashboard Components

### MetricGrid
**File**: `components/dashboard/MetricGrid.tsx`

**Props**: None

**Description**: Container for metric cards

---

### MetricCard
**File**: `components/dashboard/MetricCard.tsx`

**Props**:
```typescript
interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
}
```

---

### TotalSalesMetric
**File**: `components/dashboard/metrics/TotalSalesMetric.tsx`

**Props**: None (fetches own data)

**Displays**:
- Total revenue
- Trend percentage
- Comparison period

---

### TicketsSoldMetric
**File**: `components/dashboard/metrics/TicketsSoldMetric.tsx`

**Props**: None

**Displays**:
- Total tickets sold
- Breakdown by type
- Sales velocity

---

### RealTimeSalesMetric
**File**: `components/dashboard/metrics/RealTimeSalesMetric.tsx`

**Props**: None

**Displays**:
- Live sales updates
- Recent transactions
- Current sales rate

---

### DemographicsMetric
**File**: `components/dashboard/metrics/DemographicsMetric.tsx`

**Props**: None

**Displays**:
- Age distribution
- Gender breakdown
- Geographic data

---

### PredictiveForecast
**File**: `components/dashboard/PredictiveForecast.tsx`

**Props**:
```typescript
interface PredictiveForecastProps {
    data?: ForecastData[];
    period?: 'week' | 'month' | 'year';
}
```

**Features**:
- Chart visualization
- Predicted vs actual
- Confidence intervals

---

### TimelineSection
**File**: `components/dashboard/TimelineSection.tsx`

**Props**:
```typescript
interface TimelineSectionProps {
    events?: Event[];
    limit?: number;
}
```

---

## 3. Event Components

### EventsHeader
**File**: `components/events/EventsHeader.tsx`

**Props**:
```typescript
interface EventsHeaderProps {
    onSearch?: (query: string) => void;
    onCreate?: () => void;
}
```

---

### CreateEventWizard
**File**: `components/events/create/CreateEventWizard.tsx`

**Props**:
```typescript
interface CreateEventWizardProps {
    onComplete?: (event: Event) => void;
    onCancel?: () => void;
}
```

**Steps**:
1. Event Basics
2. Ticket Setup
3. Event Branding
4. Event Policies
5. Review & Publish

---

### EventBasics
**File**: `components/events/create/steps/EventBasics.tsx`

**Props**:
```typescript
interface EventBasicsProps {
    data: EventBasicsData;
    onChange: (data: Partial<EventBasicsData>) => void;
    onNext: () => void;
}

interface EventBasicsData {
    name: string;
    description: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    address: string;
}
```

---

### TicketSetup
**File**: `components/events/create/steps/TicketSetup.tsx`

**Props**:
```typescript
interface TicketSetupProps {
    tickets: TicketType[];
    onChange: (tickets: TicketType[]) => void;
    onNext: () => void;
    onBack: () => void;
}
```

---

### EventBranding
**File**: `components/events/create/steps/EventBranding.tsx`

**Props**:
```typescript
interface EventBrandingProps {
    branding: BrandingData;
    onChange: (branding: Partial<BrandingData>) => void;
    onNext: () => void;
    onBack: () => void;
}
```

---

### EventPolicies
**File**: `components/events/create/steps/EventPolicies.tsx`

**Props**:
```typescript
interface EventPoliciesProps {
    policies: PoliciesData;
    onChange: (policies: Partial<PoliciesData>) => void;
    onNext: () => void;
    onBack: () => void;
}
```

---

### ReviewPublish
**File**: `components/events/create/steps/ReviewPublish.tsx`

**Props**:
```typescript
interface ReviewPublishProps {
    eventData: CompleteEventData;
    onPublish: () => void;
    onBack: () => void;
}
```

---

## 4. Ticket Components

### TicketSidebar
**File**: `components/tickets/TicketSidebar.tsx`

**Props**:
```typescript
interface TicketSidebarProps {
    tickets: TicketType[];
    selectedId: string;
    onSelect: (id: string) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

interface TicketType {
    id: string;
    name: string;
    price: number;
    sold: number;
    total: number;
    status: "Active" | "Inactive";
    color?: string;
    salesStart?: string;
    salesEnd?: string;
    description?: string;
    dynamicPricing?: boolean;
    waitlist?: boolean;
    venue?: string;
    eventDate?: string;
    eventTime?: string;
}
```

---

### TicketDesigner
**File**: `components/tickets/TicketDesigner.tsx`

**Props**:
```typescript
interface TicketDesignerProps {
    data: any;
    design: any;
    updateData: (updates: any) => void;
    updateDesign: (updates: any) => void;
    onSave: () => void;
    onCancel: () => void;
}
```

---

### TicketPreview
**File**: `components/tickets/TicketPreview.tsx`

**Props**:
```typescript
interface TicketPreviewProps {
    data: {
        name: string;
        price: number;
        venue?: string;
        eventDate?: string;
        eventTime?: string;
    };
    design: {
        bgColor: string;
    };
}
```

---

### TicketEditor
**File**: `components/tickets/TicketEditor.tsx`

**Props**:
```typescript
interface TicketEditorProps {
    data: any;
    design: any;
    updateData: (updates: any) => void;
    updateDesign: (updates: any) => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    onSave: () => void;
    onCancel: () => void;
}
```

**Tabs**:
- Basic Info
- Perks & Benefits
- Access Rules
- Design

---

### TicketDistribution
**File**: `components/tickets/TicketDistribution.tsx`

**Props**: None (self-contained)

**Features**:
- Ticket assignment
- Bulk CSV upload
- Discount codes
- Transfer settings
- Batch actions

---

## 5. Booking Components

### BookingsStats
**File**: `components/bookings/BookingsStats.tsx`

**Props**:
```typescript
interface BookingsStatsProps {
    stats: {
        totalBookings: number;
        totalRevenue: number;
        averageOrderValue: number;
        conversionRate: number;
    };
}
```

---

### BookingsFilters
**File**: `components/bookings/BookingsFilters.tsx`

**Props**:
```typescript
interface BookingsFiltersProps {
    filters: FilterState;
    onChange: (filters: Partial<FilterState>) => void;
}
```

---

### BookingsTable
**File**: `components/bookings/BookingsTable.tsx`

**Props**:
```typescript
interface BookingsTableProps {
    bookings: Booking[];
    onRowClick?: (booking: Booking) => void;
    onSort?: (column: string) => void;
}
```

---

### BookingDetailsModal
**File**: `components/bookings/BookingDetailsModal.tsx`

**Props**:
```typescript
interface BookingDetailsModalProps {
    booking: Booking;
    isOpen: boolean;
    onClose: () => void;
}
```

---

### SalesIntelligenceSidebar
**File**: `components/bookings/SalesIntelligenceSidebar.tsx`

**Props**:
```typescript
interface SalesIntelligenceSidebarProps {
    insights: AIInsight[];
}
```

---

## 6. Customer Components

### CustomerList
**File**: `components/customers/CustomerList.tsx`

**Props**:
```typescript
interface CustomerListProps {
    customers: Customer[];
    onSelect: (customer: Customer) => void;
    searchQuery?: string;
}
```

---

### CustomerDetails
**File**: `components/customers/CustomerDetails.tsx`

**Props**:
```typescript
interface CustomerDetailsProps {
    customer: Customer;
    onClose: () => void;
}
```

---

## 7. Financial Components

### FinancialsMetrics
**File**: `components/financials/FinancialsMetrics.tsx`

**Props**:
```typescript
interface FinancialsMetricsProps {
    metrics: {
        totalRevenue: number;
        pendingPayouts: number;
        processingFees: number;
        netIncome: number;
    };
}
```

---

### RevenueAnalytics
**File**: `components/financials/RevenueAnalytics.tsx`

**Props**:
```typescript
interface RevenueAnalyticsProps {
    data: RevenueData[];
    period: 'day' | 'week' | 'month' | 'year';
}
```

---

### PayoutSchedule
**File**: `components/financials/PayoutSchedule.tsx`

**Props**:
```typescript
interface PayoutScheduleProps {
    payouts: Payout[];
}
```

---

### PaymentMethods
**File**: `components/financials/PaymentMethods.tsx`

**Props**:
```typescript
interface PaymentMethodsProps {
    methods: PaymentMethod[];
    onAdd: () => void;
    onRemove: (id: string) => void;
}
```

---

### TaxCompliance
**File**: `components/financials/TaxCompliance.tsx`

**Props**:
```typescript
interface TaxComplianceProps {
    taxData: TaxData;
    onExport: () => void;
}
```

---

### InvoicesSidebar
**File**: `components/financials/InvoicesSidebar.tsx`

**Props**:
```typescript
interface InvoicesSidebarProps {
    invoices: Invoice[];
    onSelect: (invoice: Invoice) => void;
}
```

---

## 8. Communication Components

### CampaignHub
**File**: `components/communications/CampaignHub.tsx`

**Props**:
```typescript
interface CampaignHubProps {
    campaigns: Campaign[];
    onCreate: () => void;
}
```

---

### CreateCampaignModal
**File**: `components/communications/CreateCampaignModal.tsx`

**Props**:
```typescript
interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (campaign: Campaign) => void;
}
```

---

### CampaignAnalytics
**File**: `components/communications/CampaignAnalytics.tsx`

**Props**:
```typescript
interface CampaignAnalyticsProps {
    campaign: Campaign;
    analytics: {
        sent: number;
        delivered: number;
        opened: number;
        clicked: number;
        converted: number;
    };
}
```

---

### ChannelList
**File**: `components/communications/ChannelList.tsx`

**Props**:
```typescript
interface ChannelListProps {
    channels: Channel[];
    onSelect: (channel: Channel) => void;
}
```

---

## 9. Branding Components

### WebsiteBuilder
**File**: `components/branding/WebsiteBuilder.tsx`

**Props**:
```typescript
interface WebsiteBuilderProps {
    initialPages?: Page[];
    onSave: (pages: Page[]) => void;
}
```

---

### BuilderCanvas
**File**: `components/branding/BuilderCanvas.tsx`

**Props**:
```typescript
interface BuilderCanvasProps {
    components: Component[];
    onUpdate: (components: Component[]) => void;
}
```

---

### ComponentLibrary
**File**: `components/branding/ComponentLibrary.tsx`

**Props**:
```typescript
interface ComponentLibraryProps {
    onDragStart: (component: ComponentType) => void;
}
```

---

### DesignPanel
**File**: `components/branding/DesignPanel.tsx`

**Props**:
```typescript
interface DesignPanelProps {
    selectedComponent?: Component;
    onUpdate: (component: Component) => void;
}
```

---

### PageManager
**File**: `components/branding/PageManager.tsx`

**Props**:
```typescript
interface PageManagerProps {
    pages: Page[];
    currentPage: string;
    onPageChange: (pageId: string) => void;
    onAddPage: () => void;
    onDeletePage: (pageId: string) => void;
}
```

---

### PreviewPanel
**File**: `components/branding/PreviewPanel.tsx`

**Props**:
```typescript
interface PreviewPanelProps {
    components: Component[];
    mode: 'desktop' | 'tablet' | 'mobile';
}
```

---

### ComponentRenderer
**File**: `components/branding/ComponentRenderer.tsx`

**Props**:
```typescript
interface ComponentRendererProps {
    component: Component;
    isEditing?: boolean;
}
```

---

## 10. Gallery Components

### GalleryHeader
**File**: `components/gallery/GalleryHeader.tsx`

**Props**:
```typescript
interface GalleryHeaderProps {
    onUpload: () => void;
    onSearch: (query: string) => void;
}
```

---

### GalleryFilters
**File**: `components/gallery/GalleryFilters.tsx`

**Props**:
```typescript
interface GalleryFiltersProps {
    filters: GalleryFilters;
    onChange: (filters: Partial<GalleryFilters>) => void;
}
```

---

### GalleryGrid
**File**: `components/gallery/GalleryGrid.tsx`

**Props**:
```typescript
interface GalleryGridProps {
    assets: Asset[];
    onSelect: (asset: Asset) => void;
}
```

---

### UploadModal
**File**: `components/gallery/UploadModal.tsx`

**Props**:
```typescript
interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (files: File[]) => void;
}
```

---

## 11. Timeline Components

### TimelineView
**File**: `components/timeline/TimelineView.tsx`

**Props**:
```typescript
interface TimelineViewProps {
    events: Event[];
    view: 'day' | 'week' | 'month';
    onEventClick: (event: Event) => void;
}
```

---

### EventCard
**File**: `components/timeline/EventCard.tsx`

**Props**:
```typescript
interface EventCardProps {
    event: Event;
    onClick: () => void;
}
```

---

## Common Patterns

### Handler Props
Most components follow this pattern for handlers:

```typescript
interface ComponentProps {
    // Data
    data: DataType;
    
    // Handlers
    onChange?: (data: Partial<DataType>) => void;
    onSave?: () => void;
    onCancel?: () => void;
    onClick?: () => void;
    
    // Optional config
    className?: string;
    disabled?: boolean;
}
```

### State Management
Components either:
1. **Controlled**: Receive data and handlers via props
2. **Uncontrolled**: Manage own state internally
3. **Hybrid**: Some state internal, some via props

### Styling Props
Most components accept:
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles

---

## Usage Examples

### Creating a Ticket
```tsx
import { TicketDesigner } from '@/components/tickets/TicketDesigner';

function MyPage() {
    const [ticketData, setTicketData] = useState({...});
    const [ticketDesign, setTicketDesign] = useState({...});
    
    return (
        <TicketDesigner
            data={ticketData}
            design={ticketDesign}
            updateData={(updates) => setTicketData({...ticketData, ...updates})}
            updateDesign={(updates) => setTicketDesign({...ticketDesign, ...updates})}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
}
```

### Using Dashboard Layout
```tsx
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function MyPage() {
    return (
        <DashboardLayout>
            <h1>My Page Content</h1>
        </DashboardLayout>
    );
}
```

---

**Last Updated**: 2025-12-10  
**Total Components**: 56+  
**Total Props Interfaces**: 50+
