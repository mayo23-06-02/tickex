# Backend Prompts

Use the following prompts in order to guide an AI assistant in building the backend for TickEx.

---

## Prompt 1: Foundation & Database Setup
```text
I need to set up the backend foundation for my Next.js TickEx application.
Please perform the following steps:
1. Create a `lib/db/connect.ts` file to handle a cached MongoDB connection using Mongoose.
2. Create `lib/db/models/User.ts` with a schema for: name, email, password (hashed), role ('customer' | 'organizer' | 'admin'), and timestamps.
3. Install necessary packages: `mongoose`, `bcryptjs`.
4. Create a server action `app/actions/auth.ts` to handle user registration (hashing password and saving to DB).
```

## Prompt 2: Authentication Implementation
```text
Now let's implement Authentication using NextAuth v5 (Beta).
1. Install `next-auth@beta`.
2. Create `auth.ts` and `auth.config.ts` in the root (or lib) to configure the Credentials provider (using our User model) and potentially Google provider.
3. Create the route handler `app/api/auth/[...nextauth]/route.ts`.
4. Update the Login and Register pages to use these Server Actions / Sign In methods.
5. Create a `middleware.ts` to protect `/dashboard` routes, ensuring only authenticated users can access them.
```

## Prompt 3: Event & Image Management (Cloudinary)
```text
I need to allow Organizers to create events.
1. Create Mongoose models:
   - `Event` (title, description, dates, location, organizerId, imageUrl, status).
   - `TicketType` (name, price, stock, eventId).
2. Set up Cloudinary:
   - Create a `lib/services/cloudinary.ts` utility to handle server-side uploads.
3. Create a Server Action `createEvent` in `app/actions/events.ts` that:
   - Accepts FormData.
   - Uploads the image to Cloudinary.
   - Saves the Event and associated TicketTypes to MongoDB.
4. Update the "Create Event" wizard frontend to call this action.
```

## Prompt 4: Stripe Payments Integration
```text
Let's handle payments using Stripe.
1. Install `stripe`.
2. Model Setup: Create an `Order` model (userId, eventId, totalPixels/Amount, status, stripeSessionId).
3. Create a Server Action `checkout(eventId, ticketSelection)`:
   - It should create a pending Order record.
   - It should initialize a Stripe Checkout Session with line items.
   - Return the session URL to the client.
4. Webhook: Create `app/api/webhooks/stripe/route.ts` to listen for `checkout.session.completed`.
   - On success, update the Order status to 'paid'.
   - Decrement TicketType stock.
   - Create specific `Ticket` records (with unique codes) for the user.
```

## Prompt 5: Email & Notifications
```text
I need to send tickets to users after purchase.
1. Install `resend`.
2. Create an Email Template component `components/emails/TicketEmail.tsx` (using react-email or standard HTML/Tailwind).
3. Create `lib/services/email.ts` with a function `sendTicketEmail(to, ticketData)`.
4. Update the Stripe Webhook from the previous step to call `sendTicketEmail` after the order is confirmed.
```

## Prompt 6: Dashboard Data Fetching
```text
Finally, let's make the dashboard dynamic.
1. Create data fetching functions in `lib/data/` that run on the server (using Mongoose):
   - `getOrganizerStats(userId)`: Calculates total revenue, tickets sold, etc.
   - `getRecentBookings(userId)`: Returns last 10 orders.
2. Update `app/dashboard/page.tsx` and specific components (`MetricGrid`, `BookingsTable`) to accept data as props.
3. Replace the hardcoded mock data in those components with the real database data passed from the Page component.
```
