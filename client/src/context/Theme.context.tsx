import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

const ThemeContent = createContext({
  isDark: true,
  toggleIsDark: () => {},
});

export const useThemeContext = () => useContext(ThemeContent);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setDark] = useState(true);

  const getIsDark = () => {
    const localIsDark = localStorage.getItem("statalize_dark");

    if (!localIsDark) {
      localStorage.setItem("statalize_dark", "active");
      setDark(true);
    } else {
      if (localIsDark === "active") {
        setDark(true);
      } else {
        setDark(false);
      }
    }
  };

  const toggleIsDark = () => {
    localStorage.setItem(
      "statalize_dark",
      isDark === true ? "inactive" : "active"
    );

    setDark(!isDark);
    getIsDark();
  };

  useEffect(() => {
    getIsDark();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6A44F2",
      },
      secondary: {
        main: "#A75CF2",
      },
      info: {
        main: "#0D9FD9",
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
        main: "#6A44F2",
      },
      secondary: {
        main: "#A75CF2",
      },
      info: {
        main: "#0D9FD9",
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
