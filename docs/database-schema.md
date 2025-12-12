# TickEx Database Schema & Data Flow Documentation

## Overview
This document outlines the complete database schema design and data flow for the TickEx event management platform, ensuring consistency across all components.

## Database Schema

### 1. User Model
```typescript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "organizer" | "customer",
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Event Model
```typescript
{
  _id: ObjectId,
  organizerId: ObjectId (ref: User),
  title: String,
  description: String,
  location: {
    name: String,
    address: String,
    lat: Number (optional),
    lng: Number (optional)
  },
  startDate: Date,
  endDate: Date,
  imageUrl: String,
  category: String,
  status: "draft" | "published" | "cancelled" | "completed",
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. TicketType Model (Enhanced)
```typescript
{
  _id: ObjectId,
  event: ObjectId (ref: Event),
  name: String,                    // e.g., "VIP", "General Admission"
  price: Number,
  currency: String (default: "SZL"),
  quantityTotal: Number,
  quantitySold: Number (default: 0),
  description: String (optional),
  ticketDesignUrl: String (optional), // NEW: Custom ticket design (150mm x 80mm)
  saleStart: Date (optional),
  saleEnd: Date (optional),
  limitPerUser: Number (default: 5),
  createdAt: Date,
  updatedAt: Date
}
```

**Ticket Design Specifications:**
- Dimensions: 150mm × 80mm (1500px × 800px at 254 DPI)
- Format: JPG, PNG, or WebP
- Barcode Space: Reserved on the right side (~20% of width)
- Storage: Cloudinary CDN

### 4. Order Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  eventId: ObjectId (ref: Event),
  items: [{
    ticketTypeId: ObjectId (ref: TicketType),
    quantity: Number,
    priceAtPurchase: Number,
    total: Number
  }],
  totalAmount: Number,
  currency: String (default: "SZL"),
  status: "pending" | "paid" | "failed" | "cancelled",
  stripeSessionId: String (unique, sparse),
  stripePaymentIntentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Ticket Model
```typescript
{
  _id: ObjectId,
  orderId: ObjectId (ref: Order),
  ticketTypeId: ObjectId (ref: TicketType),
  ticketCode: String (unique),     // QR code content
  status: "active" | "checked_in" | "revoked",
  attendeeName: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

### Event Creation Flow

1. **Organizer Registration/Login**
   - User creates account with role: "organizer"
   - Session stored with user ID and role

2. **Event Creation Wizard (4 Steps)**
   
   **Step 1: Event Basics**
   - Event name, category, organizer
   - Start/end dates (properly bound to state)
   - Venue/location
   
   **Step 2: Content & Branding**
   - Event description
   - Event banner image upload
   - Additional branding elements
   
   **Step 3: Ticket Setup** (Enhanced)
   - Add multiple ticket types
   - For each ticket:
     - Name, description
     - Price, quantity
     - **Custom ticket design upload** (drag-and-drop or browse)
     - Design preview with barcode space indicator
   
   **Step 4: Review & Publish**
   - Preview all event details
   - Show ticket designs in preview
   - Publish to database

3. **Server Action: createEvent**
   ```typescript
   // Receives FormData with:
   - Event details (title, description, dates, location, category)
   - Event banner image (File)
   - Tickets JSON string
   - Ticket design files (ticketDesign_0, ticketDesign_1, etc.)
   
   // Process:
   1. Upload event banner to Cloudinary → imageUrl
   2. Create Event document
   3. For each ticket:
      - Upload ticket design to Cloudinary (if provided) → ticketDesignUrl
      - Create TicketType document with design URL
   4. Revalidate paths: /dashboard, /events, / (landing page)
   5. Return success with eventId
   ```

4. **Database Updates**
   - Event created with status: "published"
   - TicketTypes created and linked to event
   - Ticket designs stored in Cloudinary

### Dashboard Data Flow

1. **Empty State (No Events)**
   - `getDashboardMetrics(userId)` returns all zeros
   - Dashboard shows `EmptyStateDashboard` component
   - Big "Create Your First Event" button

2. **With Events**
   - `getDashboardMetrics(userId)` aggregates:
     - Total revenue (from paid orders)
     - Total orders
     - Tickets sold (sum of quantitySold across all ticket types)
     - Active events count
   - Dashboard shows metrics, timeline, and forecast

### Landing Page Data Flow

1. **Public Events Fetch**
   ```typescript
   getPublicEvents() {
     // Fetch published events with startDate >= today
     // For each event:
       - Get minimum ticket price
       - Format event data
       - Include imageUrl and ticket info
     // Return featured and trending events
   }
   ```

2. **Event Display**
   - Events shown with image, title, date, venue, price
   - Click → Event Details Page

3. **Event Details Page**
   ```typescript
   getEventById(id) {
     // Fetch event with all details
     // Fetch all ticket types for event
     // Include:
       - Ticket names, prices, descriptions
       - Ticket designs (ticketDesignUrl)
       - Remaining quantity
     // Return complete event object
   }
   ```

### Ticket Purchase Flow

1. **Customer selects tickets**
   - Choose ticket types and quantities
   - See ticket designs (if custom design exists)

2. **Checkout**
   - Create Order (status: "pending")
   - Create Stripe checkout session
   - Redirect to Stripe

3. **Payment Success (Webhook)**
   - Update Order status to "paid"
   - Update TicketType.quantitySold
   - Generate individual Ticket documents with unique codes
   - Send email with tickets (showing custom design + barcode)

## Data Consistency Rules

### 1. Event-Ticket Relationship
- All TicketTypes must reference a valid Event
- When Event is deleted, cascade delete all TicketTypes
- TicketType.quantitySold must never exceed quantityTotal

### 2. Order-Ticket Relationship
- Order.items[].ticketTypeId must reference valid TicketTypes
- Order.totalAmount = sum of all items[].total
- When Order is paid, create individual Ticket documents

### 3. Dashboard Metrics
- Revenue = sum of Orders where status = "paid"
- Orders = count of Orders where status = "paid"
- Tickets Sold = sum of TicketType.quantitySold for organizer's events
- Active Events = count of Events where organizerId = userId

### 4. Landing Page Data
- Only show Events where status = "published"
- Only show Events where startDate >= today
- Price shown = minimum price from all TicketTypes for that event

## Component Data Sources

| Component | Data Source | Fields Used |
|-----------|-------------|-------------|
| Dashboard | `getDashboardMetrics(userId)` | revenue, orders, ticketsSold, activeEvents |
| EmptyStateDashboard | Shown when activeEvents === 0 | - |
| MetricGrid | Dashboard metrics | All metrics |
| TimelineSection | Mock data (to be implemented) | - |
| PredictiveForecast | Mock data (to be implemented) | - |
| LandingPageClient | `getPublicEvents()` | featured, trending events |
| EventDetailsClient | `getEventById(id)` | Full event + tickets |
| EventsGrid | `getPublicEvents()` | Event list |
| BookingsTable | `getRecentBookings(userId)` | Recent orders |

## File Upload Flow

### Event Banner
1. User uploads in EventBranding step
2. Stored in FormData as `imageFile`
3. Uploaded to Cloudinary in `createEvent` action
4. URL stored in Event.imageUrl

### Ticket Design
1. User uploads in TicketSetup step (drag-and-drop or browse)
2. Preview shown immediately (base64)
3. File stored in ticket object as `designFile`
4. Uploaded to Cloudinary in `createEvent` action
5. URL stored in TicketType.ticketDesignUrl
6. Used when generating ticket PDFs/emails

## Validation Rules

### Event Creation
- Title: Required, max 100 characters
- Description: Required
- Start Date: Required, must be future date
- End Date: Required, must be after start date
- Location: Required
- Category: Required
- At least 1 ticket type required

### Ticket Type
- Name: Required
- Price: Required, >= 0
- Quantity: Required, >= 1
- Design: Optional, must be image file, recommended 1500×800px

## Future Enhancements

1. **Real-time Updates**
   - WebSocket for live ticket availability
   - Real-time dashboard metrics

2. **Advanced Analytics**
   - Sales trends over time
   - Popular ticket types
   - Customer demographics

3. **Ticket Design Templates**
   - Pre-made templates for quick setup
   - Template marketplace

4. **QR Code Generation**
   - Generate unique QR codes for each ticket
   - Embed in ticket design at purchase time

5. **Check-in System**
   - Scan QR codes at event entrance
   - Update Ticket.status to "checked_in"
   - Real-time attendance tracking
