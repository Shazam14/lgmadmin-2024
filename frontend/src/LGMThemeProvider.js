import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import baseTheme from "./muilgmtheme"; // Import the base theme

const LGMThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(() => {
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode: prefersDarkMode ? "dark" : "light",
        background: prefersDarkMode
          ? { default: "#121212", paper: "#1d1d1d" }
          : {},
      },
    });
  }, [prefersDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default LGMThemeProvider;
