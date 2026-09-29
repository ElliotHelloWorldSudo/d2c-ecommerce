# Clothing Brand E-Commerce — D2C Fashion Store

Production-oriented D2C fashion e-commerce platform built with **Next.js 14+ App Router**, **TypeScript**, **Prisma ORM**, and vanilla **CSS Modules**.

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Then edit .env.local with your actual values
```

### 3. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (store)/            # Storefront routes
│   ├── (admin)/            # Admin dashboard (future)
│   └── api/                # API route handlers (future)
├── components/
│   ├── storefront/         # Customer-facing components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── ui/                 # Shared base UI components (future)
│   └── admin/              # Admin UI components (future)
├── lib/
│   └── mockData.ts         # Temporary mock product catalogue
├── types/
│   └── index.ts            # TypeScript interfaces
├── hooks/                  # Custom React hooks (future)
└── store/                  # Zustand state stores (future)

prisma/
└── schema.prisma           # PostgreSQL database schema
```

---

## 🛠 Tech Stack

| Layer | Technology |
|:---|:---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | CSS Modules + CSS Variables |
| Database Schema | PostgreSQL + Prisma ORM |
| State Management | Zustand (planned) |
| Validation | Zod (planned) |
| Icons | Lucide React |
| Hosting | Vercel (planned) |

---

## 📋 Available Scripts

| Command | Purpose |
|:---|:---|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint code quality checks |

---

## ✅ Current Implementation Status

- [x] Project scaffold (Next.js App Router + TypeScript)
- [x] CSS design tokens and global stylesheet
- [x] Responsive Header with mobile drawer navigation
- [x] Footer with navigation links
- [x] ProductCard component (image-first, color swatches, hover swap)
- [x] Homepage shell (editorial hero + category filters + product grid)
- [x] Shop page (`/shop`)
- [x] Dynamic subcategory pages (`/shop/baggy`, `/shop/wide-leg`)
- [x] Product Detail Page shell (`/product/[slug]`)
- [x] Prisma database schema
- [x] Mock product catalogue (10 items: 5 Baggy + 5 Wide-Leg)
- [x] Environment variable structure

### Not yet implemented (next phases)
- [ ] Authentication (NextAuth.js)
- [ ] Real database connection + Prisma migrations
- [ ] Cart state management (Zustand)
- [ ] Wishlist (persistent)
- [ ] Checkout flow
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Order management

---

## ⚠️ Important Notes

- **Brand name, logo, colors, and pricing are TBD** per PROJECT_SPEC.md — placeholder values are used.
- Mock product images sourced from Unsplash for development only.
- `prisma/schema.prisma` is ready but requires a live PostgreSQL database to run migrations.
- Secrets belong in `.env.local` — never commit real credentials.

---

*See `PROJECT_SPEC.md` for full product requirements.*
