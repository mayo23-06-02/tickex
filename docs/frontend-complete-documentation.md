# Frontend Components Documentation - Complete Web App

**Date**: 2025-12-10  
**Status**: COMPREHENSIVE  
**Module**: All Frontend Components

---

## 1. Application Overview

TickEx is a comprehensive event management platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The application provides event organizers with tools to create events, manage tickets, track sales, communicate with attendees, and analyze performance.

### Tech Stack
- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12.23.25
- **Icons**: Lucide React 0.555.0
- **Notifications**: Sonner
- **Language**: TypeScript 5

---

## 2. Application Structure

```
tickex/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard (Main)
│   ├── landing/                  # Public landing page
│   ├── events/                   # Events management
│   │   └── create/              # Event creation wizard
│   ├── tickets/                  # Ticket designer & management
│   ├── bookings/                 # Bookings & sales tracking
│   ├── customers/                # Customer management
│   ├── financials/               # Financial analytics
│   ├── communications/           # Campaign management
│   ├── branding/                 # Website builder
│   ├── gallery/                  # Media gallery
│   └── event-timeline/           # Event timeline view
│
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   ├── dashboard/                # Dashboard widgets
│   ├── events/                   # Event components
│   ├── tickets/                  # Ticket components
│   ├── bookings/                 # Booking components
│   ├── customers/                # Customer components
│   ├── financials/               # Financial components
│   ├── communications/           # Communication components
│   ├── branding/                 # Branding/builder components
│   ├── gallery/                  # Gallery components
│   ├── timeline/                 # Timeline components
│   └── ui/                       # Generic UI components
│
└── docs/                         # Documentation
```

---

## 3. Pages & Routes

### 3.1 Dashboard (`/`)
**File**: `app/page.tsx`

**Purpose**: Main dashboard with metrics, analytics, and quick actions

**Features**:
- Metric cards (Total Sales, Tickets Sold, Real-time Sales, Demographics)
- Predictive forecast chart
- Timeline of upcoming events
- Quick action buttons

**Components Used**:
- `MetricGrid`
- `PredictiveForecast`
- `TimelineSection`
- Individual metric cards

---

### 3.2 Landing Page (`/landing`)
**File**: `app/landing/page.tsx`

**Purpose**: Public-facing landing page for event discovery

**Features**:
- Animated SVG wave background
- Category browsing (Movies, Stand-up, Musical, Theater, Exhibitions)
- Featured events grid
- Trending events section
- Search functionality
- City selector
- Bookmark & share events
- CTA for organizers

**Interactive Elements**:
- Search bar with form submission
- Category cards with click handlers
- Event cards with bookmark/share buttons
- Buy ticket buttons
- Trending event cards
- City selector dropdown

**State Management**:
- Search query
- Selected city
- Bookmarked events array

**Animations**:
- Wave background (20s & 15s cycles)
- Hover effects on all cards
- Scale transformations
- Shadow transitions

---

### 3.3 Events Page (`/events`)
**File**: `app/events/page.tsx`

**Purpose**: Browse and manage all events

**Components**:
- `EventsHeader` - Search, filters, create button
- Event cards grid
- Status indicators
- Quick actions

---

### 3.4 Event Creation (`/events/create`)
**File**: `app/events/create/page.tsx`

**Purpose**: Multi-step wizard for creating new events

**Steps**:
1. **Event Basics** (`EventBasics.tsx`)
   - Event name, description
   - Date & time
   - Venue/location
   - Category selection

2. **Ticket Setup** (`TicketSetup.tsx`)
   - Ticket types
   - Pricing
   - Quantity
   - Sales period

3. **Event Branding** (`EventBranding.tsx`)
   - Event poster/banner
   - Color scheme
   - Logo upload
   - Custom styling

4. **Event Policies** (`EventPolicies.tsx`)
   - Refund policy
   - Age restrictions
   - Terms & conditions
   - Accessibility info

