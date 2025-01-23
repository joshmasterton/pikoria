import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "../../src/App";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../src/redux/store.redux";
import { AuthWrapper } from "../../src/wrapper/AuthWrapper.comp";
import { ThemeWrapper } from "../../src/wrapper/ThemeWrapper";

export const Wrapper = ({ initialEntries }: { initialEntries: string }) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntries],
  });

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <AuthWrapper>
          <CssBaseline />
          <RouterProvider router={router} />
        </AuthWrapper>
      </ThemeWrapper>
    </Provider>
  );
};
