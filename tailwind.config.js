/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "soft-glow": ["-5px -5px 15px #FFF", "5px 5px 10px #E2E8F0"],
      },
      boxShadow: {
        "soft-glow": "-5px -5px 15px 0px #FFF, 5px 5px 10px 0px #E2E8F0;",
      },
    },
  },
  plugins: [],
};
