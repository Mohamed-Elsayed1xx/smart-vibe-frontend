# SmartBayt — Full Stack E-Commerce Platform

A full-stack e-commerce platform for smart-home appliances, built with modern technologies.

## 🚀 Live Demo
Frontend: https://smartbayt-frontend-eight.vercel.app/

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite — Build tool
- Tailwind CSS — Styling
- Shadcn/UI — Component library
- TanStack Query — Data fetching & caching
- Axios — HTTP client

### Backend
- ASP.NET Core — REST API
- Entity Framework Core — ORM
- PostgreSQL — Database
- JWT Authentication — Secure auth
- BCrypt — Password hashing
- Cloudinary — Image hosting

## ✨ Features
- 🔐 JWT Authentication (Register / Login)
- 🛒 Shopping cart & wishlist
- 🏷️ Discount coupon system (percentage & fixed value)
- ⭐ Product reviews with admin approval workflow
- 📦 Order management & checkout flow
- 🛡️ Admin panel (products, orders, users, coupons, reviews)
- 🖼️ Image upload via Cloudinary
- 🌙 Dark / Light mode
- 📱 Fully responsive

## 🏗️ Architecture
```
smartbayt-frontend-main/      # Frontend (React + TypeScript)
├── src/
│   ├── api/                    # API layer (axios, auth, products, orders)
│   ├── components/
│   │   ├── admin/                # Admin panel components
│   │   ├── cart/                  # Cart components
│   │   ├── products/               # Product listing & details
│   │   ├── search/                  # Search & filters
│   │   ├── home/                     # Homepage sections
│   │   ├── layout/                    # Layout components
│   │   └── ui/                         # Reusable UI primitives
│   ├── context/                          # React context (Auth, Cart, Theme)
│   ├── hooks/                              # Custom React hooks
│   ├── pages/                               # Page components (incl. admin)
│   └── utils/                                # Helper utilities

SmartBayt.API/                # Backend (ASP.NET Core)
├── Controllers/                 # API endpoints (Auth, Products, Orders, etc.)
├── Models/                       # Database models
├── DTOs/                          # Data transfer objects
├── Data/                            # DbContext
├── Helpers/                          # JWT helper
└── Migrations/                        # EF Core migrations
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- .NET 10 SDK
- PostgreSQL 17

### Backend Setup
```bash
cd SmartBayt.API
# Update connection string in appsettings.json
dotnet ef database update
dotnet run
```

### Frontend Setup
```bash
cd smartbayt-frontend-main
npm install
npm run dev
```

## 📊 Database Schema
- **Users** — Authentication & profiles
- **Products** — Product catalog
- **Orders** — Order records & items
- **Reviews** — Product reviews (with approval status)
- **Coupons** — Discount codes

## 📝 Notes
- Images are uploaded and served via Cloudinary
- Frontend deployed on Vercel, backend + database on Railway

## 👨‍💻 Developer
Built by **Mohamed Elsayed** as a portfolio project showcasing full-stack development skills.
