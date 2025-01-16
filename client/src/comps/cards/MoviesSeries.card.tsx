import { ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MovieSeriesType } from "../../types/movieSeries.type";

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
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Paper
        sx={{
          position: "absolute",
          right: 0,
          p: 1.5,
          mt: 2,
          mr: 2,
        }}
      >
        {Math.round(movieSeries.vote_average * 10) / 10}
      </Paper>
      <CardMedia
        height={300}
        component="img"
        sx={{ objectPosition: "top" }}
        src={movieSeries.poster_path}
      />
      <CardContent>
        <CardActions sx={{ p: 0, alignItems: "center" }}>
          <Stack width="100%">
            <Typography
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth={227}
            >
              {movieSeries.title || movieSeries.name}
            </Typography>
            <Typography variant="caption">
              {movieSeries.release_date || movieSeries.first_air_date}
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
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="caption">{movieSeries.overview}</Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};
