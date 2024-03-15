import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        grey: "#DDDDDD",
        green: "#006C00",
        gray: "#F3F3F3",
        fadeWhite: "#FAFAFA",
        modalblack: "rgba(0, 0, 0, 0.5)",
        inputborder: "#B8C5CA",
        neutral: "#717171",
        ash: "#F4F4F4",
        grey2: "#383838",
        grey3: "#4B4B4B",
        customblack: "#242424",
        lightgreen: "#2DB224",
      },
    },
  },
  plugins: [],
};
export default config;
