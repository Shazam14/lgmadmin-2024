import { createTheme } from "@mui/material/styles";

const muilgmtheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#eeeeee",
    },
    secondary: {
      main: "#3dbd89",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 14,
    h1: {
      fontSize: "2.2rem",
    },
    h2: {
      fontSize: "1.8rem",
    },
    "@media (min-width:600px)": {
      fontSize: 16,
      h1: {
        fontSize: "3.0rem",
      },
      h2: {
        fontSize: "2.4rem",
      },
    },
  },
  spacing: 8,
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Removes uppercase styling
        },
      },
      defaultProps: {
        disableRipple: true, // No ripple on click
      },
    },
  },
  transitions: {
    duration: {
      enteringScreen: 500,
      leavingScreen: 300,
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default muilgmtheme;
