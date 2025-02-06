import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import movies from "../assets/movies.jpg";
import games from "../assets/games.jpg";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { useEffect } from "react";

export const Categories = () => {
  const navigate = useNavigate();

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
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
          <CardActionArea
            onClick={() => navigate("/categories/movies-series")}
            aria-label="Movies/Series"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              position: "relative",
              height: "100%",
            }}
          >
            <Box
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                background: alpha("#000000", 0.75),
                maskImage:
                  "linear-gradient(320deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%)",
              }}
            />
            <Stack
              width="100%"
              height="100%"
              sx={{
                zIndex: 1,
                p: 2,
              }}
            >
              <Typography color="white">Movies / Series</Typography>
            </Stack>
            <Avatar
              variant="square"
              src={movies}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </CardActionArea>
        </Card>
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
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
            <Box
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                background: alpha("#000000", 0.75),
                maskImage:
                  "linear-gradient(320deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%)",
              }}
            />
            <Stack
              width="100%"
              height="100%"
              sx={{
                zIndex: 1,
                p: 2,
              }}
            >
              <Typography color="white">Games</Typography>
            </Stack>
            <Avatar
              variant="square"
              src={games}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
};
