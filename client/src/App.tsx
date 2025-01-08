import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Landing } from "./pages/Landing.page";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/Home.page";
import { Nav } from "./comps/Nav.comp";

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
];

export const App = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
