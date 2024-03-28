/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // backgroundColor: {
    //   main: "#1f244d",
    //   secondary: "#323946",
    // },
    // colors: {
    //   main: "#8bcf17",
    // },

    extend: {},
  },
  plugins: [require("daisyui")],
};
