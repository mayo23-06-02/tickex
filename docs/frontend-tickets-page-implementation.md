# Frontend Implementation: Tickets Page

**Date**: 2025-12-10  
**Status**: IMPLEMENTED  
**Module**: Tickets Management (Frontend)

## 1. Overview

This document details the complete implementation of the Tickets page functionality, including CRUD operations, live preview, ticket designer, distribution tools, and interactive UI components.

---

## 2. Architecture

### Component Hierarchy

```
app/tickets/page.tsx (Main Container)
├── TicketSidebar (Left Panel)
│   ├── Search & Filter
│   ├── Ticket List
│   └── Create/Delete Actions
├── TicketDesigner (Center Panel)
│   ├── TicketPreview (Live Preview)
│   └── TicketEditor (Tabbed Editor)
│       ├── Basic Info Tab
│       ├── Perks & Benefits Tab
│       ├── Access Rules Tab
│       └── Design Tab
└── TicketDistribution (Right Panel)
    ├── Assignment Tools
    ├── Bulk CSV Upload
    ├── Discount Codes
    ├── Transfer Settings
    └── Batch Actions
```

---

## 3. Data Models

### TicketType Interface

```typescript
interface TicketType {
    id: string;
    name: string;
    price: number;
    sold: number;
    total: number;
    status: "Active" | "Inactive";
    color?: string;
    salesStart?: string;
    salesEnd?: string;
    description?: string;
    dynamicPricing?: boolean;
    waitlist?: boolean;
    venue?: string;
    eventDate?: string;
    eventTime?: string;
}
```

### Ticket Data (Editing State)

```typescript
interface TicketData {
    name: string;
    price: number;
    total: number;
    perks: string[];
    status: "Active" | "Inactive";
    salesStart: string;
    salesEnd: string;
    description: string;
    dynamicPricing: boolean;
    waitlist: boolean;
    venue: string;
    eventDate: string;
    eventTime: string;
}
```

### Ticket Design

```typescript
interface TicketDesign {
    bgColor: string;
}
```

---

## 4. State Management

### Central State (TicketsPage)

The main page component manages all state centrally:

- **`tickets`**: Array of all ticket types
- **`selectedId`**: Currently selected ticket ID
- **`ticketData`**: Editing state for the selected ticket
- **`ticketDesign`**: Design properties for the selected ticket
- **`searchQuery`**: Search filter text

### State Synchronization

A `useEffect` hook ensures that when a ticket is selected, the editing state (`ticketData` and `ticketDesign`) is populated with the selected ticket's data:

```typescript
useEffect(() => {
    const ticket = tickets.find(t => t.id === selectedId);
    if (ticket) {
        setTicketData({
            name: ticket.name,
            price: ticket.price,
            // ... all other fields
        });
        setTicketDesign({
            bgColor: ticket.color || "#1DB954"
        });
    }
}, [selectedId, tickets]);
```

---

## 5. CRUD Operations

### Create Ticket

```typescript
const handleCreateTicket = () => {
    const newTicket: TicketType = {
        id: Date.now().toString(),
        name: "New Ticket",
        price: 0,
        sold: 0,
        total: 100,
        status: "Inactive",
        color: "#64748b"
    };
    setTickets([...tickets, newTicket]);
    setSelectedId(newTicket.id);
};
```

### Read/Select Ticket

Handled via `handleSelectTicket(id)` which updates `selectedId`, triggering the `useEffect` to load ticket data.

### Update Ticket

```typescript
const handleSaveTicket = () => {
    setTickets(prev => prev.map(t => {
        if (t.id === selectedId) {
            return {
                ...t,
                name: ticketData.name,
                price: ticketData.price,
                // ... all updated fields
            };
        }
        return t;
    }));
    toast.success("Ticket updated successfully");
};
```

### Delete Ticket

```typescript
const handleDeleteTicket = (id: string) => {
    const newTickets = tickets.filter(t => t.id !== id);
    setTickets(newTickets);
    if (newTickets.length > 0 && selectedId === id) {
        setSelectedId(newTickets[0].id);
    } else if (newTickets.length === 0) {
        setSelectedId("");
    }
};
```

### Cancel Changes

```typescript
const handleCancelTicket = () => {
    const ticket = tickets.find(t => t.id === selectedId);
    if (ticket) {
        // Revert ticketData and ticketDesign to original values
        setTicketData({ /* original values */ });
        setTicketDesign({ bgColor: ticket.color || "#1DB954" });
        toast.info("Changes reverted");
    }
};
```

---

## 6. Component Details

### TicketSidebar

**Location**: `components/tickets/TicketSidebar.tsx`

**Features**:
- Search functionality with real-time filtering
- List of all tickets with status indicators
- Create new ticket button
- Context menu for deleting tickets (with animation)
- Quick template buttons

