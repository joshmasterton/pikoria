import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";
import { Landing } from "./pages/Landing.page";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ReactElement } from "react";
import { Nav } from "./comps/Nav.comp";

export const NavWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <Box>
      <Nav />
      {children}
    </Box>
  );
};

export const routes = [
  {
    path: "/",
    element: (
      <NavWrapper>
        <Landing />
      </NavWrapper>
    ),
  },
];

export const App = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
