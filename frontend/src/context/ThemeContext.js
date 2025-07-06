import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const palette =
      mode === "light"
        ? {
            mode: "light",
            primary: {
              main: "#3f51b5",
              light: "#6573c3",
              dark: "#2c387e",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f50057",
              light: "#f73378",
              dark: "#ab003c",
              contrastText: "#ffffff",
            },
            background: {
              default: "#fafafa",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#555",
            },
            divider: "#e0e0e0",
            error: {
              main: "#f44336",
            },
            success: {
              main: "#4caf50",
            },
            warning: {
              main: "#ff9800",
            },
            info: {
              main: "#2196f3",
            },
          }
        : {
            mode: "dark",
            primary: {
              main: "#90caf9",
              light: "#e3f2fd",
              dark: "#42a5f5",
              contrastText: "#000000",
            },
            secondary: {
              main: "#f48fb1",
              light: "#f8bbd0",
              dark: "#c2185b",
              contrastText: "#000000",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#cccccc",
            },
            divider: "#333",
            error: {
              main: "#ef5350",
            },
            success: {
              main: "#66bb6a",
            },
            warning: {
              main: "#ffa726",
            },
            info: {
              main: "#29b6f6",
            },
          };

    return createTheme({
      palette,
      typography: {
        fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              fontWeight: 600,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
