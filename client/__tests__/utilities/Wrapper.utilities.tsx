import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, routes } from "../../src/App";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../src/redux/store.redux";
import { AuthWrapper } from "../../src/comp/AuthWrapper.comp";

export const Wrapper = ({ initialEntries }: { initialEntries: string }) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntries],
  });

  return (
    <Provider store={store}>
      <AuthWrapper>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthWrapper>
    </Provider>
  );
};
