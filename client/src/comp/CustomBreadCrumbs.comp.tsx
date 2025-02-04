import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useLocation } from "react-router-dom";

export const CustomBreadCrumbs = () => {
  const location = useLocation();
  const pathwaySegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbsMap: Record<string, string> = {
    categories: "Categories",
    home: "Home",
    "movies-series": "Movies & Series",
    auth: "Authentication",
    signin: "Sign In",
    signup: "Sign Up",
    forgotPassword: "Forgot Password",
  };

  return (
    <Breadcrumbs>
      <Link color="textPrimary" underline="hover" component={NavLink} to="/">
        Pikoria
      </Link>
      {pathwaySegments.map((segment) => {
        return (
          <Link
            key={segment}
            component={NavLink}
            to={`/${segment}`}
            underline="hover"
            color="textPrimary"
          >
            {breadcrumbsMap[segment]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
