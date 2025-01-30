import { ReactElement, useEffect } from "react";
import { getTheme } from "../redux/themeSlice.redux";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeWrapper = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const { localTheme } = useAppSelector((state) => state.theme);

  const darkTheme = createTheme({
    components: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "background.paper",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#0a090d",
          },
        },
      },
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#446672",
      },
      background: {
        default: "#0a090d",
        paper: "#0a090d",
      },
    },
  });

  const lightTheme = createTheme({
    components: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: "background.paper",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          colorInherit: "red",
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: "inherit",
            backgroundColor: "rgb(255, 255, 255)",
          },
        },
      },
    },
    palette: {
      mode: "light",
      primary: {
        main: "#446672",
      },
    },
  });

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  return (
    <ThemeProvider theme={localTheme === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};
