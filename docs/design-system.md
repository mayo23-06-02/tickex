# Tickex Design System

## Overview
This document outlines the complete design system for Tickex, ensuring consistency across all components and pages.

---

## 1. Layout & Structure

### Grid System
- **12-column responsive grid** for dashboards
- Consistent breakpoints:
  - Mobile: `< 768px`
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`

### Spacing Scale
Use the **8px scale** for all spacing:
- `8px` (0.5rem)
- `16px` (1rem)
- `24px` (1.5rem)
- `32px` (2rem)
- `40px` (2.5rem)
- `48px` (3rem)

### Hierarchy
1. **Top**: KPIs and critical actions
2. **Middle**: Primary content and data
3. **Bottom**: Secondary information

### Navigation
- **Sidebar**: Persistent left sidebar for module navigation (Contacts, Deals, Reports, etc.)
- **Top Bar**: Global actions and context (search, notifications, user profile)

---

## 2. Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Fallback**: system-ui, sans-serif

### Font Sizes
```css
H1: 24px (1.5rem) - Page titles
H2: 20px (1.25rem) - Section headers
H3: 16px (1rem) - Subsection headers
Body: 14px-16px (0.875rem-1rem) - Regular text
Small: 12px (0.75rem) - Labels, captions
```

### Font Weights
- **Light (300)**: Secondary information
- **Regular (400)**: Body text, labels
- **Medium (500)**: Emphasized text
- **Bold (700)**: Metrics, headings

---

## 3. Color Palette

### Brand Colors
```css
Primary (Brand Purple): #7A3FFF
Accent (Gradient): #C86DD7
Primary Foreground: #FFFFFF
```

### Neutral Colors
```css
Background (Light): #F5F5F5
Foreground (Dark Text): #333333
Card Background: #FFFFFF
Border: #e2e8f0
```

### Status Colors
```css
Success (Green): #27AE60
Warning (Orange): #F2994A
Error (Red): #EB5757
Info (Blue): #2D9CDB
```

### Usage Guidelines
- **Gradients**: Use for hero sections, primary buttons
  - `background: linear-gradient(to right, #7A3FFF, #C86DD7)`
- **Solids**: Use for text, icons, and secondary elements
- **Opacity**: Use `/10`, `/20`, `/50` for backgrounds
  - Example: `bg-primary/10` for subtle highlights

---

## 4. Components

### Cards
- **Border Radius**: 8px (`rounded-lg`)
- **Shadow**: `shadow-sm` (default), `shadow-md` (hover)
- **Padding**: 24px (`p-6`)
- **Border**: 1px solid `border`

```tsx
<div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
  {/* Content */}
</div>
```

### Buttons

#### Primary Button (Gradient)
```tsx
<button className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 shadow-md">
  Primary Action
</button>
```

#### Secondary Button (Solid)
```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 shadow-sm">
  Secondary Action
</button>
```

#### Tertiary Button (Outline)
```tsx
<button className="border border-input bg-transparent px-4 py-2 rounded-lg font-medium hover:bg-muted text-foreground">
  Tertiary Action
</button>
```

### Tables
- **Responsive**: Horizontal scroll on mobile
- **Sortable**: Arrow indicators on headers
- **Sticky Headers**: For long tables
- **Row Hover**: `hover:bg-muted/50`

### Forms
- **Labels**: Clear, positioned above inputs
- **Validation**: Inline error messages
- **Spacing**: Consistent 16px between fields
- **Focus States**: Ring with primary color

---

## 5. Interactions

### Hover States
- **Buttons**: Gradient shift or opacity change
- **Cards**: Subtle shadow increase
- **Links**: Underline or color change

### Click Feedback
- **Ripple Effect**: For primary actions
- **Color Darkening**: For secondary actions

### Loading States
- **Skeleton Screens**: For tables and cards
- **Spinners**: For inline actions

### Notifications
- **Toasts**: Success/error messages (top-right)
- **Badge Counters**: For inbox/tasks

---

## 6. Accessibility

### Contrast Ratios
- **Minimum**: 4.5:1 for normal text
- **Large Text**: 3:1 for 18px+ or 14px+ bold

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Focus States**: Visible ring with `focus:ring-2 focus:ring-ring`

### ARIA Labels
- All icons and interactive elements have descriptive labels
- Screen reader announcements for dynamic content

### Responsive Design
- **Mobile**: Stacked layout, full-width components
- **Desktop**: Grid layout, multi-column

---

## 7. Data Visualization

### Chart Colors
```css
Primary: #7A3FFF (brand)
Success: #27AE60 (growth, positive)
Error: #EB5757 (decline, negative)
Warning: #F2994A (caution)
Info: #2D9CDB (neutral data)
```

### Best Practices
- **Legends**: Always visible, aligned right
- **Tooltips**: Show exact values on hover
- **Simplicity**: Maximum 5 colors per chart
- **Consistency**: Use same colors for same data types

---

## 8. Brand Consistency

### Logo Usage
- **Format**: SVG (scalable)
- **Colors**: Solid purple text + white ticket icon on gradient background
- **Minimum Size**: 120px width
- **Clear Space**: 16px around logo

### Tone of Voice
- **Professional**: Clear, concise language
- **Approachable**: Friendly, helpful
- **Clear**: Avoid jargon, use simple terms

### Iconography
- **Library**: Lucide React (consistent set)
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Color**: Inherit from parent or use semantic colors

---

## CSS Variables Reference

All colors are defined as CSS variables in `app/globals.css`:

```css
:root {
  --primary: #7A3FFF;
  --primary-foreground: #ffffff;
  --secondary: #F5F5F5;
  --secondary-foreground: #333333;
  --accent: #C86DD7;
  
  --success: #27AE60;
  --warning: #F2994A;
  --error: #EB5757;
  --info: #2D9CDB;
  
  --background: #F5F5F5;
  --foreground: #333333;
  --card: #ffffff;
  --card-foreground: #333333;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #7A3FFF;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
}
```

---

## Tailwind Configuration

The design system is integrated with Tailwind CSS in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "var(--primary)",
    foreground: "var(--primary-foreground)",
  },
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)",
  info: "var(--info)",
  // ... etc
}
```

---

## Component Examples

### KPI Card
```tsx
<div className="bg-card rounded-xl p-6 shadow-sm border border-border">
  <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
  <div className="mt-2 flex items-baseline gap-2">
    <span className="text-2xl font-bold text-foreground">SZL 42,100</span>
    <span className="text-sm text-success">+12%</span>
  </div>
</div>
```

### Status Badge
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
  Confirmed
</span>
```

### Progress Bar
```tsx
<div className="h-2 bg-muted rounded-full overflow-hidden">
  <div className="h-full bg-primary rounded-full transition-all" style={{ width: '75%' }}></div>
</div>
```

---

## Migration Guide

When updating existing components:

1. Replace hardcoded colors with CSS variables
2. Use Tailwind classes: `bg-primary` instead of `bg-[#7A3FFF]`
3. Update button styles to match design system
4. Ensure consistent spacing (8px scale)
5. Add proper hover/focus states
6. Verify accessibility (contrast, keyboard nav)

---

## Resources

- **Figma**: [Design Files](#)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Logo**: `public/logo.svg`
