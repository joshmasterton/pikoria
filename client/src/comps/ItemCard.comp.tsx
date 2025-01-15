import { ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MovieSeriesType } from "../types/movieSeries.type";

export const MovieSeriesCard = ({
  movieSeries,
}: {
  movieSeries: MovieSeriesType;
}) => {
  const theme = useTheme();
  const [expand, setExpand] = useState(false);

  const handleExpanded = () => {
    setExpand(!expand);
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", position: "relative" }}>
      <Paper
        sx={{
          position: "absolute",
          right: 0,
          p: 2,
          mt: 2,
          mr: 2,
        }}
      >
        {Math.round(movieSeries.vote_average * 10) / 10}
      </Paper>
      <CardMedia
        component="img"
        sx={{ height: 500 }}
        src={movieSeries.poster_path}
      />
      <CardContent>
        <CardActions sx={{ p: 0 }}>
          <Stack direction="row" width="100%" alignItems="center" gap={1}>
            <Typography variant="h6">
              {movieSeries.title || movieSeries.name}
            </Typography>
            <Typography variant="body2">
              {movieSeries.title
                ? movieSeries.original_title !== movieSeries.title &&
                  `(${movieSeries.original_title})`
                : movieSeries.name !== movieSeries.name &&
                  `(${movieSeries.name})`}
            </Typography>
          </Stack>
          <IconButton
            aria-label="show more"
            onClick={handleExpanded}
            sx={{
              transform: `rotate(${expand ? "180deg" : "0deg"})`,
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expand}>
          <Typography variant="caption">{movieSeries.overview}</Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};
