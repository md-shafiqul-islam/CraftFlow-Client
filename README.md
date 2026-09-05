# CraftFlow — Employee Management System

A full-stack, role-based employee management system for tracking daily work,
employee verification, payroll workflows, and salary payments.

<p>
  <a href="https://craft-flow.netlify.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit-success?style=for-the-badge" alt="CraftFlow Live Demo" />
  </a>
  <a href="https://github.com/md-shafiqul-islam/CraftFlow-Server">
    <img src="https://img.shields.io/badge/Backend-Repository-black?style=for-the-badge&logo=github" alt="CraftFlow Server Repository" />
  </a>
</p>

---

## 📋 Project Overview

CraftFlow is a role-based workforce management application with dedicated
dashboards for Employees, HR, and Admin users.

- 👨‍💻 **Employees** can log daily work and track their work history.
- 🧑‍💼 **HR** can verify employees, manage work records, and initiate payroll.
- 🧑‍💻 **Admins** can manage roles, approve salary payments, and control user access.

The application includes authentication, role-based access control, protected
operations, dashboard analytics, and Stripe payment integration.

---

## ✨ Key Features

### 🔐 Authentication & Access Control

- Email/password and Google authentication
- Firebase Authentication integration
- Role-based access control for Employee, HR, and Admin users
- Protected routes and secure API access
- Automatic unauthorized handling

### 👨‍💻 Employee Dashboard

- Log daily tasks and working hours
- Edit or delete submitted work records
- Track personal work history

### 🧑‍💼 HR Dashboard

- View and manage employee records
- Verify employee accounts
- Filter work records by employee and month
- Calculate monthly work hours
- Initiate salary and payment requests

### 🧑‍💻 Admin Dashboard

- Manage employee roles
- Promote employees to HR
- Approve salary requests
- Process payments through Stripe
- Prevent duplicate monthly payments
- Disable user access when required

### 📊 Dashboard & Analytics

- Work activity visualization with Recharts
- Salary and payment tracking
- Dynamic updates for application activities

### 🎨 User Experience

- Responsive interface built with Tailwind CSS and DaisyUI
- Form handling and validation
- SweetAlert2 notifications
- Lottie animations
- Profile image upload with ImgBB

---

## 🛠️ Tech Stack

### Frontend

- React 19
- React Router 7
- JavaScript
- TanStack React Query
- Axios
- React Hook Form
- Yup
- Firebase Authentication
- Tailwind CSS
- DaisyUI
- Recharts
- SweetAlert2
- Lottie

### Backend

The backend repository is available here:

👉 [CraftFlow Server](https://github.com/md-shafiqul-islam/CraftFlow-Server)

Built with:

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- JWT Authentication
- Stripe
- REST APIs

---

## 🛡️ Security

- Firebase ID token verification
- JWT-based API protection
- Role-based authorization
- Protected routes
- Axios interceptors for authenticated requests
- Unauthorized request handling

---

## 🔐 Demo Credentials

### Admin Account

**Email:** admin@gmail.com  
**Password:** A1234@

---

## 🌐 Live Project

👉 [Live](https://craft-flow.netlify.app/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/md-shafiqul-islam/CraftFlow-Client
```

### 2. Navigate to the Project
```bash
cd CraftFlow-Client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## 🔗 Related Repository

- Backend: [CraftFlow Server](https://github.com/md-shafiqul-islam/CraftFlow-Server)

---

### 👨‍💻 Author

Md. Shafiqul Islam

Software Engineer | Full-Stack Developer

- [Porfolio](https://shafiqul-islam.netlify.app/)
- [LinkedIn](https://www.linkedin.com/in/mdshafiqulislam1/)
- [GitHub](https://github.com/md-shafiqul-islam)

---
