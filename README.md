# TickEx - Event Ticketing Platform

A comprehensive event management and ticketing platform built with Next.js, React, and TypeScript.

## 🎯 Overview

TickEx is a modern, full-featured event ticketing platform designed for event organizers in Eswatini and beyond. It provides tools for creating events, designing tickets, managing bookings, analyzing sales, and communicating with attendees.

## ✨ Features

### 📅 Event Management
- **Event Creation Wizard**: Multi-step process for creating events
- **Event Timeline**: Visual calendar of all events
- **Event Branding**: Custom styling and branding for each event
- **Event Policies**: Refund policies, age restrictions, terms & conditions

### 🎫 Ticket Management
- **Ticket Designer**: Visual ticket designer with live preview
- **Multiple Ticket Types**: VIP, General Admission, Early Bird, etc.
- **Dynamic Pricing**: Time-based and demand-based pricing
- **Perks & Benefits**: Add custom perks to ticket types
- **Access Rules**: Entry gates, time restrictions, ID verification
- **Ticket Distribution**: Assign tickets, bulk CSV upload, discount codes

### 📊 Analytics & Insights
- **Real-time Dashboard**: Live sales metrics and KPIs
- **Predictive Forecasting**: AI-powered sales predictions
- **Revenue Analytics**: Detailed financial reporting
- **Demographics**: Audience breakdown and insights
- **Sales Intelligence**: AI-driven recommendations

### 💰 Financial Management
- **Payout Schedule**: Automated payout tracking
- **Payment Methods**: Multiple payment gateway support
- **Tax Compliance**: Tax reporting and compliance tools
- **Invoice Management**: Generate and manage invoices
- **Revenue Tracking**: Comprehensive revenue analytics

### 📧 Communications
- **Campaign Management**: Email and SMS campaigns
- **Campaign Analytics**: Track open rates, clicks, conversions
- **Audience Segmentation**: Target specific customer groups
- **Template Library**: Pre-built email templates
- **Multi-channel**: Email, SMS, push notifications

### 👥 Customer Management
- **Customer Profiles**: Detailed customer information
- **Purchase History**: Track customer purchases
- **Segmentation**: Group customers by behavior
- **Communication History**: View all customer interactions

### 🎨 Branding & Website Builder
- **Drag-and-Drop Builder**: Visual website builder
- **Component Library**: Pre-built components
- **Responsive Design**: Mobile-friendly designs
- **Custom Styling**: Full design customization
- **Live Preview**: See changes in real-time

### 📸 Media Gallery
- **Asset Management**: Upload and organize media
- **Image Optimization**: Automatic image optimization
- **Search & Filter**: Find assets quickly
- **Usage Tracking**: See where assets are used

### 🌐 Public Landing Page
- **Event Discovery**: Browse events by category
- **Search**: Find events, artists, venues
- **Featured Events**: Highlighted events
- **Trending**: Popular events
- **Bookmarks**: Save favorite events
- **Share**: Share events on social media

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.7 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12.23.25
- **Icons**: Lucide React 0.555.0
- **Notifications**: Sonner
- **Date Handling**: date-fns 4.1.0

### Development Tools
- **Linting**: ESLint 9
- **Package Manager**: npm
- **Node Version**: 20+

## 📁 Project Structure

