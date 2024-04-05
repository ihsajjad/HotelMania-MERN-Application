import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerRegister from "./pages/PartnerRegister";
import Register from "./pages/Register";
import MyHotels from "./pages/dashboard/Partner/MyHotels";
import Partners from "./pages/dashboard/admin/Partners";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/partner/register", element: <PartnerRegister /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "/dashboard", element: <div>Welcome to dashboard</div> },
      { path: "/dashboard/partners", element: <Partners /> },
      { path: "/dashboard/my-hotels", element: <MyHotels /> },
      {
        path: "/dashboard/partner-profile/:userId",
        element: <PartnerProfile />,
      },
    ],
  },
]);
