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
            return "dashboard";
          } else if (
            /\/src\/pages\/Home\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "home";
          } else if (
            /\/src\/pages\/FindHotels\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "search";
          } else if (
            /\/src\/pages\/dashboard\/admin\/AdminDashboard\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "adminDashboard";
          } else if (
            /\/src\/pages\/HotelDetails\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "hotel_details";
          } else if (
            /\/src\/components\/AddHotelModal\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "add_hotel_modal";
          } else if (
            /\/src\/pages\/dashboard\/admin\/AllBookings\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "allBookings";
          } else if (
            /\/src\/components\/.*\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            console.log("Id from ", id);
            return "components-" + id.split("/").pop(); // Separate components into their own chunk
          } else if (
            /\/src\/api-client\.ts$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "apiClient";
          } else if (
            /\/src\/pages\/dashboard\/partner\/MyHotels\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "myHotels";
          } else if (
            /\/src\/pages\/dashboard\/admin\/Partners\.tsx$/.test(id) &&
            !/node_modules/.test(id)
          ) {
            return "partners";
          } else if (
            /\/src\/pages\/Login\.tsx$/.test(id) ||
            /\/src\/pages\/PartnerRegister\.tsx$/.test(id) ||
            (/\/src\/pages\/Register\.tsx$/.test(id) &&
              !/node_modules/.test(id))
          ) {
            return "register";
          }
        },
      },
    },
  },
});
