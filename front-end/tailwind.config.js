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
        "primary-border": "#AFB1B1",
        "success-text": "#14ae5c",
        "warning-text": "#fcba03",
        "danger-text": "#F93030",
        "success-bg": "#47f598",
        "warning-bg": "#fcd874",
        "danger-bg": "#f07373",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
