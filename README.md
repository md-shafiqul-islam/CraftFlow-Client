# CraftFlow - Employee Management System

**Live Site URL:**  
🌐 [https://craftflow-57fc0.web.app](https://craftflow-57fc0.web.app)

## 🧪 Admin Test Credentials

Email: admin@gmail.com  
Password: A1234@

## 🚀 Project Description

**CraftFlow** is a full-stack role-based employee management system that allows employees to log work hours, HRs to manage and verify users and initiate payrolls, and Admins to approve salary payments via Stripe. The app supports secure authentication with Firebase, protected routes with JWT, and real-time dashboard updates.

## 🔥 Key Features

- ✅ **User Authentication (Email, Google & Role Selection)**

  - Supports registration via email/password and social login (Google).
  - Role selection at sign-up (Employee or HR only).

- 🔐 **JWT-Protected Routes**

  - Backend APIs are protected using JWT.
  - Access is role-based: Employee, HR, or Admin.

- 📝 **Task Submission & Management (Employee)**

  - Employees can log work hours with task name, date, and hours.
  - Tasks are editable and deletable.

- 📋 **Employee List & Verification (HR)**

  - HR can view and verify employees.
  - Verified employees are eligible for salary payment.

- 📅 **Work Record Filter (HR)**

  - Filter employee task records by name and month.
  - View total work hours for any month.

- 💸 **Payroll Request (HR) & Payment (Admin)**

  - HR initiates salary requests for verified employees.
  - Admin views pending requests and approves payments via Stripe.
  - Prevents duplicate payment for the same month.

- 🛑 **Fire or Promote Users (Admin)**

  - Admin can promote employees to HR.
  - Admin can fire (soft-disable) employees, preventing login access.

- 📊 **Charts & Dashboards**

  - Salary payment and work log history shown via Recharts.

- 🖼️ **Image Upload**

  - Profile photos uploaded to imgbb during registration.

- ✨ **Sleek UI/UX**
  - Dashboard styled with TailwindCSS, DaisyUI, SweetAlert2, and Lottie animations.

## 🧰 Tech Stack

### Frontend:

- React 19
- React Router 7
- React Hook Form + Yup
- Firebase Authentication
- React Query (TanStack)
- TailwindCSS + DaisyUI
- Recharts, Lottie, SweetAlert2
- Axios with interceptors
- Hosted on Firebase

### Backend:

- Node.js + Express
- MongoDB (MongoDB Atlas)
- Firebase Admin SDK
- JWT Authentication
- Stripe Payment Integration
- CORS, dotenv
- Hosted on Vercel

## 🛡️ Security

- Firebase access token is retrieved on login and injected into Axios headers.
- Role-based access control for all protected endpoints.
- Token verification with Firebase Admin SDK and custom middleware.
- Auto logout on token expiration or unauthorized access.

---

### 📁 Folder Structure

- `client/` — React frontend with pages, layouts, components, hooks, and services
- `server/` — Node.js backend with routes, controllers, middleware, and configs

---

### 👨‍💻 Author

Developed by Md. Shafiqul Islam

---

Feel free to fork, clone, or contribute!