5. **Review & Publish** (`ReviewPublish.tsx`)
   - Summary of all details
   - Preview
   - Publish button

**Component**: `CreateEventWizard.tsx` - Manages wizard state and navigation

---

### 3.5 Tickets Page (`/tickets`)
**File**: `app/tickets/page.tsx`

**Purpose**: Design and manage ticket types

**Layout**: 3-column layout
- Left: Ticket list sidebar
- Center: Designer with live preview
- Right: Distribution tools

**Features**:
- CRUD operations for tickets
- Live ticket preview
- Tabbed editor (Basic Info, Perks, Access Rules, Design)
- Search & filter tickets
- Ticket assignment
- Bulk CSV upload
- Discount codes
- Transfer settings

**Components**:
- `TicketSidebar` - List, search, create/delete
- `TicketDesigner` - Container for preview & editor
- `TicketPreview` - Live preview with dynamic data
- `TicketEditor` - 4-tab editor interface
- `TicketDistribution` - Assignment & distribution tools

**State Management**:
- Centralized in page component
- Tickets array
- Selected ticket ID
- Ticket data (editing state)
- Ticket design
- Search query

**See**: `frontend-tickets-page-implementation.md` for detailed documentation

---

### 3.6 Bookings Page (`/bookings`)
**File**: `app/bookings/page.tsx`

**Purpose**: View and manage all ticket bookings

**Features**:
- Bookings table with sorting/filtering
- Sales statistics
- Booking details modal
- Sales intelligence sidebar
- Export functionality

**Components**:
- `BookingsStats` - Key metrics
- `BookingsFilters` - Filter controls
- `BookingsTable` - Data table
- `BookingDetailsModal` - Detailed view
- `SalesIntelligenceSidebar` - AI insights

---

### 3.7 Customers Page (`/customers`)
**File**: `app/customers/page.tsx`

**Purpose**: Customer relationship management

**Features**:
- Customer list with search
- Customer profiles
- Purchase history
- Segmentation
- Communication history

**Components**:
- `CustomerList` - Searchable list
- `CustomerDetails` - Profile view

---

### 3.8 Financials Page (`/financials`)
**File**: `app/financials/page.tsx`

**Purpose**: Financial analytics and management

**Features**:
- Revenue analytics
- Payout schedule
- Payment methods
- Tax compliance
- Invoice management
- Financial metrics

**Components**:
- `FinancialsMetrics` - Key financial KPIs
- `RevenueAnalytics` - Charts & graphs
- `PayoutSchedule` - Upcoming payouts
- `PaymentMethods` - Payment gateway config
- `TaxCompliance` - Tax reporting
- `InvoicesSidebar` - Invoice list

---

### 3.9 Communications Page (`/communications`)
**File**: `app/communications/page.tsx`

**Purpose**: Marketing campaign management

**Features**:
- Campaign creation
- Email/SMS campaigns
- Campaign analytics
- Audience segmentation
- Template library

**Components**:
- `CampaignHub` - Main interface
- `CreateCampaignModal` - Campaign builder
- `CampaignAnalytics` - Performance metrics
- `ChannelList` - Communication channels

---

### 3.10 Branding/Website Builder (`/branding`)
**File**: `app/branding/page.tsx`

**Purpose**: Build custom event microsites

**Features**:
- Drag-and-drop builder
- Component library
- Live preview
- Page management
- Design customization
- Responsive preview

**Components**:
- `WebsiteBuilder` - Main container
- `BuilderCanvas` - Drag-drop canvas
- `ComponentLibrary` - Available components
- `DesignPanel` - Styling controls
- `PageManager` - Page navigation
- `PreviewPanel` - Live preview
- `ComponentRenderer` - Renders components

---

### 3.11 Gallery Page (`/gallery`)
**File**: `app/gallery/page.tsx`

**Purpose**: Media asset management

