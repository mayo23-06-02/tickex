# Customer Ticket Purchase Flow Documentation

## Overview
Complete end-to-end ticket purchasing system with quick registration, verification, checkout, and order management.

---

## User Journey

### 1. Browse Events (Landing Page)
**Location:** `/` (Landing Page)

**Features:**
- Browse featured events
- View event categories
- Search for events
- Filter by city
- See trending events

**Navigation:**
- "My Orders" link in header
- "Dashboard" link for organizers
- Sign In / Sign Up options

---

### 2. Event Details
**Location:** `/events/[id]`

**Features:**
- View full event information
- See all ticket types with prices
- Select ticket quantities
- View remaining tickets
- See custom ticket designs (if uploaded by organizer)

**User Actions:**
- Increment/decrement ticket quantities
- Click "Get Tickets" to proceed to checkout

**Flow:**
```
Event Page → Select Tickets → Click "Get Tickets" → Redirect to Checkout
```

---

### 3. Quick Registration & Checkout
**Location:** `/checkout?eventId=xxx&tickets=xxx`

**Step 1: Choose Registration Method**

User selects how to register:
- **Email Address** - Get verification code via email
- **Phone Number** - Get verification code via SMS

**Step 2: Enter Details**

User provides:
- Full Name
- Email or Phone (based on selection)

System:
- Generates 6-digit verification code
- Sends code via email/SMS
- Displays code in demo mode for testing

**Step 3: Verify Code**

User:
- Enters 6-digit code
- Can resend code if needed

System:
- Validates code
- Creates user account
- Proceeds to payment

---

### 4. Payment
**Location:** `/checkout` (after verification)

**Payment Methods:**

1. **Credit/Debit Card**
   - Card Number
   - Expiry Date (MM/YY)
   - CVV

2. **Mobile Money**
   - MTN Mobile Money
   - Eswatini Mobile
   - Mobile Number input

**Order Summary Sidebar:**
- Event title
- Ticket types and quantities
- Individual prices
- Total amount
- Confirmation message

**Payment Process:**
```
Select Payment Method → Enter Details → Click "Pay" → Processing → Success → Redirect to My Orders
```

---

### 5. My Orders Page
**Location:** `/my-orders`

**Features:**

**Order List:**
- Event image
- Event title and details
- Purchase date
- Order status (Confirmed, Pending, Cancelled)
- Ticket breakdown
- Total amount paid

**Order Actions:**
- **View Tickets** - Opens QR code modal
- **Download PDF** - Downloads ticket PDF
- **Payment Reminder** - For pending orders

**QR Code Modal:**
- Event details
- QR code for check-in
- Ticket type breakdown
- Order ID
- Close button

**Empty State:**
- Displayed when no orders exist
- "Browse Events" CTA button
- Friendly messaging

---

## Component Architecture

### Client Components

1. **QuickRegister.tsx**
   ```
   components/checkout/QuickRegister.tsx
   ```
   - Three-step registration flow
   - Email/Phone selection
   - Verification code input
   - Demo mode with visible code

2. **CheckoutPageClient.tsx**
   ```
   components/checkout/CheckoutPageClient.tsx
   ```
   - Payment method selection
   - Card/Mobile money forms
   - Order summary
   - Payment processing

3. **MyOrdersClient.tsx**
   ```
   components/orders/MyOrdersClient.tsx
   ```
   - Order list display
   - QR code modal
   - Status badges
   - Action buttons

4. **EventDetailsClient.tsx** (Updated)
   ```
   components/events/EventDetailsClient.tsx
   ```
   - Ticket selection
   - Quantity controls
   - Checkout redirect

### Server Components

1. **Checkout Page**
   ```
   app/checkout/page.tsx
   ```
   - Parses URL parameters
   - Fetches event data
   - Validates ticket selection
   - Passes data to client component

2. **My Orders Page**
   ```
   app/my-orders/page.tsx
   ```
   - Authentication check (optional)
   - Renders client component

---

## Data Flow

### Checkout Flow

```
Event Details Page
  ↓ (User selects tickets)
selectedTickets = { ticketId: quantity, ... }
  ↓ (Click "Get Tickets")
Encode tickets as URL parameter
  ↓
/checkout?eventId=xxx&tickets=encoded_json
  ↓
Server Component:
  - Decode tickets
  - Fetch event data
  - Build checkout items
  - Calculate total
  ↓
Client Component:
  - Show registration if no user
  - Show payment if user exists
  ↓
Quick Registration:
  - Select method (email/phone)
  - Enter details
  - Verify code
  - Create user account
  ↓
Payment:
  - Select payment method
  - Enter payment details
  - Process payment
  - Create order
  ↓
Redirect to /my-orders
```

### Order Display Flow

```
My Orders Page
  ↓
Fetch user's orders from database
  ↓
Display order cards with:
  - Event info
  - Ticket details
  - Status
  - Actions
  ↓
User clicks "View Tickets"
  ↓
Show QR Code Modal
  - Display QR for check-in
  - Show ticket details
  - Order information
```

---

## Mock Data Structure

### Order Object

```typescript
interface Order {
  id: string;                    // Unique order ID
  eventTitle: string;            // Event name
  eventDate: string;             // ISO date string
  eventLocation: string;         // Venue name
  eventImage?: string;           // Event banner URL
  tickets: {
    id: string;                  // Ticket ID
    type: string;                // Ticket type name
    quantity: number;            // Number of tickets
    price: number;               // Price per ticket
  }[];
  totalAmount: number;           // Total order cost
  status: 'confirmed' | 'pending' | 'cancelled';
  purchaseDate: string;          // ISO date string
  qrCode?: string;               // QR code data
}
```

---

## User Experience Features

### Quick Registration

