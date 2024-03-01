module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-text": "#373C3C",
        "secondary-text": "#878A8A",
        "kinfolks-white": "#FFFEFC",
        "kinfolks-blue": "#0055FF",
        "kinfolks-navy": "#102396",
        "ice-blue": "#F2F7FC",
        success: "#04CC83",
        danger: "#F93030",
        "primary-border": "#AFB1B1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
