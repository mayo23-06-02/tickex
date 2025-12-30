# Web App Scanner Specifications (Next.js PWA)

## 1. Overview

This document outlines the specifications for the **Tickex Web Scanner**, a mobile-optimized web application integrated directly into the existing Next.js platform. It allows organizers and staff to scan attendee tickets using their smartphone browsers without installing a separate native app.

The solution leverages **Progressive Web App (PWA)** capabilities to provide an app-like experience.

---

## 2. Technical Architecture

### 2.1 Technology Stack

- **Framework**: Next.js 14+ (App Router).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS (Mobile-first design).
- **Scanning Library**: `html5-qrcode` or `react-qr-reader` (Zxing based) for browser-based QR decoding.
- **State Management**: React Server Components + Client Hooks.

### 2.2 Integration Strategy

Instead of a separate codebase, the scanner will be a dedicated **route group** within the current application (e.g., `/scanner`). This allows us to share:

- **Authentication**: Seamlessly use existing `auth.ts` (NextAuth) sessions. No new login flow needed if already logged in as an organizer.
- **Components**: Reuse UI tokens from the main design system.
- **Database**: Direct access via Server Actions (no external API overhead).

---

## 3. Technical Implementation Details

### 3.1 Database Architecture

We will utilize the existing **Ticket** model in MongoDB but need to ensure specific indexing for performance.

**Schema Reference (`Ticket`):**

```typescript
{
  ticketCode: String,      // Indexed, Unique
  status: "active" | "checked_in" | "revoked",
  ticketTypeId: ObjectId,  // Ref: TicketType
  orderId: ObjectId,       // Ref: Order
  attendeeName: String,
  updatedAt: Date          // Used for check-in timestamp
}
```

**Required Database Optimizations:**

1.  **Compound Index**: While `ticketCode` is unique, a compound lookup might be faster if we filter by event strictly. However, since `ticketCode` is globally unique, a simple index on `ticketCode` is sufficient `db.tickets.createIndex({ ticketCode: 1 }, { unique: true })`.

### 3.2 The Verification Algorithm (`verifyTicket`)

This logic will be encapsulated in a Server Action: `app/actions/scanner.ts`.

**Input:**

- `scannedCode` (string): The payload from the QR code.
- `targetEventId` (string): The event the organizer is currently scanning for.
- `organizerId` (string): From the authenticated session.

**Execution Flow:**

1.  **Find Ticket**: Query generic `Ticket` collection by `ticketCode`.
    - `const ticket = await Ticket.findOne({ ticketCode: scannedCode }).populate('ticketTypeId');`
2.  **Existence Check**: If `!ticket`, return `{ valid: false, reason: "TICKET_NOT_FOUND" }`.
3.  **Event Scope Check**:
    - Verify if the ticket belongs to the correct event.
    - `ticket.ticketTypeId.event.toString() === targetEventId`
    - _Failure_: Return `{ valid: false, reason: "WRONG_EVENT" }` (Display: "Wrong Event: This ticket is for [Other Event Name]").
4.  **Status Check**:
    - **Case: "active"**:
      - Proceed to update.
    - **Case: "checked_in"**:
      - Return `{ valid: false, reason: "ALREADY_USED", data: { checkInTime: ticket.updatedAt } }`.
    - **Case: "revoked"**:
      - Return `{ valid: false, reason: "REVOKED" }`.
5.  **Commit Check-In (Atomic Operation)**:
    - Use `findOneAndUpdate` to prevent race conditions (double scanning at the exact same millisecond).
    - Query: `{ _id: ticket._id, status: "active" }`
    - Update: `{ $set: { status: "checked_in" } }`
    - _Result_: If operation returns null, it means the status changed between step 4 and 5 (race condition caught).
6.  **Return Success**:
    - Payload: `{ valid: true, attendee: ticket.attendeeName, type: ticket.ticketTypeId.name }`.

### 3.3 Security & Anti-Fraud

1.  **Signed Payloads (Optional but Recommended)**:
    - Instead of just the DB ID, the QR code can contain a signed JWT or a hashed string `SHA256(ticketId + secret)` to prevent users from generating sequential QR codes (e.g., guessing `1001`, `1002`).
    - _Current Phase_: We will assume `ticketCode` is a high-entropy UUID (e.g., `550e8400-e29b...`) which is unguessable.
2.  **Rate Limiting**:
    - Implement a simple rate limit on the `verifyTicket` action (e.g., max 60 attempts per minute per IP) to prevent brute-force attacks on codes.
3.  **Organizer Validation**:
    - Ensure `targetEventId` actually belongs to the user (`session.user.id`). This prevents Malicious Organizer A from checking into Good Organizer B's event.

### 3.4 Data Payload Structure

Detailed response structure for the frontend to render appropriate UI states.

```typescript
type ScanResponse =
  | { success: true; ticket: { name: string; type: string; id: string } }
  | {
      success: false;
      error: "NOT_FOUND" | "WRONG_EVENT" | "ALREADY_USED" | "REVOKED";
      details?: any;
    };
```

---

## 4. Web Client Features (PWA)

### 4.1 Integration as PWA

- **Manifest**: `manifest.json` to allow "Add to Home Screen".
  - Full-screen display (`display: standalone`).
  - Custom icon for the home screen.
- **Service Worker**: Cache static assets (JS/CSS) so the scanner loads instantly even with spotty internet.

### 4.2 User Interface (Mobile Optimized)

**1. Dashboard / Event Select**

- Simple card list of "Today's Events".
- Quick stats: "Check-ins: 45/150".

**2. Scanner View (The Camera)**

- **Permissions**: Browser prompt to access camera.
- **Viewfinder**: Full-screen video feed with a square overlay.
- **Camera Switch**: Toggle between Front/Back cameras (default: Back).

**3. Scan Result Overlay**

- **Modal/Drawer** pops up immediately upon scan detection.
- **Valid (Green)**: "Access Granted" + Attendee Name + Ticket Type (VIP/General).
- **Invalid (Red)**: "Invalid Code" or "Wrong Event".
- **Duplicate (Yellow)**: "Already Checked In" + Timestamp of previous scan.
- **Auto-Dismiss**: Success screens auto-close after 3 seconds to allow rapid scanning.

**4. Manual Entry Fallback**

- Button to toggle specific input field for typing scanning codes (for broken screens/bad printouts).

---

## 5. Implementation Roadmap

### Phase 1: Core Scanner Logic

1.  Add `html5-qrcode` package.
2.  Create route `app/scanner/page.tsx`.
3.  Implement basic camera stream rendering.
4.  Test QR code reading in-browser.

### Phase 2: Server Actions & Validation

1.  Create `app/actions/scanner.ts`.
2.  Implement `verifyTicket` logic interacting with MongoDB.
3.  Connect the frontend scanner to the server action.

### Phase 3: UI & Stats

1.  Build the "Scan Result" drawer/modal (using existing Design System).
2.  Add "Event Selector" if the user has multiple active events.
3.  Add live stats counter to the scanner header.

### Phase 4: PWA Polish

1.  Add `manifest.json`.
2.  Meta tags for purely mobile view (disable zooming, overscroll).
3.  Optimize for iOS Safari and Chrome Android quirks.

---

## 6. Constraints & Considerations

- **HTTPS Required**: Browsers ONLY allow camera access over HTTPS (or localhost). Production must have SSL.
- **Camera Permission**: Users must explicitly allow camera access. Handle "Permission Denied" states gracefully with instructions.
- **Battery Usage**: Continuous video stream consumes battery; implement a "Pause" state when not actively checking people in?