**Benefits:**
- ✅ No lengthy forms
- ✅ Email or phone verification
- ✅ Fast checkout process
- ✅ Secure verification

**Demo Mode:**
- Verification code shown in UI
- No actual SMS/email sent
- Instant verification for testing

### Payment Options

**Card Payment:**
- Standard credit/debit cards
- Visa, Mastercard, Amex
- Secure input fields

**Mobile Money:**
- MTN Mobile Money
- Eswatini Mobile
- Local payment preference

### Order Management

**Status Indicators:**
- 🟢 **Confirmed** - Payment successful, tickets ready
- 🟡 **Pending** - Awaiting payment completion
- 🔴 **Cancelled** - Order cancelled

**Actions:**
- View QR codes for entry
- Download PDF tickets
- Share tickets
- Request refund (future)

---

## Branding Compliance

### Colors

**Primary:**
- Success Green: `#1DB954` (buttons, CTAs)
- Dark: `#0f172a` (text, headers)

**Status Colors:**
- Confirmed: Green (`bg-green-50`, `text-green-700`)
- Pending: Yellow (`bg-yellow-50`, `text-yellow-700`)
- Cancelled: Red (`bg-red-50`, `text-red-700`)

### Typography

- **Headers:** Bold, black weight
- **Body:** Medium weight, slate colors
- **CTAs:** Bold, white text on green

### Components

- **Cards:** Rounded-2xl, shadow-lg
- **Buttons:** Rounded-xl, shadow effects
- **Inputs:** Rounded-xl, focus rings
- **Modals:** Rounded-2xl, backdrop blur

---

## Future Enhancements

### Phase 1: Real Integration

1. **SMS/Email Service**
   - Integrate Twilio for SMS
   - Integrate SendGrid for email
   - Real verification codes

2. **Payment Gateway**
   - Stripe integration
   - Mobile money API
   - Payment webhooks

3. **Database Integration**
   - Save orders to MongoDB
   - Link to user accounts
   - Track order history

### Phase 2: Advanced Features

1. **Ticket Delivery**
   - Email tickets with QR codes
   - SMS ticket links
   - PDF generation

2. **Order Management**
   - Cancel orders
   - Request refunds
   - Transfer tickets
   - Add to calendar

3. **QR Code System**
   - Generate unique QR codes
   - Check-in scanning
   - Prevent duplicate entry
   - Real-time validation

### Phase 3: Enhanced UX

1. **Guest Checkout**
   - Buy without account
   - Email ticket delivery
   - Optional account creation

2. **Social Login**
   - Google Sign-In
   - Facebook Login
   - Apple Sign-In

3. **Saved Payment Methods**
   - Store cards securely
   - One-click checkout
   - Auto-fill details

---

## Testing Guide

### Test Flow 1: Complete Purchase

1. Go to landing page (`/`)
2. Click on any featured event
3. Select ticket quantities
4. Click "Get Tickets"
5. Choose email or phone registration
6. Enter name and contact
7. Copy the demo verification code shown
8. Paste code and verify
9. Select payment method
10. Fill payment details
11. Click "Pay"
12. Redirected to My Orders
13. See new order with "Confirmed" status

### Test Flow 2: View Orders

1. Navigate to `/my-orders`
2. See list of orders
3. Click "View Tickets" on any order
4. See QR code modal
5. Verify ticket details
6. Close modal
7. Click "Download PDF" (future feature)

### Test Flow 3: Empty State

1. Clear browser data or use incognito
2. Navigate to `/my-orders`
3. See empty state message
4. Click "Browse Events"
5. Redirected to landing page

---

## API Endpoints (Future)

### Authentication
```
POST /api/auth/send-code
POST /api/auth/verify-code
POST /api/auth/register
```

### Orders
```
GET /api/orders              # Get user's orders
GET /api/orders/:id          # Get specific order
POST /api/orders             # Create new order
PATCH /api/orders/:id        # Update order status
DELETE /api/orders/:id       # Cancel order
```

### Payments
```
POST /api/payments/create-intent
POST /api/payments/confirm
POST /api/payments/webhook
```

### Tickets
```
GET /api/tickets/:orderId    # Get tickets for order
GET /api/tickets/:id/qr      # Get QR code
POST /api/tickets/validate   # Validate at check-in
```

---

## Security Considerations

### Verification Codes
- 6-digit random codes
- Expire after 10 minutes
- Rate limiting (max 3 attempts)
- One-time use only

### Payment Data
- Never store card details
- Use payment gateway tokens
- PCI DSS compliance
- HTTPS only

### QR Codes
- Unique per ticket
- Encrypted data
- Time-based validation
- Prevent screenshots (future)

---

## Accessibility

### Keyboard Navigation
- All interactive elements tabbable
- Clear focus states
- Logical tab order

### Screen Readers
- ARIA labels on icons
- Descriptive button text
- Status announcements

### Visual
- High contrast text
- Large touch targets (44px min)
- Clear error messages
- Loading indicators

---

## Performance

### Optimizations
- Code splitting by route
- Lazy load modals
- Optimized images
- Minimal dependencies

### Loading States
- Skeleton screens
- Spinners for actions
- Progress indicators
- Smooth transitions

---

## Summary

The complete customer purchase flow includes:

✅ **Event browsing** on landing page
✅ **Ticket selection** on event details
✅ **Quick registration** with email/phone
✅ **Verification** with 6-digit code
✅ **Payment** with card or mobile money
✅ **Order management** with QR codes
✅ **Responsive design** for all devices
✅ **Branding compliance** throughout
✅ **Accessibility** features
✅ **Demo mode** for testing

All components follow the TickEx design system and provide a seamless, professional user experience from discovery to ticket delivery.

---

**Last Updated:** December 12, 2025  
**Version:** 1.0  
**Status:** Demo Ready ✅
