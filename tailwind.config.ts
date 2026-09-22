import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        paper: "#F8FBFE",
        navy: {
          DEFAULT: "#0B1E33",
          soft: "#33506E",
          faint: "#6C89A3",
        },
        blue: {
          600: "#1D4ED8",
          500: "#2E6FE0",
          400: "#38BDF8",
          pale: "#EAF3FD",
          "pale-2": "#F1F7FD",
        },
        hairline: {
          DEFAULT: "#DCE8F5",
          strong: "#BBD3EA",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1D4ED8 0%, #2E6FE0 45%, #38BDF8 100%)",
        "mesh-hero":
          "radial-gradient(ellipse 900px 500px at 15% -10%, rgba(56,189,248,0.16), transparent 60%), radial-gradient(ellipse 700px 500px at 100% 0%, rgba(29,78,216,0.14), transparent 60%)",
        "glass-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.15))",
      },
      boxShadow: {
        glass: "0 8px 32px -8px rgba(11,30,51,0.16)",
        "glass-lg": "0 24px 60px -20px rgba(11,30,51,0.22)",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
