# Data Audit: Dashboard & Analytics API

**Date**: 2025-12-10
**Status**: DRAFT
**Module**: Dashboard (Frontend) -> Backend API

## 1. Overview
This document details the data requirements for the main Organizer Dashboard (`components/dashboard/MetricGrid.tsx`, `TimelineSection.tsx`), focusing on high-level KPIs and demographic data.

---

## 2. Frontend Data Model

### Metric Cards
1.  **Total Sales**: Currency amount, comparison stats.
2.  **Tickets Sold**: `sold_count` / `total_capacity`, percentage circle.
3.  **Demographics**: Basic breakdown (gender/age groups - implied from `DemographicsMetric`).
4.  **Real-Time Sales**: "Live" indicator, potentially velocity (tickets/minute).

### Timeline
- **Sales over time**: Chart points `[date, amount]`.

---

## 3. Proposed Backend Schema (SQL)

### Schema Logic
No new tables strictly required just for the dashboard, but specialized views are recommended for performance.

### Views (Virtual or Materialized)
- `view_event_daily_sales`: Aggregates sales by day.
- `view_event_demographics`: Aggregates user data (if available) or anonymous metadata collected during purchase (e.g., "Age Range" question).

---

## 4. API Contract

### GET `/api/v1/events/{id}/analytics/overview`
Aggregates all Dashboard KPIs in one call to reduce latency.
```json
{
  "totalSales": {
    "current": 42100.00,
    "previous": 37400.00, // For "vs last event" or "vs last month"
    "trend": 12.5
  },
  "ticketsSold": {
    "sold": 842,
    "total": 1200,
    "percentage": 70.1
  },
  "demographics": {
    "gender": { "male": 45, "female": 52, "other": 3 },
    "age": { "18-24": 30, "25-34": 50, "35+": 20 }
  },
  "salesVelocity": {
    "current": 5, // sales per hour
    "status": "peak" // quiet, steady, peak
  }
}
```

### GET `/api/v1/events/{id}/analytics/timeline`
Returns time-series data for charts.
- **Query**: `range=7d` | `30d` | `all`.
```json
[
  { "date": "2025-03-01", "amount": 1200, "tickets": 10 },
  { "date": "2025-03-02", "amount": 1500, "tickets": 12 }
]
```

---

## 5. Performance Notes
1.  **Caching**: The generic dashboard stats should be cached (Redis) for 1-5 minutes to prevent heavy DB load on checking `bookings` count constantly.
2.  **Real-Time**: The "Real-Time" metric card should likely use a lightweight ping or SSE (Server-Sent Events) for the "Live" effect, rather than full polling.