**Features**:
- Image/video upload
- Gallery grid view
- Filters & search
- Asset organization
- Usage tracking

**Components**:
- `GalleryHeader` - Actions & search
- `GalleryFilters` - Filter controls
- `GalleryGrid` - Asset grid
- `UploadModal` - Upload interface

---

### 3.12 Event Timeline (`/event-timeline`)
**File**: `app/event-timeline/page.tsx`

**Purpose**: Visual timeline of all events

**Features**:
- Calendar view
- Timeline visualization
- Event scheduling
- Conflict detection

---

## 4. Layout Components

### 4.1 DashboardLayout
**File**: `components/layout/DashboardLayout.tsx`

**Purpose**: Main layout wrapper for all dashboard pages

**Features**:
- Sidebar navigation
- Header with user menu
- Responsive design
- Consistent spacing

**Components**:
- `Sidebar` - Navigation menu
- `Header` - Top bar with actions

---

### 4.2 Sidebar
**File**: `components/layout/Sidebar.tsx`

**Purpose**: Main navigation sidebar

**Navigation Items**:
- Dashboard
- Events
- Tickets
- Bookings
- Customers
- Financials
- Communications
- Branding
- Gallery
- Timeline

**Features**:
- Active route highlighting
- Icons for each section
- Collapsible (future)

---

### 4.3 Header
**File**: `components/layout/Header.tsx`

**Purpose**: Top header bar

**Features**:
- Page title
- Search (global)
- Notifications
- User profile menu
- Quick actions

---

## 5. Dashboard Components

### 5.1 MetricGrid
**File**: `components/dashboard/MetricGrid.tsx`

**Purpose**: Grid of metric cards on dashboard

**Metrics Displayed**:
- Total Sales
- Tickets Sold
- Real-time Sales
- Demographics

---

### 5.2 Individual Metric Cards

#### TotalSalesMetric
**File**: `components/dashboard/metrics/TotalSalesMetric.tsx`
- Displays total revenue
- Trend indicator
- Comparison to previous period

#### TicketsSoldMetric
**File**: `components/dashboard/metrics/TicketsSoldMetric.tsx`
- Total tickets sold
- Breakdown by type
- Sales velocity

#### RealTimeSalesMetric
**File**: `components/dashboard/metrics/RealTimeSalesMetric.tsx`
- Live sales updates
- Recent transactions
- Sales rate

#### DemographicsMetric
**File**: `components/dashboard/metrics/DemographicsMetric.tsx`
- Audience breakdown
- Age groups
- Geographic distribution

---

### 5.3 PredictiveForecast
**File**: `components/dashboard/PredictiveForecast.tsx`

**Purpose**: AI-powered sales forecast

**Features**:
- Chart visualization
- Predicted vs actual
- Confidence intervals
- Trend analysis

---

### 5.4 TimelineSection
**File**: `components/dashboard/TimelineSection.tsx`

**Purpose**: Upcoming events timeline

**Features**:
- Chronological event list
- Quick event details
- Status indicators
- Quick actions

---

## 6. Design System

### 6.1 Color Palette

**Primary Colors**:
- Green: `#1DB954` (Spotify-inspired)
- Green Hover: `#1ed760`

**Neutrals**:
- Dark: `#0f172a`
- Medium: `#64748b`
- Light: `#94a3b8`
- Border: `#e2e8f0`
- Background: `#f8fafc`

**Semantic Colors**:
- Success: `#10b981`
- Error: `#ef4444`
- Warning: `#f59e0b`
- Info: `#3b82f6`

---

### 6.2 Typography

**Font Family**: System fonts (Geist Sans, Geist Mono)

**Font Sizes**:
- Headings: `text-4xl`, `text-3xl`, `text-2xl`, `text-xl`
- Body: `text-base`, `text-sm`, `text-xs`
- Display: `text-6xl`, `text-5xl`