**Props**:
```typescript
interface TicketSidebarProps {
    tickets: TicketType[];
    selectedId: string;
    onSelect: (id: string) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}
```

### TicketDesigner

**Location**: `components/tickets/TicketDesigner.tsx`

**Features**:
- Live preview with desktop/mobile toggle
- Responsive preview sizing based on mode
- Passes data to TicketPreview and TicketEditor

**Props**:
```typescript
interface TicketDesignerProps {
    data: any;
    design: any;
    updateData: (updates: any) => void;
    updateDesign: (updates: any) => void;
    onSave: () => void;
    onCancel: () => void;
}
```

### TicketPreview

**Location**: `components/tickets/TicketPreview.tsx`

**Features**:
- Dynamic display of ticket name, price, venue, date, time
- QR code placeholder
- Gradient background using design color
- Decorative blur elements
- Download mockup button

**Dynamic Fields**:
- Ticket name: `data.name`
- Price: `data.price`
- Venue: `data.venue`
- Date: `data.eventDate`
- Time: `data.eventTime`
- Background: `design.bgColor`

### TicketEditor

**Location**: `components/tickets/TicketEditor.tsx`

**Features**:
- 4 tabbed sections: Basic Info, Perks & Benefits, Access Rules, Design
- Save & Publish button with loading state
- Cancel button
- Save Draft button (placeholder)
- Last saved timestamp display

**Tabs**:

1. **Basic Info**:
   - Ticket name, price, quantity
   - Sales start/end date-time pickers
   - Description textarea
   - Dynamic pricing checkbox
   - Waitlist checkbox

2. **Perks & Benefits**:
   - Dynamic perk list with add/remove
   - VIP Package Builder with 6 preset options
   - Visual feedback for selected perks

3. **Access Rules**:
   - Entry gates dropdown
   - Valid entry times (start/end)
   - Age verification checkbox
   - ID verification checkbox
   - Transferability settings

4. **Design**:
   - Background color picker
   - Color presets (6 options)
   - Live preview integration

**Helper Functions**:
```typescript
const addPerk = () => { /* ... */ };
const updatePerk = (index: number, value: string) => { /* ... */ };
const removePerk = (index: number) => { /* ... */ };
const togglePerk = (perk: string) => { /* ... */ };
```

### TicketDistribution

**Location**: `components/tickets/TicketDistribution.tsx`

**Features**:
- Customer assignment with email search
- Bulk CSV upload (with template download)
- Discount code management
- Transfer settings
- Batch actions

**Interactive Actions**:
- **Assign Ticket**: Simulated assignment with toast notification
- **Download CSV Template**: Generates and downloads a CSV file
- **Create Discount Code**: Promise-based toast with loading state
- **Batch Actions**: Toast notifications for background jobs

---

## 7. User Feedback & Notifications

### Toast Integration (Sonner)

All user actions provide feedback via toast notifications:

```typescript
import { toast } from "sonner";

// Success
toast.success("Ticket updated successfully");

// Info
toast.info("Changes reverted");

// Promise-based
toast.promise(
    new Promise((resolve) => setTimeout(resolve, 1000)),
    {
        loading: 'Creating discount code...',
        success: `Discount code ${code} created!`,
        error: 'Failed to create discount code'
    }
);

// Message with description
toast.message(`Processing: ${action}`, {
    description: "Started background job...",
});
```

### Visual Feedback

- **Save Button**: Shows spinner and "Saving..." text during save
- **Last Saved**: Displays timestamp after successful save
- **Assignment**: Loading spinner during ticket assignment
- **Selected Perks**: Green border and background highlight

---

## 8. Search & Filter

### Implementation

```typescript
const filteredTickets = tickets.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
);
```

The search is case-insensitive and filters tickets in real-time as the user types.

---

## 9. Styling & Design System

### Color Palette

- **Primary Green**: `#1DB954` (Spotify-inspired)
- **Dark Slate**: `#0f172a`
- **Medium Slate**: `#64748b`
- **Light Slate**: `#94a3b8`
- **Borders**: `#e2e8f0`
- **Backgrounds**: `slate-50`, `slate-100`

### Design Patterns

- **Rounded Corners**: `rounded-lg`, `rounded-xl`, `rounded-2xl`
- **Shadows**: `shadow-sm`, `shadow-lg`, `shadow-2xl`
- **Transitions**: All interactive elements have smooth transitions
- **Hover States**: Consistent hover feedback across all buttons
- **Focus States**: Ring-based focus indicators for accessibility

---

## 10. Mock Data

### Initial Tickets

```typescript
const initialTickets: TicketType[] = [
    {
        id: "1",
        name: "VIP Access",
        price: 500,
        sold: 120,
        total: 200,
        status: "Active",
        color: "#1DB954",
        salesStart: "2025-03-01T09:00",
        salesEnd: "2025-03-31T18:00",
        description: "Full access to all VIP areas...",
        dynamicPricing: true,
        waitlist: false,
        venue: "Central Stadium",
        eventDate: "2025-03-15",
        eventTime: "19:00"
    },
    // ... more tickets
];
```

