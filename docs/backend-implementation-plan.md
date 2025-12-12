# Backend Implementation Plan: TickEx

This document outlines the architectural plan and implementation strategy for the TickEx backend, replacing the current frontend-only mockups with a robust, scalable server infrastructure.

## 1. Technology Stack

- **Framework**: Next.js App Router (Integrated API Routes & Server Actions)
  - *Why*: Keeps the codebase unified (monorepo feel), leverages Vercel/similar hosting easily, and type-safety is shared between front and back.
- **Database**: MongoDB (Atlas) with `mongoose` ODM.
  - *Why*: Flexible schema for variable event data, excellent JSON support, and fast read performance.
- **Authentication**: NextAuth.js (v5) / Auth.js
  - *Why*: Open source, supports multiple providers (Google, Email), and easy to extend.
- **Payments**: Stripe Connect & Stripe Checkout.
  - *Why*: Industry standard. "Connect" is crucial for a marketplace where we (platform) payout to organizers (users).
- **Media**: Cloudinary.
  - *Why*: Best-in-class image optimization and transformation API.
- **Communications**:
  - **Email**: Resend (modern, developer-friendly) or SendGrid.
  - **Messaging**: Meta API (WhatsApp Business) for tickets/notifications.

## 2. Architecture Overview

### A. Folder Structure
The backend logic will live primarily in `lib/` (models, services) and `app/api/` (public endpoints).

```
tickex/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth Handler
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts          # Payment events
│   │   │   └── meta/route.ts            # WhatsApp status
│   │   └── v1/                          # External API (Mobile App?)
│   ├── actions/                         # Server Actions (Mutations)
│   │   ├── events.ts
│   │   ├── bookings.ts
│   │   └── payments.ts
├── lib/
│   ├── db/
│   │   ├── connect.ts                   # Mongoose connection
│   │   └── models/
│   │       ├── User.ts
│   │       ├── Event.ts
│   │       ├── Ticket.ts
│   │       ├── Order.ts
│   │       └── Transaction.ts
│   ├── services/
│   │   ├── stripe.ts                    # Stripe SDK wrapper
│   │   ├── cloudinary.ts                # Image upload helper
│   │   └── email.ts                     # Email templates & sending
```

## 3. Core Modules & Data Models

### 1. Authentication & Users (`User`)
- **Roles**: `admin` (Platform), `organizer` (Host), `customer` (Attendee).
- **Fields**: email, password_hash, name, role, stripe_account_id (for organizers).
- **Strategy**: JWT sessions.

### 2. Events Management (`Event`)
- **Fields**: title, slug, organizer_id (ref User), dates, location (geo + address), media (images/videos), status (draft/published), settings (currency, taxes).

### 3. Inventory (`TicketType`)
- Linked to Event.
- **Fields**: name, price, quantity_total, quantity_sold, limits (per user), sales_start/end.

### 4. Commerce (`Order` & `Ticket`)
- **Order**: Represents the transaction.
  - Fields: user_id, event_id, total_amount, status (pending/paid/failed), stripe_payment_intent_id.
- **Ticket**: Represents the actual valid pass.
  - Fields: order_id, ticket_type_id, qr_code_data, status (active/checked_in/revoked), attendee_details.

### 5. Financials (`Transaction`)
- Immutable ledger for all money movement.
- **Types**: `sale`, `refund`, `payout`, `fee`.

## 4. Implementation Application Phases

### Phase 1: Foundation & Auth
- **Goal**: Users can Sign Up and Login. Database is connected.
- **Tasks**:
  1. Setup MongoDB Atlas & `mongoose`.
  2. Install `next-auth@beta`.
  3. Create `User` model.
  4. Implement Login/Register forms with Server Actions.

### Phase 2: Core Event Management
- **Goal**: Organizers can CRUD events.
- **Tasks**:
  1. Create `Event` and `TicketType` schemas.
  2. Create Server Actions for creating/updating events.
  3. Integrate Cloudinary for event banners.

### Phase 3: Public Discovery & Commerce (Payments)
- **Goal**: Customers can view events and buy tickets.
- **Tasks**:
  1. Setup Stripe.
  2. Create `Order` model.
  3. Implement Stripe Checkout session creation.
  4. Implement Webhook to listen for `checkout.session.completed` -> Create Tickets in DB.

### Phase 4: Communications & Delivery
- **Goal**: Users receive tickets via Email/WhatsApp.
- **Tasks**:
  1. Integrate Resend email API.
  2. Generate QR Codes (using `qrcode` lib).
  3. Send Confirmation Email with Ticket attachment.
  4. (Optional) WhatsApp notification via Meta API.

### Phase 5: Organizers Dashboard (Read)
- **Goal**: Organizers see real data instead of mocks.
- **Tasks**:
  1. Aggregate queries (MongoDB Pipelines) for `metrics` (Sales count, Revenue).
  2. Connect `EventsGrid`, `BookingsTable`, `FinancialsMetrics` to real data fetchers.

## 5. Security Checklist
- [ ] Environment variables validation (Zod).
- [ ] Rate limiting on API routes.
- [ ] Sanitize inputs (mongo injection prevention - handled mostly by mongoose but validation needed).
- [ ] Role-Based Access Control (RBAC) middleware for `/dashboard` routes.
