# Mobile App Scanner Specifications

## 1. Overview

This document outlines the specifications for the development of the **Tickex Mobile Scanner App**, a dedicated mobile application designed for event organizers and staff to validate tickets and manage attendee check-ins efficiently at venue entry points.

The system comprises two main parts:

1.  **Mobile Client (React Native)**: A cross-platform mobile app (iOS/Android) for scanning QR codes.
2.  **API Integration (Tickex Backend)**: New API endpoints within the existing Next.js application to handle authentication, validation, and status updates.

---

## 2. Technical Architecture

### 2.1 Technology Stack

- **Framework**: React Native (via **Expo**) for rapid cross-platform development.
- **Language**: TypeScript.
- **UI Library**: React Native Paper or Tamagui for a consistent, modern design system.
- **Camera/Scanning**: `expo-camera` or `react-native-vision-camera` for high-performance QR scanning.
- **Backend**: Existing Next.js (Tickex) application.

### 2.2 Integration Strategy

The mobile app will communicate with the Tickex backend via secure REST API endpoints. We will extend the current Next.js application to expose these endpoints specifically for the scanner.

---

## 3. Backend Integration (Next.js)

### 3.1 Authentication

We need a robust authentication mechanism for mobile scanning devices.

- **Strategy**: API Key or Temporary Staff Token (JWT).
- _Phase 1 Implementation_: Allow Organizers to log in using their standard credentials, issuing a JWT for the mobile session.

### 3.2 New API Endpoints

Create a dedicated API route namespace: `app/api/scanner/v1/`

| Endpoint        | Method | Purpose                             | Request Body                                 | Response                                                        |
| :-------------- | :----- | :---------------------------------- | :------------------------------------------- | :-------------------------------------------------------------- |
| `/auth/login`   | POST   | Authenticate organizer/staff        | `{ email, password }`                        | `{ token, user: { id, name } }`                                 |
| `/events`       | GET    | List events active for today/future | `Headers: { Authorization: Bearer <token> }` | `[ { id, name, date, stats: { sold, checkedIn } } ]`            |
| `/check-in`     | POST   | Validate and check-in a ticket      | `{ ticketCode, eventId }`                    | `{ valid: boolean, message: string, attendee: { name, type } }` |
| `/ticket/:code` | GET    | Get ticket details manually         | -                                            | `{ id, status, holderName, ticketType }`                        |

### 3.3 Database Operations

- The `check-in` endpoint must atomically retrieve and update the **Ticket** document in MongoDB.
- **Logic**:
  1.  Find Ticket by `ticketCode`.
  2.  Verify `eventId` matches the current scanning event.
  3.  Check `status`:
      - If `active`: Update to `checked_in`, return **SUCCESS**.
      - If `checked_in`: Return **WARNING: ALREADY CHECKED IN**.
      - If `revoked`: Return **ERROR: TICKET REVOKED**.
      - If not found: Return **ERROR: INVALID TICKET**.

---

## 4. Mobile App Features

### 4.1 User Interface (UI)

- **Theme**: Dark Mode default (optimized for low-light venue environments).
- **Visual Feedback**:
  - **Green Screen**: Valid Ticket (Big Checkmark).
  - **Red Screen**: Invalid/Revoked (Big X).
  - **Yellow/Orange Screen**: Duplicate Scan (Already Checked In).
- **Haptics**: Vibration on scan (Short success, Long failure).

### 4.2 Core Functionality

1.  **Login Screen**:
    - Email/Password fields.
    - "Remember Me" for quick access during event.
2.  **Event Select**:
    - List of organizer's events.
    - Search bar for high-volume organizers.
    - Summary pill showing "Sold: 100 | In: 45".
3.  **Scanning Mode (Main View)**:
    - Camera viewfinder active.
    - Flashlight toggle (essential for dark venues).
    - Manual Entry button (for damaged QR codes).
4.  **Manual Check-in**:
    - Input field to type/paste Ticket ID.
    - List view of attendees to manually search by name (optional but recommended fallback).
5.  **Settings**:
    - Logout.
    - Vibration/Sound toggle.

---

## 5. Implementation Roadmap

### Phase 1: Backend Foundation

1.  Create `app/api/scanner/` directory.
2.  Implement JWT-based authentication for the API routes.
3.  Implement `check-in` logic in `app/api/scanner/check-in/route.ts`.
4.  Ensure `Ticket` model supports atomic updates.

### Phase 2: Mobile App MVP (Expo)

1.  Initialize Expo project `tickex-scanner`.
2.  Build Auth + Event Selection flow.
3.  Implement Camera scanning logic.
4.  Connect to local dev server for testing.

### Phase 3: Integration & Testing

1.  Test edge cases:
    - Scanning same ticket twice.
    - Scanning ticket for wrong event.
    - Offline handling (queue scans if network drops, sync when back - _Advanced_).

---

## 6. Security Considerations

- **Rate Limiting**: Prevent brute-force ticket code guessing on the API.
- **Scope Validation**: Ensure the logged-in user actually owns the event they are trying to scan for.
- **SSL**: All traffic must be encrypted.
