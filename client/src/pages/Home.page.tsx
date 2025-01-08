import {
  Box,
  Breadcrumbs,
  Card,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SideBar } from "../comps/SideBar.comp";
import { NavLink } from "react-router";

export const Home = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const BreadcrumbsNameMap = {
    "/categories": "Categories",
  };

  return (
    <Box>
      <SideBar />
      <Grid
        container
        sx={{
          minWidth: "100%",
          transition: theme.transitions.create("padding", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          paddingLeft: isLargeScreen ? 31 : 0,
        }}
      >
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
            {BreadcrumbsNameMap["/categories"]}
          </Link>
        </Breadcrumbs>
        <Grid size={12} spacing={3} sx={{ p: 3 }} container>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{ minWidth: "100%", minHeight: 400 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                minWidth: "100%",
                minHeight: 400,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{ minWidth: "100%", minHeight: 400 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{ minWidth: "100%", minHeight: 400 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
