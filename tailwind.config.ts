import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edf4ff",
          100: "#d6e6ff",
          200: "#adcaff",
          300: "#7eadff",
          400: "#5595ff",
          500: "#2c7bff",
          600: "#1d60db",
          700: "#184db4",
          800: "#153f90",
          900: "#123474"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
export default config;
