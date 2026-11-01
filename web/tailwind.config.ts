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
        google: {
          blue: "#1A73E8",
          blueHover: "#1557B0",
          link: "#1A0DAB",
          green: "#1E8E3E",
          red: "#D93025",
          yellow: "#F9AB00",
          border: "#DFE1E5",
          hoverBg: "#F8F9FA",
          text: "#202124",
          subtext: "#4D5156",
          lightGrey: "#70757A",
        },
      },
      fontFamily: {
        sans: ["Google Sans", "Roboto", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      boxShadow: {
        google: "0 1px 6px rgba(32, 33, 36, 0.28)",
        "google-hover": "0 2px 8px rgba(32, 33, 36, 0.32)",
      },
    },
  },
  plugins: [],
};
export default config;
