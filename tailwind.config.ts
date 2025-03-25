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
        primary: {
          light: "#CEB0FA",
          normal: "#8133F1",
          dark: "#290064",
        },
        secondary: "#FAFAFA",
        error: "#E00B2B",
        "foundation-grey-grey-300": "#dfdede",
        "foundation-grey-grey-50": "#fafafa",
        "foundation-grey-grey-200": "#e9e8e8",
        "foundation-grey-grey-900": "#575757",
        "foundation-grey-grey-600": "#bcbbbb",
        whitesmoke: "#eaecf0",
        borderColor: '#F0F0F0',
        gray1: {
          "100": "#939292",
          "200": "rgba(250, 250, 250, 0.5)",
        },
        "foundation-white-white-400": "#fff",
        "foundation-purple-purple-100": "#ceb0fa",
        "foundation-black-black-400": "#434343",
        "foundation-purple-purple-400": "#8133f1",
        "foundation-purple-purple-300": "#9654f4",
        "foundation-black-black-500": "#141414",
        "foundation-purple-purple-900": "#290064",
        "foundation-purple-purple-200": "#b78af7",
        "gray-2": "#bdbdbd",
        "gray-700": "#515151",
        "gray-500": "#8a8a8a",
        "foundation-grey-grey-700": "#939292",
        "system-colors-primary-line-divider": "#3347e6",
        "foundation-grey-grey-800": "#727171",
        "foundation-purple-purple-500": "#6200ee",
        gray: "#4f4f4f",
        blueviolet: "#a859ff",
        gainsboro: "#e6e6e6",
        vividRed: "#E00B2B",
      },
      boxShadow: {
        custom: "0px 2px 10px 0px #0000001A",
      },
      screens: {
        'xl': '1400px', 
        '2xl': '1520px',  // Screens that are 1920px or wider
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
