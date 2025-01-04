import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const ThemeContent = createContext({
  isDark: true,
  toggleIsDark: () => {},
});

export const useThemeContext = () => useContext(ThemeContent);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setDark] = useState(true);

  const toggleIsDark = () => setDark(!isDark);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#f56521",
      },
      secondary: {
        main: "#f18f06",
      },
      background: {
        default: "#0d0d12",
        paper: "#0d0d12",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#f56521",
      },
      secondary: {
        main: "#f18f06",
      },
    },
  });

  return (
    <ThemeContent.Provider value={{ isDark, toggleIsDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContent.Provider>
  );
};
