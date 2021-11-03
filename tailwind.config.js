module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        dance: ['"Dancing Script"', "cursive"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
