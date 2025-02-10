import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useLocation } from "react-router-dom";
import { CustomTooltip } from "./CustomTooltip.comp";

export const CustomBreadCrumbs = () => {
  const location = useLocation();
  const pathwaySegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbsMap: Record<string, string> = {
    categories: "Categories",
    home: "Home",
    series: "Series",
    movie: "Movie",
    "movie-series": "Movies & series",
    "movies-series": "Movies & Series",
    auth: "Authentication",
    signin: "Sign In",
    signup: "Sign Up",
    forgotPassword: "Forgot Password",
  };

  return (
    <Breadcrumbs>
      <CustomTooltip title="/home">
        <Link color="textPrimary" underline="hover" component={NavLink} to="/">
          Pikoria
        </Link>
      </CustomTooltip>
      {pathwaySegments.map((segment, index) => {
        const fullPath = `/${pathwaySegments.slice(0, index + 1).join("/")}`;

        return (
          <CustomTooltip key={segment} title={`/${segment}`}>
            <Link
              key={segment}
              component={NavLink}
              to={fullPath}
              underline="hover"
              color="textPrimary"
            >
              {breadcrumbsMap[segment]}
            </Link>
          </CustomTooltip>
        );
      })}
    </Breadcrumbs>
  );
};