**Font Weights**:
- Black: `font-black` (900)
- Bold: `font-bold` (700)
- Semibold: `font-semibold` (600)
- Medium: `font-medium` (500)
- Normal: `font-normal` (400)

---

### 6.3 Spacing & Layout

**Container**: `max-w-7xl mx-auto px-6`

**Common Gaps**:
- Small: `gap-2`, `gap-3`, `gap-4`
- Medium: `gap-6`, `gap-8`
- Large: `gap-12`, `gap-16`

**Padding**:
- Cards: `p-6`, `p-8`
- Buttons: `px-6 py-2.5`, `px-4 py-2`

---

### 6.4 Border Radius

- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- Extra Large: `rounded-3xl` (24px)
- Full: `rounded-full`

---

### 6.5 Shadows

- Small: `shadow-sm`
- Medium: `shadow-md`, `shadow-lg`
- Large: `shadow-xl`, `shadow-2xl`
- Colored: `shadow-green-200`, `shadow-green-300`

---

### 6.6 Transitions

**Standard**: `transition-all`, `transition-colors`, `transition-transform`

**Durations**: `duration-200`, `duration-300`

**Hover Effects**:
- Scale: `hover:scale-105`, `hover:scale-110`
- Color: `hover:bg-[#1ed760]`, `hover:text-[#1DB954]`
- Shadow: `hover:shadow-lg`, `hover:shadow-2xl`

---

## 7. Common Patterns

### 7.1 Button Styles

**Primary Button**:
```tsx
className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-200 hover:shadow-green-300"
```

**Secondary Button**:
```tsx
className="px-6 py-2.5 bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#0f172a] font-medium rounded-lg transition-colors"
```

**Danger Button**:
```tsx
className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
```

---

### 7.2 Card Styles

**Standard Card**:
```tsx
className="bg-white rounded-2xl p-6 shadow-lg border border-[#e2e8f0]"
```

**Hover Card**:
```tsx
className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
```

---

### 7.3 Input Styles

**Text Input**:
```tsx
className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
```

---

### 7.4 Toast Notifications

Using Sonner library:

```tsx
import { toast } from "sonner";

// Success
toast.success("Action completed!");

// Error
toast.error("Something went wrong");

// Info
toast.info("Information message");

// Promise-based
toast.promise(
    asyncFunction(),
    {
        loading: 'Processing...',
        success: 'Done!',
        error: 'Failed'
    }
);
```

---

## 8. State Management Patterns

### 8.1 Local State (useState)
Used for component-specific state:
- Form inputs
- Modal visibility
- Selected items
- UI toggles

### 8.2 Centralized Page State
Parent components manage state for child components:
- Tickets page manages all ticket data
- Events page manages event list
- Bookings page manages booking filters

### 8.3 Props Drilling
Data passed down through component hierarchy:
- Handlers passed to child components
- Data flows down, events flow up

---

## 9. Data Flow Examples

### 9.1 Tickets Page Flow

```
TicketsPage (State Container)
├── tickets: TicketType[]
├── selectedId: string
├── ticketData: any
├── ticketDesign: any
└── handlers: functions
    │
    ├─→ TicketSidebar
    │   ├── Receives: tickets, selectedId, handlers
    │   └── Emits: onSelect, onCreate, onDelete
    │
    ├─→ TicketDesigner
    │   ├── Receives: data, design, handlers
    │   ├─→ TicketPreview (displays data)
    │   └─→ TicketEditor (edits data)
    │
    └─→ TicketDistribution
        └── Independent actions
```

---

## 10. API Integration Points (Future)

### 10.1 Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### 10.2 Tickets
- `GET /api/events/:id/tickets` - List tickets
- `POST /api/events/:id/tickets` - Create ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### 10.3 Bookings
- `GET /api/bookings` - List bookings
- `GET /api/bookings/:id` - Booking details
- `POST /api/bookings` - Create booking

