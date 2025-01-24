import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import movies from "../assets/movies.png";
import games from "../assets/games.png";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { MoviesSeriesForm } from "../comp/forms/MoviesSeries.form";

export const Categories = () => {
  const [moviesSeriesFormOpen, setMoviesSeriesFormOpen] = useState(false);

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        <Dialog
          scroll="body"
          fullWidth
          open={moviesSeriesFormOpen}
          onClose={() => setMoviesSeriesFormOpen(false)}
        >
          <MoviesSeriesForm />
        </Dialog>
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
          <CardActionArea
            onClick={() => setMoviesSeriesFormOpen(true)}
            aria-label="Movies"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              position: "relative",
              p: 2,
              height: "100%",
            }}
          >
            <Typography>Movies</Typography>
            <Avatar
              variant="square"
              src={movies}
              sx={{
                position: "absolute",
                right: -50,
                bottom: -100,
                width: 300,
                height: 300,
                zIndex: 1,
              }}
            />
            <Avatar
              variant="square"
              src={movies}
              sx={{
                position: "absolute",
                right: -300,
                bottom: -100,
                width: 1000,
                height: 500,
                filter: "blur(2000px)",
              }}
            />
          </CardActionArea>
        </Card>
        <Card variant="outlined" sx={{ width: "100%", height: 400 }}>
          <CardActionArea
            aria-label="Movies"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              position: "relative",
              p: 2,
              height: "100%",
            }}
          >
            <Typography>Games</Typography>
            <Avatar
              variant="square"
              src={games}
              sx={{
                position: "absolute",
                right: -50,
                bottom: -100,
                width: 300,
                height: 300,
                zIndex: 1,
              }}
            />
            <Avatar
              variant="square"
              src={games}
              sx={{
                position: "absolute",
                right: -300,
                bottom: -100,
                width: 1000,
                height: 500,
                filter: "blur(2000px)",
              }}
            />
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
};
