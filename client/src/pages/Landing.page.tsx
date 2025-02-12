import { useNavigate } from "react-router-dom";
import { Nav } from "../comp/Nav.comp";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import portable from "../assets/portable.png";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PushPinIcon from "@mui/icons-material/PushPin";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <Stack pt={8}>
        <Stack
          direction="row"
          gap={5}
          p={5}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Stack maxWidth={400} gap={1}>
            <Typography variant="h2">Discover Your Favorite Things</Typography>
            <Stack gap={5}>
              <Typography>
                Favorite movies, and more – all in one place!
              </Typography>
              <Button
                onClick={() => navigate("/categories")}
                sx={{ alignSelf: "end", width: "fit-content" }}
                variant="contained"
              >
                Let's go!
              </Button>
            </Stack>
          </Stack>
          <CardMedia
            component="img"
            sx={{
              p: 5,
              width: "100%",
              maxWidth: 400,
              height: "100%",
              Height: 400,
            }}
            src={portable}
          />
        </Stack>
        <Divider />
        <Stack
          direction="row"
          gap={5}
          p={5}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 300,
              minHeight: 200,
            }}
          >
            <Stack p={2} gap={2}>
              <LightbulbIcon />
              <Stack gap={1}>
                <Typography variant="h5">Find what you'll love</Typography>
                <Typography>
                  Get tailored movies and games suggestions based on your
                  interests.
                </Typography>
              </Stack>
            </Stack>
          </Card>
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 300,
              minHeight: 250,
            }}
          >
            <Stack p={2} gap={2}>
              <PushPinIcon />
              <Stack gap={1}>
                <Typography variant="h5">
                  Your favorites, all in one place
                </Typography>
                <Typography>
                  Keep track of everything you love and never lose a great
                  recommendation.
                </Typography>
              </Stack>
            </Stack>
          </Card>
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 300,
              minHeight: 200,
            }}
          >
            <Stack p={2} gap={2}>
              <BubbleChartIcon />
              <Stack gap={1}>
                <Typography variant="h5">Curate your perfect list</Typography>
                <Typography>
                  Mark recommendations as watched, played, or not interested to
                  refine your picks.
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </>
  );
};