### 10.4 Customers
- `GET /api/customers` - List customers
- `GET /api/customers/:id` - Customer details

### 10.5 Analytics
- `GET /api/analytics/sales` - Sales data
- `GET /api/analytics/forecast` - Predictions

---

## 11. Performance Optimizations

### 11.1 Current
- CSS-based animations (hardware accelerated)
- Conditional rendering
- Event delegation
- Debounced search (future)

### 11.2 Recommended
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Virtual scrolling for long lists
- Image optimization with Next.js Image
- Code splitting by route
- Lazy loading for modals

---

## 12. Accessibility

### 12.1 Current Implementation
- Semantic HTML elements
- Keyboard navigation support
- Focus indicators
- ARIA labels where needed

### 12.2 Improvements Needed
- Screen reader announcements
- Keyboard shortcuts
- High contrast mode
- Focus management in modals
- Skip navigation links

---

## 13. Testing Strategy

### 13.1 Unit Tests
- Component rendering
- Handler functions
- State updates
- Utility functions

### 13.2 Integration Tests
- Component interactions
- Props passing
- Event handling
- State synchronization

### 13.3 E2E Tests
- Complete user flows
- Event creation
- Ticket purchase
- Booking management

---

## 14. Deployment Considerations

### 14.1 Environment Variables
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
DATABASE_URL=
```

### 14.2 Build Optimization
- Production build: `npm run build`
- Static optimization enabled
- Image optimization
- Font optimization

---

## 15. Future Enhancements

### 15.1 Features
- Real-time collaboration
- Mobile app (React Native)
- Advanced analytics
- AI-powered insights
- Multi-language support
- Dark mode
- Offline support (PWA)

### 15.2 Technical
- GraphQL API
- WebSocket for real-time updates
- Redis caching
- CDN integration
- Advanced error tracking
- Performance monitoring

---

## 16. Component Inventory

**Total Pages**: 13
**Total Components**: 56+
**Total Lines of Code**: ~15,000+

### By Category:
- Layout: 3 components
- Dashboard: 8 components
- Events: 7 components
- Tickets: 5 components
- Bookings: 5 components
- Customers: 2 components
- Financials: 6 components
- Communications: 4 components
- Branding: 7 components
- Gallery: 4 components
- Timeline: 2 components
- UI: 3+ components

---

## 17. Key Files Reference

| File | Purpose | Lines |
|------|---------|-------|
| `app/page.tsx` | Dashboard | ~200 |
| `app/landing/page.tsx` | Landing page | ~500 |
| `app/tickets/page.tsx` | Tickets management | ~220 |
| `app/events/create/page.tsx` | Event wizard | ~300 |
| `components/layout/DashboardLayout.tsx` | Main layout | ~150 |
| `components/tickets/TicketEditor.tsx` | Ticket editor | ~350 |
| `components/branding/WebsiteBuilder.tsx` | Site builder | ~400 |

---

## 18. Documentation Files

1. `frontend-tickets-page-implementation.md` - Tickets page detailed docs
2. `backend-event-creation-audit.md` - Event creation API specs
3. `backend-tickets-management-audit.md` - Tickets API specs
4. `backend-bookings-audit.md` - Bookings API specs
5. `backend-financials-audit.md` - Financials API specs
6. `backend-dashboard-audit.md` - Dashboard API specs
7. `backend-identity-audit.md` - Auth API specs

---

## 19. Quick Start Guide

### For Developers

1. **Clone & Install**:
   ```bash
   git clone <repo>
   cd tickex
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access**:
   - Dashboard: `http://localhost:3000`
   - Landing: `http://localhost:3000/landing`

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 20. Support & Maintenance

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Git Workflow
- Feature branches
- Pull request reviews
- Semantic commit messages
- Version tagging

---

**Last Updated**: 2025-12-10  
**Maintained By**: Development Team  
**Version**: 1.0.0
