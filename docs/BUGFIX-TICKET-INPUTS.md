# Bug Fix: Ticket Designer Input Handling

## 🐛 **Issue Identified**
- **Console Error:** `Received NaN for the value attribute`
- **Component:** `OrganizerTicketsClient.tsx`
- **Cause:** When clearing the 'Price' or 'Quantity' numeric inputs, `e.target.value` becomes an empty string `""`. Passing this to `parseInt()` results in `NaN`, which React rejects for value attributes on controlled inputs.

## 🛠 **Fix Implemented**
Updated the `onChange` handlers for both Price and Quantity inputs to safely handle empty inputs.

### Before:
```typescript
onChange={(e) => updateForm('price', parseInt(e.target.value))}
```

### After:
```typescript
onChange={(e) => updateForm('price', e.target.value === '' ? 0 : parseInt(e.target.value))}
```

This ensures the state always receives a valid number (`0` when empty), preventing the React warning and potential logical errors.

## ❓ **Regarding 404 Error**
The reported 404 on `/dashboard/events/[id]` likely stems from one of two causes:
1.  **Ownership Check:** If the Event ID exists but belongs to another organizer, the system returns an "Event Not Found" UI (which acts like a 404 for the user).
2.  **Invalid ID:** If the ID format is invalid, it may fail resolution. The current implementation handles standard IDs.

The route structure `/app/dashboard/events/[id]/page.tsx` is correctly set up.
