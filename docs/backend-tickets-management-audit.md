# Data Audit: Ticket Styling & Management API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Ticket Management (Frontend) -> Backend API

## 1. Overview
This document focuses on the Ticket Designer (`components/tickets/TicketDesigner.tsx`, `TicketEditor.tsx`) and the management of ticket definitions beyond simple creation.

---

## 2. Frontend Data Model
The `TicketDesigner` allows customizing the visual appearance of the digital ticket.

### Design Config
```typescript
type TicketDesign = {
    templateId: string; // "minimal", "branded", "qr-focused"
    colors: {
        primary: string;
        background: string;
        text: string;
    };
    branding: {
        logoUrl?: string;
        bannerUrl?: string;
        showOrganizerName: boolean;
    };
    content: {
        showPrice: boolean;
        showMap: boolean;
        customMessage?: string;
    };
};
```

---

## 3. Proposed Backend Schema (SQL)

### Updates to Table: `tickets`
Existing `tickets` table requires a JSONB column for design configuration.

| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `design_config` | JSONB | YES | Stores the `TicketDesign` object structure |
| `check_in_window_start` | TIMESTAMPTZ | YES | When ticket becomes valid for scan |
| `check_in_window_end` | TIMESTAMPTZ | YES | When ticket expires |

---

## 4. API Contract

### GET `/api/v1/tickets/{ticketId}/design`
Fetches the current design configuration.

### PUT `/api/v1/tickets/{ticketId}/design`
Updates the visual design of a ticket category.
```json
{
  "templateId": "modern-dark",
  "colors": {
    "primary": "#1DB954",
    "background": "#0f172a"
  },
  "branding": {
    "logoUrl": "https://cdn.tickex.com/logos/cntest.png"
  }
}
```

### GET `/api/v1/tickets/preview/{ticketId}`
Renders a generated ticket image or HTML for preview purposes (if backend generation is used).

---

## 5. Integrations
1.  **Wallet Integration**: The design config should map to Apple Wallet / Google Wallet pass fields (primary color -> background, logo -> icon, etc.).
2.  **PDF Generation**: The backend needs a service (e.g., Puppeteer/html-to-image) to generate the PDF ticket based on this design config when sending emails.
