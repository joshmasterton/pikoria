import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import movies from "../assets/movies.jpg";
import games from "../assets/games.jpg";
import Box from "@mui/material/Box";
import TvIcon from "@mui/icons-material/Tv";
import GamesIcon from "@mui/icons-material/Games";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export const Categories = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ width: "100%", height: 200 }}>
              <CardActionArea
                sx={{ height: "100%" }}
                onClick={() => navigate("/categories/movies-series")}
                aria-label="Movies/Series"
              >
                <TvIcon
                  aria-label="tv"
                  sx={{
                    color: "white",
                    top: 20,
                    left: 20,
                    position: "absolute",
                    zIndex: 2,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    backdropFilter: "blur(0rem)",
                    WebkitBackdropFilter: "blur(0rem)",
                  }}
                />
                <Avatar
                  variant="square"
                  src={movies}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: "95%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{ width: "100%", height: 200, position: "relative" }}
            >
              <Stack
                position="absolute"
                zIndex={1}
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: alpha(theme.palette.background.default, 0.65),
                }}
              >
                <Typography>Coming soon</Typography>
              </Stack>
              <CardActionArea
                aria-label="Games"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  position: "relative",
                  height: "100%",
                }}
              >
                <GamesIcon
                  aria-label="games"
                  sx={{
                    color: "white",
                    top: 20,
                    left: 20,
                    position: "absolute",
                    zIndex: 2,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    backdropFilter: "blur(0rem)",
                    WebkitBackdropFilter: "blur(0rem)",
                  }}
                />
                <Avatar
                  variant="square"
                  src={games}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: "95%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
