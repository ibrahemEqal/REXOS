import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rexos: {
          primary: "#0A0908",   // الأسود الفحمي
          secondary: "#16110E", // خشب الجوز الداكن
          text: "#F4EFE6",      // العاجي الدافئ
          accent: "#C8A97E",    // الذهبي الفاخر
          wood: "#16110E",
          gold: "#C8A97E",
        },
      },
    },
  },
  plugins: [],
};
export default config;