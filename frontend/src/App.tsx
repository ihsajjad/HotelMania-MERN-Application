import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import Booking from "./pages/Booking";
import Error from "./pages/Error";
import FindHotels from "./pages/FindHotels";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerRegister from "./pages/PartnerRegister";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AllBookings from "./pages/dashboard/admin/AllBookings";
import AllHotels from "./pages/dashboard/admin/AllHotels";
import Partners from "./pages/dashboard/admin/Partners";
// import MyAddedHotels from "./pages/dashboard/partner/MyAddedHotels";
import { API_BASE_URL } from "./api-client.ts";
import HotelDetails from "./pages/HotelDetails.tsx";
import MyAddedHotels from "./pages/dashboard/partner/MyAddedHotels.tsx";
import PartnerBookings from "./pages/dashboard/partner/PartnerBookings.tsx";
import MyBookings from "./pages/dashboard/user/MyBookings";
import AdminRoute from "./routes/AdminRoute.tsx";
import PartnerRoute from "./routes/PartnerRoute";
import PrivateRoute from "./routes/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <FindHotels /> },
      {
        path: "/details/:id",
        loader: ({ params }): Promise<Response> =>
          fetch(`${API_BASE_URL}/api/hotels/${params?.id}`),
        element: <HotelDetails />,
      },
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
      {
        path: "/dashboard/partners",
        element: (
          <AdminRoute>
            <Partners />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-bookings",
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-hotels",
        element: (
          <AdminRoute>
            <AllHotels />
          </AdminRoute>
        ),
      },

      // Partner's routes
      {
        path: "/dashboard/my-hotels",
        element: (
          <PartnerRoute>
            <MyAddedHotels />
          </PartnerRoute>
        ),
      },
      {
        path: "/dashboard/partner/my-bookings",
        element: (
          <PartnerRoute>
            <PartnerBookings />
          </PartnerRoute>
        ),
      },

      // User's routes
      { path: "/dashboard/my-bookings", element: <MyBookings /> },
    ],
  },
]);
