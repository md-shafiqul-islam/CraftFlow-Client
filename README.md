# 🚀 CraftFlow – Employee Management System

CraftFlow is a full-stack role-based employee management system tailored for interior design and renovation companies. It helps manage daily tasks, attendance, payroll, and team roles through separate dashboards for Employees, HRs, and Admins.

---

## 🔐 Admin Login Credentials

Use this admin account to explore the full functionality:

> **Email:** `admin@gmail.com`  
> **Password:** `A1234@`

---

## 🔧 Features

### 🧑‍💼 Employee Features
- Submit daily work logs with task name, hours, and date  
- Edit or delete your own submitted tasks  
- View task history with real-time updates  
- Auto-role assignment for new users via social login  

### 👩‍💼 HR Features
- View all verified employees in a structured table  
- Filter monthly work data by employee and date  
- Verify new employees before they appear in payroll  
- Process salary payments with amount, month & year via Stripe  
- See summarized work hours for any employee/month  

### 👨‍💻 Admin Features
- Approve/reject salary payments from HR  
- Promote verified employees to an HR role  
- Fire (soft-disable) employees to restrict login  
- Full access to view the user database and dashboards  

### 🔐 Authentication & Access Control
- Firebase Auth with Email/Password and Google Login  
- JWT-based secure routing and backend authorization  
- Role-based dashboards with access isolation  
- Strong password validation and error handling  

### 📊 Usability & UX
- Fully responsive design with mobile-friendly layouts  
- Dashboard loading states and toast feedback for actions  
- Lottie animations for visual feedback on auth pages  
- Theme toggle with persistent dark/light mode  

### 🧰 Developer Experience
- Organized codebase using folder-by-feature pattern  
- React Query for data synchronization and cache management  
- TanStack Table for powerful filtering and sorting  
- Clean commit history and meaningful variable naming  
- Built with Vite for fast development and optimized builds  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS + DaisyUI  
- React Hook Form  
- React Router  
- React Query  
- TanStack Table  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT  
- Stripe API (salary payments)  

### Tools & Services
- Firebase Auth  
- Imgbb (image upload)  
- Vite  
- Lottie animations  
- SweetAlert2  

---

## 🌐 Live Site  
🔗 [https://craft-flow.netlify.app](https://craft-flow.netlify.app)

---

## 📁 Repositories  
**Client:** [github.com/md-shafiqul-islam/craftflow-client](https://github.com/md-shafiqul-islam/craftflow-client)  
**Server:** [github.com/md-shafiqul-islam/craftflow-server](https://github.com/md-shafiqul-islam/craftflow-server)

---

## 📸 Screenshots

| Login | Dashboard | Tasks |
|-------|-----------|--------|
| ![Login](https://i.ibb.co/XfLFvF9X/image2.png) | ![Dashboard](https://i.ibb.co/HfmPJxnz/image6.png) | ![Tasks](https://i.ibb.co/xtX9b0Hy/image8.png) |

---

## 🧪 Getting Started

To run this project locally:

# 1. Clone the repositories
git clone https://github.com/md-shafiqul-islam/craftflow-client.git
git clone https://github.com/md-shafiqul-islam/craftflow-server.git

# 2. Install dependencies for both
cd craftflow-client
npm install

cd ../craftflow-server
npm install

# 3. Set up environment variables
# For client: create `.env` file inside `craftflow-client`
VITE_API_URL=https://craftflow-server.vercel.app
VITE_IMGBB_API_KEY=VITE_image_key
VITE_FIREBASE:
API_KEY=VITE_apiKey
AUTH_ADMIN=VITE_authDomain
PROJECTID=projectId
STORAGEBUCKET=VITE_storageBucket
MESSAGING_SENDER_ID=VITE_messagingSenderId
APPID=VITE_appId

# For server: create `.env` inside `craftflow-server`
PORT=5000
DB_URL=MONGODB_URI
ACCESS_TOKEN_SECRET=FB_SERVICE_KEY
STRIPE_SECRET_KEY=PAYMENT_GATEWAY_KEY

# 4. Run both servers
# In one terminal:
cd craftflow-server
nodemon index.js

# In another terminal:
cd craftflow-client
npm run dev

---

## 📄 License  
This project is open-source and available under the [MIT License](LICENSE).

---
