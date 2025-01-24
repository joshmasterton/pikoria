import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useLocation } from "react-router-dom";

export const CustomBreadCrumbs = () => {
  const location = useLocation();
  const pathwaySegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <Breadcrumbs>
      <Link color="textPrimary" underline="hover" component={NavLink} to="/">
        Pikoria
      </Link>
      {pathwaySegments.map((pathSegment, index) => {
        const pathToSegment = `/${pathwaySegments
          .slice(0, index + 1)
          .join("/")}`;
        const displayName =
          pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);

        return (
          <Link
            component={NavLink}
            to={pathToSegment}
            underline="hover"
            key={pathSegment}
            color="textPrimary"
          >
            {displayName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
