import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Landing } from "./pages/Landing.page";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home.page";
import { Nav } from "./comps/Nav.comp";
import { ThemeContextProvider } from "./context/Theme.context";
import { AuthContextProvider } from "./context/Auth.context";
import { Login, Signup } from "./pages/Auth.page";
import { ResetPassword } from "./pages/ResetPassword.page";
import { DialogContextProvider } from "./context/Dialog.context";
import { AlertDialog } from "./comps/AlertDialog.comp";

export const routes = [
  {
    path: "/",
    element: (
      <>
        <Nav isDashboard={false} />
        <Landing />
      </>
    ),
  },
  {
    path: "/categories",
    element: (
      <>
        <Nav isDashboard={true} />
        <Home />
      </>
    ),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/resetPassword",
    element: <ResetPassword />,
  },
];

export const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <DialogContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
          <AlertDialog />
        </ThemeContextProvider>
      </AuthContextProvider>
    </DialogContextProvider>
  );
};
