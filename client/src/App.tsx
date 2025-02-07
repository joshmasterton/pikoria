import CssBaseline from "@mui/material/CssBaseline";
import { Signin } from "./pages/auth/Signin.page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/Signup.page";
import { ForgotPassword } from "./pages/auth/ForgotPassword.page";
import { Provider } from "react-redux";
import { store } from "./redux/store.redux";
import { AuthWrapper } from "./wrapper/AuthWrapper.comp";
import { ThemeWrapper } from "./wrapper/ThemeWrapper";
import { Home } from "./pages/Home.page";
import { Categories } from "./pages/Cateogires.page";
import { MoviesSeriesPage } from "./pages/movies_series/MoviesSeries.page";
import { MovieSeriesPage } from "./pages/movies_series/MovieSeries.page";
import { Landing } from "./pages/Landing.page";

export const routes = [
  {
    path: "/*",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/movies-series",
    element: <MoviesSeriesPage />,
  },
  {
    path: "/movie-series/:content/:id/",
    element: <MovieSeriesPage />,
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

export const App = () => {
  const router = createBrowserRouter(routes);

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
