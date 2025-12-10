# Data Audit: Bookings Management API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Bookings (Frontend) -> Backend API

## 1. Overview
This document outlines the data structure for the Bookings Management module (`components/bookings/BookingsTable.tsx`, `BookingDetailsModal.tsx`). It defines the backend schema required to support viewing, filtering, and managing bookings.

---

## 2. Frontend Data Model
Based on `BookingsTable.tsx`, the `Booking` object requires:

```typescript
type Booking = {
    id: string; // e.g., "BK-7829-XJ"
    customer: {
        id?: string;
        name: string;
        email: string; // Implied for "Email Customer" action
        initials: string; // Derived from name
        bgColor: string; // UI specific, derived or stored
    };
    event_id: string; // Context
    type: string; // Ticket Name e.g. "VIP Pass"
    qty: number;
    date: string; // Transaction date
    time: string; // Transaction time
    amount: number;
    currency: string; // "SZL"
    payment: string; // "Credit Card", "Mobile Money"
    status: "Confirmed" | "Pending" | "Cancelled" | "Refunded";
};
```

---

## 3. Proposed Backend Schema (SQL)

### Table: `bookings`
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `event_id` | UUID | NO | Foreign Key -> events.id |
| `user_id` | UUID | YES | Foreign Key -> users.id (if registered) |
| `guest_details` | JSONB | YES | Stores name/email if guest checkout |
| `ticket_id` | UUID | NO | Foreign Key -> tickets.id |
| `quantity` | INTEGER | NO | Number of tickets |
| `total_amount` | DECIMAL(10, 2) | NO | Total cost |
| `currency` | VARCHAR(3) | NO | Default 'SZL' |
| `payment_method` | VARCHAR(50) | NO | e.g., 'card', 'momo', 'cash' |
| `status` | VARCHAR(20) | NO | confirmed, pending, cancelled |
| `check_in_status` | VARCHAR(20) | NO | not_checked_in, checked_in |
| `created_at` | TIMESTAMPTZ | NO | Transaction time |

### Table: `attendees` (Optional normalization)
If a booking has multiple tickets, we might track individual attendees.
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `booking_id` | UUID | NO | Foreign Key -> bookings.id |
| `ticket_code` | VARCHAR(50) | NO | Unique QR code string |
| `status` | VARCHAR(20) | NO | active, checked_in |

---

## 4. API Contract

### GET `/api/v1/events/{eventId}/bookings`
Retrieves paginated bookings for an event.

#### Query Parameters
- `page`: number (default 1)
- `limit`: number (default 20)
- `search`: string (search by name/email/id)
- `status`: string (filter by status)

#### Response
```json
{
  "data": [
    {
      "id": "bk_123",
      "customer": {
        "name": "Thabo Mdluli",
        "email": "thabo@example.com"
      },
      "ticketType": "VIP Pass",
      "quantity": 2,
      "amount": 500.00,
      "currency": "SZL",
      "date": "2025-03-10T14:30:00Z",
      "paymentMethod": "Mobile Money",
      "status": "confirmed"
    }
  ],
  "meta": {
    "total": 150,
    "pages": 8
  }
}
```

### POST `/api/v1/bookings/{id}/refund`
Initiates a refund for a booking.

### POST `/api/v1/bookings/{id}/email`
Triggers an email to the customer.

---

## 5. Requirements
1.  **Search Performance**: Index `customer_name` and `booking_reference` for fast lookups.
2.  **Export**: Ability to export bookings to CSV (Backend endpoint `GET .../export`).
3.  **Real-time**: Hook into payment gateways (Stripe/Momo) webhooks to update `status`.
