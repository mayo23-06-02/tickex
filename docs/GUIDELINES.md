# 📐 Tickex Application Guidelines

## Quick Reference

This document provides a quick reference for the Tickex design system. For complete details, see [design-system.md](./design-system.md).

---

## 1. Layout & Structure

### Grid System
- **12-column responsive grid** for dashboards

### Spacing
- Use **8px scale**: 8, 16, 24, 32, 40, 48

### Hierarchy
1. **Top**: KPIs and critical actions
2. **Middle**: Primary content
3. **Bottom**: Secondary info

### Navigation
- **Sidebar**: Persistent for modules (Contacts, Deals, Reports)
- **Top Bar**: Global actions (search, notifications, profile)

---

## 2. Typography

### Font
- **Primary**: Inter (sans-serif)

### Sizes
- **H1**: 24px
- **H2**: 20px
- **H3**: 16px
- **Body**: 14px–16px

### Usage
- **Bold**: Metrics, headings
- **Regular**: Labels, body text
- **Light**: Secondary info

---

## 3. Color & Theme

### Primary Palette
- **Brand Purple**: `#7A3FFF`
- **Gradient Accent**: `#C86DD7`

### Secondary Palette
- **Light Gray**: `#F5F5F5` (backgrounds)
- **Dark Gray**: `#333333` (text)

### Status Colors
- **Success**: `#27AE60` (Green)
- **Warning**: `#F2994A` (Orange)
- **Error**: `#EB5757` (Red)
- **Info**: `#2D9CDB` (Blue)

### Guidelines
- **Gradients**: Hero sections, primary buttons
- **Solids**: Text, icons, secondary elements

---

## 4. Components

### Cards
- **Border Radius**: 8px
- **Padding**: 24px
- **Shadow**: `shadow-sm` → `shadow-md` on hover

### Tables
- **Responsive**: Horizontal scroll on mobile
- **Sortable**: Arrow indicators
- **Sticky Headers**: For long tables

### Forms
- **Clear Labels**: Above inputs
- **Inline Validation**: Error messages
- **Consistent Spacing**: 16px between fields

### Buttons

#### Primary (Gradient)
```tsx
className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
```

#### Secondary (Solid)
```tsx
className="bg-primary text-primary-foreground"
```

#### Tertiary (Outline)
```tsx
className="border border-input bg-transparent hover:bg-muted"
```

---

## 5. Interactions

### Hover States
- **Gradient Shift**: Primary buttons
- **Subtle Shadow**: Cards

### Click Feedback
- **Ripple**: Primary actions
- **Color Darkening**: Secondary actions

### Loading
- **Skeleton Screens**: Tables/cards
- **Spinners**: Inline actions

### Notifications
- **Toasts**: Success/error (top-right)
- **Badge Counters**: Inbox/tasks

---

## 6. Accessibility

### Contrast
- **Minimum**: 4.5:1 for text

### Keyboard Navigation
- **Tab Order**: Logical flow
- **Focus States**: Visible ring

### ARIA Labels
- All icons and interactive elements

### Responsive
- **Mobile**: Stacked layout
- **Desktop**: Grid layout

---

## 7. Data Visualization

### Chart Colors
- **Purple**: Brand data
- **Green**: Growth/positive
- **Red**: Decline/negative

### Best Practices
- **Legends**: Always visible, right-aligned
- **Tooltips**: Exact values on hover
- **Simplicity**: Max 5 colors per chart

---

## 8. Brand Consistency

### Logo
- **Official Logo**: `public/logo.svg`
- **Usage**: Solid purple text + white ticket icon on gradient background

### Tone
- **Professional**: Clear, concise
- **Approachable**: Friendly, helpful

### Icons
- **Library**: Lucide React
- **Consistency**: Use same set throughout

---

## CSS Variables

Use these Tailwind classes for consistency:

```tsx
// Colors
bg-primary          // Brand purple
bg-success          // Green
bg-warning          // Orange
bg-error            // Red
bg-info             // Blue

// Text
text-foreground     // Dark text
text-muted-foreground // Gray text

// Backgrounds
bg-background       // Light gray
bg-card             // White
bg-muted            // Subtle gray

// Borders
border-border       // Standard border
```

---

## Quick Component Templates

### KPI Card
```tsx
<div className="bg-card rounded-xl p-6 border border-border shadow-sm">
  <h3 className="text-sm font-medium text-muted-foreground">Label</h3>
  <p className="text-2xl font-bold text-foreground mt-2">Value</p>
</div>
```

### Status Badge
```tsx
<span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
  Status
</span>
```

### Primary Button
```tsx
<button className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-md hover:opacity-90">
  Action
</button>
```

---

## Resources

- **Design System**: [design-system.md](./design-system.md)
- **Logo**: `public/logo.svg`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)
