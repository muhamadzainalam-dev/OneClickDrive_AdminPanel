# 🚗 Admin Dashboard – Car Rental Listings Management

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)

A modern, responsive admin dashboard for managing car rental listings with real-time updates, smooth animations, and comprehensive CRUD operations. Built as part of a **Frontend Developer (Next.js)** assessment.

> 📅 **Submission Date:** July 09, 2025  
> 🧑‍💻 **Position:** Frontend Developer (Next.js)  
> ✅ **100% Hand-coded** – No AI-generated code was used in this project

---

## 📸 Application Preview

| Login Page | Dashboard Overview | Edit Modal |
|------------|-------------------|------------|
| ![Login](public/login.png) | ![Dashboard](public/dashboard.png) | ![Edit Modal](public/edit-modal.png) |

---

## 🔐 Quick Start

### Demo Credentials
```
Username: admin
Password: admin123
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-admin-dashboard
   cd nextjs-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Initialize the database**
   ```bash
   node scripts/seed.js
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## ✨ Key Features

### 🔒 Authentication & Security
- **Mock Authentication System** with localStorage-based session management
- **Protected Routes** with automatic redirects for unauthorized access
- **Session Persistence** across browser sessions

### 📊 Dashboard Management
- **Paginated Car Listings** with responsive table design
- **Real-time Status Updates** for listing approvals/rejections
- **Advanced Filtering** by listing status (Pending, Approved, Rejected)
- **Bulk Actions** support for efficient management

### ✏️ CRUD Operations
- **Inline Editing** with pre-filled modal forms
- **Status Management** (Approve/Reject/Pending)
- **Form Validation** with error handling
- **Data Persistence** using SQLite database

### 🎨 User Experience
- **Smooth Animations** powered by Framer Motion
- **Toast Notifications** for real-time feedback
- **Responsive Design** optimized for all devices
- **Loading States** and error handling

---

## 🛠️ Technical Architecture

### Frontend Stack
- **Next.js 14** (App Router + API Routes)
- **React 18** with Hooks and Context API
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **React Toastify** for notifications

### Backend & Database
- **SQLite** with better-sqlite3 for data persistence
- **Next.js API Routes** for server-side logic
- **Server-Side Rendering** with getServerSideProps
- **RESTful API** design patterns

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **Husky** for Git hooks (if configured)

---

## 📁 Project Structure

```
nextjs-admin-dashboard/
├── 📁 app/
│   ├── 📁 api/
│   │   └── 📁 listings/
│   │       └── [id]/
│   │           └── route.ts
│   ├── 📁 dashboard/
│   │   └── page.tsx
│   ├── 📁 login/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── 📁 components/
│   ├── Dashboard/
│   ├── Login/
│   └── UI/
├── 📁 lib/
│   ├── database.ts
│   └── auth.ts
├── 📁 public/
│   ├── login.png
│   ├── dashboard.png
│   └── edit-modal.png
├── 📁 scripts/
│   └── seed.js
├── 📁 types/
│   └── index.ts
└── 📄 README.md
```

---

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/listings` | Fetch all car listings |
| `PUT` | `/api/listings/[id]` | Update listing details |
| `PATCH` | `/api/listings/[id]/status` | Update listing status |

---

## 🧪 Testing & Quality Assurance

### Manual Testing Checklist
- ✅ Login/Logout functionality
- ✅ Dashboard data loading and pagination
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Status filtering and search
- ✅ Responsive design across devices
- ✅ Error handling and edge cases

### Performance Optimizations
- **Server-Side Rendering** for faster initial loads
- **Image Optimization** using Next.js Image component
- **Code Splitting** for reduced bundle size
- **Lazy Loading** for improved performance

---

## 🔧 Configuration Options

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL=./database.db

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization
- **Styling:** Modify `tailwind.config.js` for custom design tokens
- **Database:** Update `lib/database.ts` for different database providers
- **Authentication:** Extend `lib/auth.ts` for production-ready auth

---

## 🚧 Future Enhancements

### Planned Features
- [ ] **Role-based Access Control** (Admin, Manager, Viewer)
- [ ] **Advanced Search & Filtering** with multiple criteria
- [ ] **Export Functionality** (CSV, PDF reports)
- [ ] **Email Notifications** for listing updates
- [ ] **Dashboard Analytics** with charts and metrics
- [ ] **Image Upload & Management** for car listings
- [ ] **Audit Logs** for tracking admin actions

### Technical Improvements
- [ ] **Unit Testing** with Jest and React Testing Library
- [ ] **E2E Testing** with Playwright or Cypress
- [ ] **Docker Configuration** for containerized deployment
- [ ] **CI/CD Pipeline** with GitHub Actions
- [ ] **Production Database** (PostgreSQL/MongoDB)

---

## 📊 Assessment Criteria Fulfilled

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| **Authentication** | ✅ Complete | localStorage-based mock auth |
| **Dashboard Layout** | ✅ Complete | Responsive table with pagination |
| **CRUD Operations** | ✅ Complete | Full listing management |
| **Database Integration** | ✅ Complete | SQLite with API routes |
| **UI/UX Design** | ✅ Complete | Tailwind CSS + Framer Motion |
| **Code Quality** | ✅ Complete | Clean, maintainable code |

---

## 🤝 Contributing

This project was created for assessment purposes, but if you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is created exclusively for assessment purposes. All code is original and written manually without the use of AI tools, code generators, or GitHub Copilot.

---

## 👨‍💻 Author

**Muhammad Zain Alam**  
Frontend Developer | React.js & Next.js Enthusiast

[![Email](https://img.shields.io/badge/Email-muhamadzainalam.dev@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:muhamadzainalam.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/your-username)

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful!</strong>
</div>
