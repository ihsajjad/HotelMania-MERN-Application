import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import Booking from "./pages/Booking";
import Error from "./pages/Error";
import FindHotels from "./pages/FindHotels";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerRegister from "./pages/PartnerRegister";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AllBookings from "./pages/dashboard/admin/AllBookings";
import AllHotels from "./pages/dashboard/admin/AllHotels";
import Partners from "./pages/dashboard/admin/Partners";
import MyBookings from "./pages/dashboard/user/MyBookings";
import PrivateRoute from "./routes/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <FindHotels /> },
      { path: "/details/:id", element: <HotelDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/partner/register", element: <PartnerRegister /> },
      {
        path: "/hotel/:hotelId/booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },

      {
        path: "/dashboard/partners/:userId",
        element: <PartnerProfile />,
      },

      // Admin's routes
      { path: "/dashboard/partners", element: <Partners /> },
      { path: "/dashboard/all-bookings", element: <AllBookings /> },
      { path: "/dashboard/all-hotels", element: <AllHotels /> },

      // Partner's routes
      // {
      //   path: "/dashboard/my-hotels",
      //   element: (
      //     <PartnerRoute>
      //       <MyHotels />
      //     </PartnerRoute>
      //   ),
      // },

      // User's routes
      { path: "/dashboard/my-bookings", element: <MyBookings /> },
    ],
  },
]);
