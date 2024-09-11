import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#009bee",
          "secondary": "#00bb00",
          "accent": "#648100",
          "neutral": "#3d250e",
          "base-100": "#292929",
          "info": "#00ffff",
          "success": "#008000",
          "warning": "#c65e00",
          "error": "#e04663",
          },
        },
      ],
    },
  plugins: [
    daisyui,
  ],
}