---

## 11. Future Enhancements

### Backend Integration

1. Replace mock data with API calls
2. Implement real-time updates via WebSockets
3. Add image upload for ticket backgrounds
4. Integrate with payment processing

### Features

1. **Ticket Templates**: Pre-designed ticket layouts
2. **Advanced Filtering**: Filter by status, price range, date
3. **Bulk Edit**: Edit multiple tickets at once
4. **Analytics**: Sales trends, conversion rates
5. **A/B Testing**: Test different ticket designs
6. **Inventory Management**: Low stock alerts
7. **Pricing Rules**: Time-based dynamic pricing
8. **Access Control**: Role-based permissions

### UX Improvements

1. **Drag & Drop**: Reorder tickets in sidebar
2. **Keyboard Shortcuts**: Quick actions (Cmd+S to save)
3. **Undo/Redo**: History of changes
4. **Auto-save**: Periodic automatic saves
5. **Validation**: Real-time field validation
6. **Preview Modes**: Email preview, wallet preview

---

## 12. Testing Considerations

### Unit Tests

- CRUD operation handlers
- Search/filter logic
- State synchronization
- Helper functions (addPerk, removePerk, etc.)

### Integration Tests

- Component interaction
- Props passing
- Event handling
- Toast notifications

### E2E Tests

- Complete ticket creation flow
- Edit and save workflow
- Delete confirmation
- Search functionality
- CSV download

---

## 13. Accessibility

### Current Implementation

- Semantic HTML elements
- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels where needed

### Improvements Needed

- Screen reader announcements for dynamic content
- Keyboard shortcuts documentation
- High contrast mode support
- Focus trap in modals/dialogs

---

## 14. Performance Considerations

### Optimizations

- Memoization of filtered tickets
- Debounced search input
- Lazy loading of ticket list (future)
- Virtual scrolling for large lists (future)

### Bundle Size

- Tree-shaking unused Lucide icons
- Code splitting by route
- Lazy load heavy components

---

## 15. Dependencies

```json
{
    "dependencies": {
        "next": "16.0.7",
        "react": "19.2.0",
        "react-dom": "19.2.0",
        "framer-motion": "^12.23.25",
        "lucide-react": "^0.555.0",
        "sonner": "^1.x.x"
    }
}
```

---

## 16. File Structure

```
app/
└── tickets/
    └── page.tsx (Main container, state management)

components/
└── tickets/
    ├── TicketSidebar.tsx (Left panel)
    ├── TicketDesigner.tsx (Center container)
    ├── TicketPreview.tsx (Live preview)
    ├── TicketEditor.tsx (Tabbed editor)
    └── TicketDistribution.tsx (Right panel)
```

---

## 17. Known Issues & Limitations

1. **No Persistence**: Data is lost on page refresh (needs backend)
2. **Mock CSV**: CSV upload doesn't actually process files
3. **Static Perks**: VIP perks are hardcoded options
4. **No Validation**: Form fields lack validation
5. **Single Event**: All tickets belong to same event (hardcoded)

---

## 18. Changelog

### 2025-12-10 - Initial Implementation

- ✅ CRUD operations for tickets
- ✅ Live preview with dynamic data
- ✅ Tabbed editor with 4 sections
- ✅ Search and filter functionality
- ✅ Toast notifications (Sonner)
- ✅ CSV template download
- ✅ Ticket assignment simulation
- ✅ Discount code creation
- ✅ Cancel/revert changes
- ✅ Visual feedback for all actions
- ✅ Responsive design
- ✅ Context menu for delete
- ✅ VIP package builder
- ✅ Design color picker with presets

---

## 19. API Contract (Future Backend)

### Endpoints Needed

```
GET    /api/v1/events/{eventId}/tickets
POST   /api/v1/events/{eventId}/tickets
GET    /api/v1/tickets/{ticketId}
PUT    /api/v1/tickets/{ticketId}
DELETE /api/v1/tickets/{ticketId}
POST   /api/v1/tickets/{ticketId}/assign
POST   /api/v1/tickets/bulk-assign
POST   /api/v1/discount-codes
GET    /api/v1/discount-codes
```

### Expected Request/Response Formats

See `backend-tickets-management-audit.md` for detailed API specifications.

---

## 20. Summary

The Tickets page is now fully functional with:
- Complete CRUD operations
- Real-time search and filtering
- Live ticket preview
- Comprehensive editing interface
- Distribution and assignment tools
- Professional user feedback system
- Clean, maintainable code architecture

The implementation is ready for backend integration and provides an excellent foundation for future enhancements.
