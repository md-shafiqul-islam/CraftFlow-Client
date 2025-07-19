import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTask from "../pages/Dashboard/MyTask/MyTask";
import EmployeeList from "../pages/Dashboard/EmployeeList/EmployeeList";
import PaymentHistory from "../pages/Dashboard/PaymentHistory.jsx/PaymentHistory";
import EmployeeDetails from "../pages/Dashboard/EmployeeDetails/EmployeeDetails";

const router = createBrowserRouter([
  // RootLayout
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
    ],
  },

  // AuthLayout
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  // DashboardLayout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-task",
        Component: MyTask,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "employee-list",
        Component: EmployeeList,
      },
      {
        path: "employee-details/:employeeId",
        Component: EmployeeDetails,
      },
    ],
  },
]);

export default router;
