// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Use regular expression to match the module ID
          if (
            /\/src\/layouts\/DashboardLayout\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "dashboard"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/Home\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "home"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/dashboard\/admin\/AdminDashboard\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "adminDashboard"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/HotelDetails\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "hotel_details"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/components\/AddHotelModal\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "add_hotel_modal"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/dashboard\/admin\/AllBookings\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "allBookings"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/dashboard\/admin\/AllHotels\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "allHotels"; // Separate dashboard components into their own chunk
          } else if (
            /\/src\/pages\/dashboard\/admin\/Partners\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "partners"; // Separate dashboard components into their own chunk
          }
        },
      },
    },
  },
});
