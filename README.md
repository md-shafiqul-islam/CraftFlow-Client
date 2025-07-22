CraftFlow - Employee Management System
Live Site: https://craftflow-57fc0.web.app/

Admin Credentials
Email: admin@gmail.com
Password: A1234@

Project Overview
CraftFlow is a full-stack employee management web app designed to help companies monitor employee workloads, track payments, and streamline HR operations with role-based access control. It’s responsive, secure, and built with modern tools like React, Firebase, MongoDB, and TanStack Query.

Key Features
Role-based Authentication: Secure login and registration with Firebase email/password and social (Google) authentication. Roles: Employee, HR, Admin.

Employee Dashboard: Employees can submit daily work reports, edit or delete tasks without page reloads, and view their payment history.

HR Dashboard: View and verify employee profiles, approve payments, and access detailed reports with charts.

Admin Dashboard: Manage all users, promote employees to HR, fire users to disable login, and approve payroll requests.

Real-time Updates: UI instantly reflects CRUD operations with no page reload using React Query and state management.

Responsive Design: Works seamlessly across mobile, tablet, and desktop devices.

Secure API: Backend protects role-specific routes with JWT/Firebase token middleware for authorization.

Payment Integration: HR can initiate salary payments; Admin can approve them, preventing duplicate payments for the same month.

Data Visualization: Dynamic charts display employee salary history and workload summaries.

Notifications: Friendly toast and modal alerts for actions like login, errors, CRUD operations, and payments — no default browser alerts.

Image Upload: User profile photos uploaded via imgbb API during registration.

Environment Variables: Sensitive config data like Firebase and MongoDB credentials hidden in environment variables.

Clean Code & Git Commits: Over 20 meaningful commits on client and 12 on server showcasing development progress.

Tech Stack
React, React Hook Form, React Query, React Router

Firebase Authentication

Express.js + MongoDB backend

Tailwind CSS + DaisyUI for styling

TanStack Table for data grids

Stripe for payment processing

Axios for HTTP requests
