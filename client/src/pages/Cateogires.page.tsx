import { Nav } from "../comp/Nav.comp";
import { Side } from "../comp/Side.comp";
import { CustomBreadCrumbs } from "../comp/CustomBreadCrumbs.comp";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import movies from "../assets/movies.jpg";
import games from "../assets/games.jpg";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { MoviesSeriesForm } from "../comp/forms/MoviesSeries.form";
import { useAppSelector } from "../redux/store.redux";
import { MoviesSeriesScroll } from "../comp/scrolls/MoviesSeriesScroll.comp";

export const Categories = () => {
  const [moviesSeriesFormOpen, setMoviesSeriesFormOpen] = useState(false);
  const { TMDBmoviesSeries } = useAppSelector((state) => state.moviesSeries);

  return (
    <>
      <Nav />
      <Side />
      <Stack flexGrow={1} p={2} gap={2} mt={8} ml={{ xs: 0, sm: 31 }}>
        <CustomBreadCrumbs />
        {TMDBmoviesSeries && <MoviesSeriesScroll />}
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="sm"
          open={moviesSeriesFormOpen}
          onClose={() => setMoviesSeriesFormOpen(false)}
        >
          <MoviesSeriesForm close={setMoviesSeriesFormOpen} />
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
            <Typography color="white" sx={{ zIndex: 1 }}>
              Movies / Series
            </Typography>
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
            <Typography color="white" sx={{ zIndex: 1 }}>
              Games
            </Typography>
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
