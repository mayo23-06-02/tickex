# Data Audit: Identity & Layout API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Layout (Header, Sidebar) -> Backend API

## 1. Overview
This document outlines the data requirements for the global layout components (`Header.tsx`, `Sidebar.tsx`), specifically regarding user identity, context switching, and notifications.

---

## 2. Frontend Data Model

### User Context (Session)
- **User**: `name`, `avatar_url` (or initials), `role` (Organizer, Admin).
- **Organization**: Current active organization/organizer profile.

### Context Switcher (Header)
- **Active Event**: `id`, `name`.
- **Recent Events**: List of `{ id, name }`.

### Notifications (Header)
- **Alerts**: List of unread notifications (`unread_count`, `items`).

---

## 3. Proposed Backend Schema (SQL)

### Table: `users`
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `email` | VARCHAR | NO | |
| `full_name` | VARCHAR | NO | |
| `avatar_url` | VARCHAR | YES | |
| `created_at` | TIMESTAMPTZ | NO | |

### Table: `notifications`
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | |
| `user_id` | UUID | NO | |
| `title` | VARCHAR | NO | |
| `message` | TEXT | NO | |
| `type` | VARCHAR | NO | info, success, warning, error |
| `read_at` | TIMESTAMPTZ | YES | Null if unread |
| `link_url` | VARCHAR | YES | Action link |
| `created_at` | TIMESTAMPTZ | NO | |

---

## 4. API Contract

### GET `/api/v1/me`
Returns current user session and context.
```json
{
  "user": {
    "id": "u_123",
    "name": "Oliver Lewis",
    "initials": "OL",
    "avatar": "https://...",
    "email": "oliver@tickex.com"
  },
  "notifications": {
    "unreadCount": 3
  }
}
```

### GET `/api/v1/me/events`
Returns list of events for the context switcher.
```json
[
  { "id": "evt_1", "name": "Neon Dreams Festival" },
  { "id": "evt_2", "name": "Summer Vibes 2025" }
]
```

### GET `/api/v1/notifications`
Returns paginated notifications.

### POST `/api/v1/notifications/{id}/read`
Marks a notification as read.
