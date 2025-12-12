# Ticket Purchase Troubleshooting Guide

## 🎫 Unable to Buy Tickets - Solutions

### Quick Checklist

1. **Are you logged in?**
   - ✅ Check if you see your initials in the top-right corner
   - ❌ If not logged in, click "Sign In" first
   - The checkout requires authentication

2. **Have you selected tickets?**
   - Click the `+` button next to a ticket type
   - The counter should show a number greater than 0
   - The "Get Tickets" button should be enabled (green)

3. **Are tickets available?**
   - Check if tickets show "X left" (where X > 0)
   - If "0 left", tickets are sold out

4. **Is the event page loading?**
   - Event details should display
   - Ticket selection panel should appear on the right
   - If not, check console for errors

---

## 🔍 Common Issues & Solutions

### Issue 1: "Get Tickets" Button is Disabled (Gray)
**Cause:** No tickets selected
**Solution:**
1. Click the `+` button next to any ticket type
2. The button should turn green
3. Click "Get Tickets"

### Issue 2: Redirected Back to Homepage
**Causes:**
- Event not found in database
- Invalid event ID
- Event has been deleted

**Solution:**
1. Go to `/events` page
2. Click on an active event
3. Try purchasing again

### Issue 3: Not Logged In
**Cause:** Authentication required for checkout
**Solution:**
1. Click "Sign In" in the header
2. Log in with your credentials
3. Return to the event page
4. Select tickets and proceed

### Issue 4: Checkout Page Not Loading
**Causes:**
- Missing query parameters
- Invalid ticket selection
- Server error

**Solution:**
1. Check browser console for errors (F12)
2. Verify URL has `?eventId=...&tickets=...`
3. Try selecting tickets again

---

## 🛠️ Step-by-Step Purchase Process

### 1. Navigate to Event
```
http://localhost:3000/events
```
- Click on any event card
- Event details page should load

### 2. Select Tickets
- Find the "Select Tickets" panel on the right
- Click `+` to add tickets
- Click `-` to remove tickets
- See total amount update

### 3. Click "Get Tickets"
- Button should be green (not gray)
- You'll be redirected to checkout page

### 4. Complete Checkout
- Fill in your details (if not logged in)
- Review order summary
- Click "Complete Purchase"
- Stripe payment form should appear

### 5. Payment
- Enter test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Click "Pay"

### 6. Confirmation
- You'll be redirected to success page
- Check email for ticket confirmation
- View tickets in "My Orders"

---

## 🐛 Debugging Steps

### Check Browser Console
1. Press `F12` to open DevTools
2. Go to "Console" tab
3. Look for red error messages
4. Common errors:

**Error:** `useSession must be wrapped in SessionProvider`
**Fix:** Already fixed - SessionProvider is configured

**Error:** `Cannot read property 'id' of undefined`
**Fix:** Make sure you're logged in

**Error:** `Event not found`
**Fix:** Event doesn't exist in database - create one first

### Check Network Tab
1. Press `F12` → "Network" tab
2. Try to purchase tickets
3. Look for failed requests (red)
4. Check response for error messages

### Check Database
1. Verify MongoDB is running
2. Check `MONGODB_URI` in `.env.local`
3. Verify events exist in database:
   ```bash
   # In MongoDB shell or Compass
   db.events.find({ status: 'published' })
   ```

---

## 📋 Requirements for Ticket Purchase

### User Requirements
- ✅ Must be logged in (authenticated)
- ✅ Must have valid session
- ✅ Must have email address

### Event Requirements
- ✅ Event must exist in database
- ✅ Event status must be 'published'
- ✅ Event must have ticket types
- ✅ Tickets must have remaining quantity > 0

### System Requirements
- ✅ MongoDB connection working
- ✅ Stripe API keys configured
- ✅ NextAuth configured
- ✅ SessionProvider wrapped around app

---

## 🔧 Quick Fixes

### Fix 1: Clear Browser Cache
```
Ctrl + Shift + Delete
Clear cache and cookies
Restart browser
```

### Fix 2: Restart Dev Server
```bash
# Stop current server (Ctrl + C)
npm run dev
```

### Fix 3: Check Environment Variables
```env
# .env.local must have:
MONGODB_URI=mongodb://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Fix 4: Verify Session
```tsx
// In browser console:
console.log(document.cookie);
// Should see next-auth.session-token
```

---

## 🎯 Test Purchase Flow

### Create Test Event (if needed)
1. Go to `/events/create`
2. Fill in event details
3. Add ticket types
4. Publish event

### Test Purchase
1. **Navigate:** Go to `/events`
2. **Select:** Click on an event
3. **Add Tickets:** Click `+` next to a ticket type
4. **Verify:** Total amount should update
5. **Checkout:** Click "Get Tickets" (green button)
6. **Redirect:** Should go to `/checkout?eventId=...&tickets=...`
7. **Complete:** Fill form and pay with test card

---

## 📞 Still Having Issues?

### Check These:

1. **Console Errors:**
   - Open browser console (F12)
   - Look for red errors
   - Share error message

2. **Network Errors:**
   - Check Network tab in DevTools
   - Look for failed requests
   - Check response status codes

3. **Database:**
   - Verify MongoDB is running
   - Check connection string
   - Verify events exist

4. **Authentication:**
   - Verify you're logged in
   - Check session cookie exists
   - Try logging out and back in

5. **Stripe:**
   - Verify API keys are set
   - Check Stripe dashboard
   - Use test mode keys

---

## ✅ Expected Behavior

### When Everything Works:
1. Event page loads with ticket options
2. Can select/deselect tickets
3. Total updates correctly
4. "Get Tickets" button is green when tickets selected
5. Clicking button redirects to checkout
6. Checkout page shows order summary
7. Can complete payment
8. Redirected to success page
9. Tickets appear in "My Orders"
10. Email confirmation sent

---

## 🚨 Error Messages & Meanings

| Error | Meaning | Solution |
|-------|---------|----------|
| "Please select at least one ticket" | No tickets selected | Click `+` to add tickets |
| "Event not found" | Invalid event ID | Go to `/events` and select valid event |
| "Session required" | Not logged in | Sign in first |
| "Tickets unavailable" | Sold out | Try different ticket type |
| "Payment failed" | Stripe error | Check card details, try again |

---

**Last Updated:** 2025-12-12
**Status:** Checkout flow operational
