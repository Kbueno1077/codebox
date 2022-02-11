import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#2196f3",

      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    background: {
      silver: " #fafafa",
    },
    text: {
      black: "#000",
    },
    todos: {
      iframe: "#B8D5D5",
      wrapper: "#F0F7F7",
      background: "#006665",
      background_dark: "#005052",
      textColor: "#006665",
      gray_btn: "#9F9E9C",
      hover_graybtn: "#F5F5F5",
      filterHover: "#E7F2F6",
      helpIcon: "#000",
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#2196f3",

      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    background: {
      silver: " #fafafa",
    },
    text: {
      black: "#000",
    },
    todos: {
      iframe: "#333",
      wrapper: "#444",
      background: "#FF9900",
      background_dark: "#D87800",
      textColor: "#F5F6F7",
      filterHover: "#535353",
      gray_btn: "#9F9E9C",
      hover_graybtn: "#535353",
      helpIcon: "#CDCDCD",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
