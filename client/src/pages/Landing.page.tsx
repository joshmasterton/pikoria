import Stack from "@mui/material/Stack";
import { Nav } from "../comp/Nav.comp";
import Typography from "@mui/material/Typography";
import portable from "../assets/portable.png";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";

export const Landing = () => {
  return (
    <>
      <Nav />
      <Stack mt={8}>
        <Stack
          direction="row"
          gap={5}
          p={5}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Stack maxWidth={400}>
            <Typography variant="h2">Discover Your Favorite Things</Typography>
            <Typography variant="h6">
              Favorite movies, games, hobbies, and more – all in one place!
            </Typography>
          </Stack>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "100%",
              maxHeight: 400,
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
          alignItems="center"
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "100%",
              maxHeight: 400,
            }}
            src={portable}
          />
          <Stack maxWidth={400}>
            <Typography variant="h2">Discover Your Favorite Things</Typography>
            <Typography variant="h6">
              Favorite movies, games, hobbies, and more – all in one place!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
