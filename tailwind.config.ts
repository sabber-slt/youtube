import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mdark: "#0C1B3D",
        mlight: "#00B5D8",
      },
    },
  },
  darkMode: "class",

  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        dark: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#00B5D8",
            secondary: "#3F3F3F",
            content1: "#000F32",
            background: "#0F0F0F",
            foreground: "#F0F0F0",
          }, // light theme colors
        },
        // dark: {
        //   layout: {}, // dark theme layout tokens
        //   colors: {}, // dark theme colors
        // },
        // ... custom themes
      },
    }),
  ],
};
export default config;
