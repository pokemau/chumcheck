import type { Config } from "tailwindcss";

// tailwind.config.js
const config: Config = {
  content: ["./src/**/*.{html,jsx,tsx,ts,js}"],
  theme: {
    extend: {
      colors: {
        // "flutter-blue": "var(--color-flutter-blue)",
        // "flutter-gray": "var(--color-flutter-gray)",
        // "flutter-white": "var(--color-flutter-white)",
      },
    },
  },
};

export default config;
