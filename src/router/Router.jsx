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
import WorkRecords from "../pages/Dashboard/WorkRecords/WorkRecords";
import VerifiedEmployeeList from "../pages/Dashboard/VerifiedEmployeeList/VerifiedEmployeeList";
import Forbidden from "../components/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import HrRoute from "../routes/HrRoute";
import EmployeeRoute from "../routes/EmployeeRoute";

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
      {
        path: "/forbidden",
        Component: Forbidden,
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
        element: (
          <EmployeeRoute>
            <MyTask />
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory />
          </EmployeeRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HrRoute>
            <EmployeeList />
          </HrRoute>
        ),
      },
      {
        path: "employee-details/:employeeId",
        element: (
          <HrRoute>
            <EmployeeDetails />
          </HrRoute>
        ),
      },
      {
        path: "work-records",
        element: (
          <HrRoute>
            <WorkRecords />
          </HrRoute>
        ),
      },
      {
        path: "all-employee-list",
        element: (
          <AdminRoute>
            <VerifiedEmployeeList />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
