# Data Audit: Financials & Analytics API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Financials (Frontend) -> Backend API

## 1. Overview
This document outlines the data requirements for the Financials Dashboard (`components/financials/FinancialsMetrics.tsx`), covering revenue, expenses, and transaction feeds.

---

## 2. Frontend Data Model
The `FinancialsMetrics` component displays:

### Aggregates
- **Total Revenue**: amount, growth_percentage, comparison_period.
- **Revenue Split**: Online Sales vs Box Office (amount + percentage/bar).
- **Projection**: Projected final revenue.
- **Total Expenses**: amount, profit_margin.
- **Expense Breakdown**: list of categories (Venue, Marketing, etc.) with amounts.

### Transaction Feed
- List of recent transactions: `name`, `time`, `amount`, `type` (Card/Cash), `status`.

---

## 3. Proposed Backend Schema (SQL)

### Table: `transactions`
Records all money movements (in and out).
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | NO | Primary Key |
| `event_id` | UUID | NO | Foreign Key |
| `booking_id` | UUID | YES | Linked booking (if income) |
| `type` | VARCHAR(10) | NO | 'credit' (income) or 'debit' (expense) |
| `amount` | DECIMAL(15, 2)| NO | |
| `currency` | VARCHAR(3) | NO | |
| `category` | VARCHAR(50) | NO | ticket_sale, refund, venue_cost, marketing |
| `source` | VARCHAR(50) | YES | online, box_office, external_vendor |
| `description` | TEXT | YES | |
| `created_at` | TIMESTAMPTZ | NO | |

### Table: `financial_projections`
(Optional: Or calculated on the fly based on sales velocity)
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | UUID | NO | |
| `projected_revenue` | DECIMAL | NO | AI/Algorithm prediction |
| `confidence_score` | DECIMAL | NO | |
| `updated_at` | TIMESTAMPTZ | NO | |

---

## 4. API Contract

### GET `/api/v1/events/{id}/financials/summary`
Returns the high-level metrics.
```json
{
  "revenue": {
    "total": 42100.00,
    "currency": "SZL",
    "growth": 12.5,
    "breakdown": {
      "online": 35280.00,
      "boxOffice": 6820.00
    },
    "projection": 58400.00
  },
  "expenses": {
    "total": 27786.00,
    "profitMargin": 34.0,
    "breakdown": [
      { "category": "Venue", "amount": 15000.00 },
      { "category": "Marketing", "amount": 8286.00 },
      { "category": "Production", "amount": 4500.00 }
    ]
  }
}
```

### GET `/api/v1/events/{id}/transactions`
Paginated list for the "Live Transaction Feed".
- **Query**: `limit=5` (for widget), `type=credit` (for sales).

---

## 5. Computation Logic
1.  **Profit Margin**: `((Revenue - Expenses) / Revenue) * 100`.
2.  **Growth**: Compare current period (e.g., this week) vs last period (last week).
3.  **Real-Time**: The "Live" feed implies either WebSocket connection or short polling (e.g., every 30s) on this endpoint.
