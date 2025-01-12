import { Breadcrumbs, Link } from "@mui/material";
import { NavLink, useLocation } from "react-router";

export const BreadCrumb = () => {
  const location = useLocation().pathname as keyof typeof BreadcrumbsNameMap;
  const BreadcrumbsNameMap = {
    "/home": "Home",
    "/explore": "Explore",
  };

  return (
    <Breadcrumbs
      sx={{
        p: 3,
        pb: 0,
        left: 0,
        mt: 7,
      }}
    >
      <Link component={NavLink} to="/" underline="hover" color="inherit">
        Pikoria
      </Link>
      <Link
        component={NavLink}
        to="/categories"
        underline="hover"
        color="textPrimary"
      >
        {BreadcrumbsNameMap[location || "Unknwon"]}
      </Link>
    </Breadcrumbs>
  );
};
