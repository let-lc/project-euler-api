module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
