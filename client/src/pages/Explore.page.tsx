import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SideBar } from "../comps/SideBar.comp";
import { BreadCrumb } from "../comps/BreadCrumb.comp";
import { useState } from "react";
import movies from "../assets/movies.png";
import games from "../assets/games.png";
import { MoviesSeriesForm } from "../comps/MoviesSeriesForm";

export const Explore = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [openForm, setOpenForm] = useState(false);

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
        <BreadCrumb />
        <Dialog
          scroll="body"
          fullWidth
          open={openForm}
          onClose={() => setOpenForm(false)}
          PaperProps={{
            style: {
              background: alpha(theme.palette.background.default, 1),
              backdropFilter: "blur(24px)",
              border: 1,
              borderColor: theme.palette.divider,
            },
          }}
        >
          <DialogContent>
            <MoviesSeriesForm />
          </DialogContent>
        </Dialog>
        <Grid size={12} spacing={3} sx={{ p: 3 }} container>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                minWidth: "100%",
              }}
            >
              <CardActionArea onClick={() => setOpenForm(true)}>
                <CardContent sx={{ height: 400 }}>
                  <Typography>Movies / Series</Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 500,
                      position: "absolute",
                      right: -100,
                      bottom: -100,
                      filter: "blur(200px)",
                    }}
                    src={movies}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      width: 500,
                      position: "absolute",
                      right: -100,
                      bottom: -100,
                    }}
                    src={movies}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                minWidth: "100%",
                minHeight: 400,
              }}
            >
              <CardActionArea onClick={() => setOpenForm(true)}>
                <CardContent sx={{ height: 400 }}>
                  <Typography>Games</Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 500,
                      position: "absolute",
                      right: -100,
                      bottom: -100,
                      filter: "blur(200px)",
                    }}
                    src={games}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      width: 500,
                      position: "absolute",
                      right: -100,
                      bottom: -100,
                    }}
                    src={games}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
