---
description: Create Web App Scanner (Next.js PWA)
---

# Web App Scanner Implementation Plan

This workflow outlines the steps to build the Tickex Web Scanner as a PWA features.

## Phase 1: dependencies & Setup

1.  Install the scanning library:
    ```bash
    npm install html5-qrcode
    ```
2.  Create the route group and directory structure:
    - `app/(scanner)/scanner/page.tsx`
    - `app/(scanner)/scanner/layout.tsx` (To ensure it has a unique, simplified mobile layout without the main dashboard sidebar).

## Phase 2: Backend Logic (Server Actions)

1.  Create `app/actions/scanner.ts`.
2.  Implement `getScannerEvents()`:
    - Fetch events where `organizerId` matches the session user.
    - Filter for active/future events only.
3.  Implement `verifyTicket(ticketCode, eventId)`:
    - Follow the verification algorithm defined in `docs/web-scanner-specs.md`.
    - Handle statuses: `active` -> `checked_in`, `checked_in` -> Error, `revoked` -> Error.

## Phase 3: Frontend Components

1.  Create `components/scanner/QRScanner.tsx`:
    - Implement `Html5QrcodeScanner` or `Html5Qrcode` class.
    - Handle permission errors.
    - Return scanned string up to parent.
2.  Create `components/scanner/ScanResultDrawer.tsx`:
    - Visual feedback (Green/Red/Yellow).
    - Show attendee name and ticket type.
    - Auto-dismiss functionality.
3.  Create `components/scanner/EventSelector.tsx`:
    - Simple dropdown or card list to select active context.
4.  Create `components/scanner/ManualEntry.tsx`:
    - Input field for manual code typing.

## Phase 4: Integration

1.  Assemble `app/(scanner)/scanner/page.tsx`.
    - State management: `currentEvent`, `scanResult`, `isScanning`.
    - Render `EventSelector` if no event selected.
    - Render `QRScanner` if event selected.
    - Render `ScanResultDrawer` on scan.
2.  Add a link to the scanner in the main generic dashboard or header for mobile users.

## Phase 5: PWA Scaffolding

1.  Create `public/manifest.json`.
    - Name: "Tickex Scanner".
    - Display: `standalone`.
    - Theme Colors.
2.  Add viewport meta tags for mobile optimization (prevent zooming) in the layout.
