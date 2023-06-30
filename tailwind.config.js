/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        monaSans: ["Mona Sans", "sans-serif"],
      },
      colors: {
        danger: "#e5534b",
        "github-canvas-subtle": "#22272E",
        "subtle-white": "#adbac7",
        muted: "#9CA3AF",
        "github-canvas-dark": "#0d1117",
        "github-light": "#30363d",
        "github-canvas-inset": "#1c2128",
      },
    },
  },
  plugins: [],
};
