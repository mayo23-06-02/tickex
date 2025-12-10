# Data Audit: Event Creation API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Event Creation Wizard (Frontend) -> Backend API

## 1. Overview
This document outlines the data structure used in the frontend `CreateEventWizard` and proposes the corresponding Backend API contract, database schema, and validation rules required to support the event creation flow.

---

## 2. Frontend Data Model
The current React state `EventFormData` is structured as follows:

```typescript
type EventFormData = {
    name: string;
    organizer: string;
    category: string;
    startDate: Date | null;
    endDate: Date | null;
    location: string;
    description: string;
    tickets: Ticket[];
    refundPolicy: string;
    ageRestriction: string;
};

type Ticket = {
    id: number;
    name: string;
    price: number;
    capacity: number;
}
```

---

## 3. Proposed Backend Schema (SQL/Relational)

### Table: `events`
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `name` | VARCHAR(255) | NO | Event Title |
| `organizer_name` | VARCHAR(255) | NO | Name of the organizer |
| `category` | VARCHAR(50) | NO | Enum: music, conference, workshop, sports |
| `start_date` | TIMESTAMPTZ | NO | Event start time (UTC) |
| `end_date` | TIMESTAMPTZ | NO | Event end time (UTC) |
| `location` | VARCHAR(255) | NO | Physical address or venue name |
| `description` | TEXT | YES | Full HTML/Markdown description |
| `banner_url` | VARCHAR(2048) | YES | URL to the uploaded banner image |
| `refund_policy` | VARCHAR(50) | NO | Enum: non-refundable, 7-days, flexible |
| `age_restriction` | VARCHAR(20) | NO | Enum: all-ages, 18+, 21+ |
| `status` | VARCHAR(20) | NO | Enum: draft, published, cancelled |
| `created_at` | TIMESTAMPTZ | NO | Default: NOW() |
| `updated_at` | TIMESTAMPTZ | NO | Default: NOW() |

### Table: `tickets`
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `event_id` | UUID | NO | Foreign Key -> events.id |
| `name` | VARCHAR(100) | NO | Ticket Name (e.g. VIP, GA) |
| `price` | DECIMAL(10, 2) | NO | Price in SZL |
| `currency` | VARCHAR(3) | NO | Default: 'SZL' |
| `capacity` | INTEGER | NO | Total tickets available for this type |
| `sold` | INTEGER | NO | Default: 0 |

---

## 4. API Contract

### POST `/api/v1/events`
Creates a new event with its associated tickets.

#### Request Payload
```json
{
  "name": "Neon Dreams Festival 2025",
  "organizer": "Tickex Organizer",
  "category": "music",
  "startDate": "2025-03-15T18:00:00Z",
  "endDate": "2025-03-16T02:00:00Z",
  "location": "Central Stadium, Mbabane",
  "description": "The biggest electronic music festival in Eswatini...",
  "refundPolicy": "non-refundable",
  "ageRestriction": "18+",
  "tickets": [
    {
      "name": "General Admission",
      "price": 150.00,
      "capacity": 1000
    },
    {
      "name": "VIP Pass",
      "price": 500.00,
      "capacity": 200
    }
  ]
}
```

#### Success Response (201 Created)
```json
{
  "data": {
    "id": "evt_123456789",
    "status": "published",
    "publishedUrl": "https://tickex.com/e/neon-dreams-2025"
  }
}
```

---

## 5. Validation Rules
The Backend must enforce the following integrity checks:

1.  **Dates**: `endDate` must be strictly after `startDate`.
2.  **Pricing**: `price` cannot be negative. Free events should have `price: 0`.
3.  **Capacity**: `capacity` must be a positive integer > 0.
4.  **Content**: `name` must be at least 3 characters long.
5.  **Location**: Required field, cannot be empty.

## 6. Recommendations
1.  **Image Upload**: The frontend currently "simulates" an upload. Implementing a real signed-URL upload flow (e.g., S3 or Cloudinary) is required before the final submit.
2.  **Draft Saving**: Implement a `PUT /api/v1/events/{id}/draft` endpoint to autosave progress as the user moves between wizard steps.
3.  **Map Integration**: The location field should ideally store `latitude` and `longitude` for better map rendering.