```
tickex/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Dashboard
│   ├── landing/             # Public landing page
│   ├── events/              # Events management
│   ├── tickets/             # Ticket designer
│   ├── bookings/            # Bookings & sales
│   ├── customers/           # Customer management
│   ├── financials/          # Financial analytics
│   ├── communications/      # Campaign management
│   ├── branding/            # Website builder
│   ├── gallery/             # Media gallery
│   └── event-timeline/      # Event timeline
│
├── components/              # Reusable components
│   ├── layout/             # Layout components
│   ├── dashboard/          # Dashboard widgets
│   ├── events/             # Event components
│   ├── tickets/            # Ticket components
│   ├── bookings/           # Booking components
│   ├── customers/          # Customer components
│   ├── financials/         # Financial components
│   ├── communications/     # Communication components
│   ├── branding/           # Branding components
│   ├── gallery/            # Gallery components
│   └── ui/                 # Generic UI components
│
├── docs/                    # Documentation
│   ├── frontend-complete-documentation.md
│   ├── frontend-tickets-page-implementation.md
│   └── backend-*.md        # Backend API specs
│
├── app/globals.css         # Global styles
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tickex
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Dashboard: [http://localhost:3000](http://localhost:3000)
   - Landing Page: [http://localhost:3000/landing](http://localhost:3000/landing)

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📖 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Frontend Complete Documentation](docs/frontend-complete-documentation.md)**: Full app overview
- **[Tickets Page Implementation](docs/frontend-tickets-page-implementation.md)**: Detailed tickets page docs
- **Backend API Specs**: API contracts for all modules

## 🎨 Design System

### Color Palette
- **Primary**: `#1DB954` (Green)
- **Primary Hover**: `#1ed760`
- **Dark**: `#0f172a`
- **Medium**: `#64748b`
- **Light**: `#94a3b8`
- **Border**: `#e2e8f0`

### Typography
- **Font Family**: Geist Sans, Geist Mono
- **Headings**: 4xl, 3xl, 2xl, xl
- **Body**: base, sm, xs

### Components
- **Buttons**: Primary, Secondary, Danger
- **Cards**: Standard, Hover, Interactive
- **Inputs**: Text, Select, Textarea, Checkbox
- **Modals**: Full-screen, Dialog, Drawer

## 🔑 Key Features by Page

### Dashboard (`/`)
- Metrics overview
- Predictive forecast
- Event timeline
- Quick actions

### Landing Page (`/landing`)
- Animated wave background
- Category browsing
- Featured events
- Search & filters
- Bookmark & share

### Tickets (`/tickets`)
- Visual ticket designer
- Live preview
- CRUD operations
- Bulk assignment
- Discount codes

### Events (`/events`)
- Event list
- Event creation wizard
- Event management
- Status tracking

### Bookings (`/bookings`)
- Bookings table
- Sales statistics
- Booking details
- Sales intelligence

### Financials (`/financials`)
- Revenue analytics
- Payout schedule
- Payment methods
- Tax compliance
- Invoices

### Communications (`/communications`)
- Campaign creation
- Email/SMS campaigns
- Analytics
- Audience segmentation

### Branding (`/branding`)
- Website builder
- Drag-and-drop
- Component library
- Live preview

## 🧪 Testing

### Unit Tests (Future)
```bash
npm run test
```

### E2E Tests (Future)
```bash
npm run test:e2e
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t tickex .
docker run -p 3000:3000 tickex
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Semantic commit messages

## 🔒 Security

- Environment variables for sensitive data
- API authentication (future)
- Input validation
- XSS protection
- CSRF protection

## 📊 Performance

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- CSS-based animations

## 🌍 Internationalization (Future)

- Multi-language support
- Currency conversion
- Date/time localization
- RTL support

## 📱 Mobile Support

- Responsive design
- Touch-friendly UI
- Mobile-optimized images
- Progressive Web App (PWA) ready

## 🐛 Known Issues

- No data persistence (requires backend)
- Mock data only
- No authentication
- No payment processing

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Frontend UI/UX
- ✅ Component library
- ✅ Design system
- ✅ Mock data

### Phase 2 (Next)
- [ ] Backend API integration
- [ ] Database setup
- [ ] Authentication
- [ ] Payment processing

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Real-time features
- [ ] Advanced analytics
- [ ] AI features

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Authors

- Development Team

## 🙏 Acknowledgments

- Next.js team
- React team
- Tailwind CSS team
- Open source community

## 📞 Support

For support, email support@tickex.sz or create an issue in the repository.

## 🔗 Links

- [Documentation](docs/)
- [API Specs](docs/backend-*.md)
- [Design System](docs/frontend-complete-documentation.md#6-design-system)

---

**Made with ❤️ in Eswatini**
