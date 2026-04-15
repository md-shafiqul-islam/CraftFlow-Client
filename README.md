# 🚀 CraftFlow – Employee Management System

A full-stack role-based employee management platform that streamlines task tracking, employee verification, payroll handling, and secure payments.

---

## 🌐 Live Demo
👉 https://craft-flow.netlify.app/

---

## 🧾 Project Overview

**CraftFlow** is a role-based workforce management system where:

- 👨‍💻 Employees log daily work and track productivity  
- 🧑‍💼 HR verifies employees, manages records, and initiates payroll  
- 🧑‍💻 Admin approves payments and manages roles securely  

It includes secure authentication, protected APIs, and real-time dashboard updates.

---

## 🔐 Demo Credentials (Admin)

Email: admin@gmail.com  
Password: A1234@

---

## ✨ Key Features

### 🔑 Authentication & Authorization
- Email/password + Google login support
- Role selection during registration (Employee / HR)
- Firebase Authentication integration

---

### 🛡️ Secure Access Control
- JWT-protected backend APIs
- Role-based permissions (Employee / HR / Admin)
- Firebase Admin SDK verification middleware
- Auto logout on token expiration

---

### 📝 Employee Features
- Log daily tasks (task name, hours, date)
- Edit or delete submitted tasks
- Track personal work history

---

### 🧑‍💼 HR Features
- View all employees
- Verify employee accounts
- Filter work records by employee and month
- Calculate monthly work hours
- Initiate salary/payment requests

---

### 💸 Admin Features
- Approve salary requests via Stripe
- Prevent duplicate monthly payments
- Promote employees to HR
- Fire or disable users (soft block login access)

---

### 📊 Dashboard & Analytics
- Work logs visualization using Recharts
- Salary/payment tracking dashboard
- Real-time updates for system activities

---

### 🖼️ Media Handling
- Profile image upload via ImgBB
- Secure image storage and retrieval

---

### 🎨 UI/UX
- TailwindCSS + DaisyUI responsive UI
- SweetAlert2 notifications
- Lottie animations
- Clean dashboard experience

---

## 🧰 Tech Stack

### Frontend
- React 19
- React Router 7
- React Hook Form + Yup
- Firebase Authentication
- TanStack React Query
- Axios (interceptors)
- TailwindCSS + DaisyUI
- Recharts
- Lottie
- SweetAlert2
- Hosted on Firebase

---

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- Firebase Admin SDK
- JWT Authentication
- Stripe Payment Integration
- CORS + dotenv
- Hosted on Vercel

---

## 🛡️ Security

- Firebase ID token verification
- JWT-based route protection
- Role-based access control
- Axios interceptor for auth headers
- Automatic unauthorized handling

---

# Feel free to fork, clone, or contribute!

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/md-shafiqul-islam/CraftFlow-Client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm run dev
```

### 👨‍💻 Author

Developed by Md. Shafiqul Islam

---
