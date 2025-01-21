import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Signin } from "./pages/auth/Signin.page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/Signup.page";
import { ForgotPassword } from "./pages/auth/ForgotPassword.page";
import { Provider } from "react-redux";
import { store } from "./redux/store.redux";
import { AuthWrapper } from "./comp/AuthWrapper.comp";

export const routes = [
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/auth/signin",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/forgotPassword",
    element: <ForgotPassword />,
  },
];

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5E75FF",
    },
    background: {
      default: "#0a090d",
      paper: "#0a090d",
    },
  },
});

export const App = () => {
  const router = createBrowserRouter(routes);

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
