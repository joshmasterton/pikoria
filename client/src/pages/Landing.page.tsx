import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  DatasetLinkedOutlined,
  EqualizerOutlined,
  ReceiptLongRounded,
} from "@mui/icons-material";
import bannerOne from "../assets/bannerOne.png";
import bannerTwo from "../assets/bannerTwo.png";
import { Footer } from "../comps/Footer.comp";
import { useNavigate } from "react-router";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container sx={{ minWidth: "100%" }}>
        <Grid
          size={12}
          minHeight={"100vh"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            p: 5,
            pt: 10,
            gap: 7,
          }}
        >
          <Box
            maxWidth={400}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={3}
          >
            <Typography variant="h3">
              Dive Into Your Next Obsession with Pikoria
            </Typography>
            <Typography>
              Fill out a quick form about your personality or interests, and let
              Pikoria provide you with personalized recommendations—from games
              to movies and everything in between!
            </Typography>
            <Button
              onClick={() => navigate("/home")}
              variant="contained"
              sx={{ alignSelf: "start" }}
            >
              Get started
            </Button>
          </Box>
          <Box>
            <Avatar
              sx={{ width: "100%", maxWidth: "100%", height: 350 }}
              alt="A graphical representation of graph insights"
              variant="square"
              src={bannerOne}
            />
          </Box>
        </Grid>
        <Divider sx={{ width: "100%" }} />
        <Grid
          size={12}
          minHeight={"100vh"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            p: 5,
            gap: 7,
          }}
        >
          <Box
            maxWidth={400}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={3}
            textAlign="center"
          >
            <Typography variant="h4">
              Find Recommendations Perfectly Tailored to Your Interests and
              Preferences
            </Typography>
            <Typography variant="caption">
              Discover the best options for your interests, whether you're
              exploring new hobbies, finding the right partner, or searching for
              your next favorite thing.
            </Typography>
          </Box>
          <Box>
            <Stack
              direction="row"
              gap={5}
              sx={{ justifyContent: "center", flexWrap: "wrap" }}
            >
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <EqualizerOutlined color="secondary" />
                  <Typography variant="h6">Simple and Fun</Typography>
                  <Typography variant="caption">
                    Answer a few engaging questions, and watch Pikoria work its
                    magic to suggest options you'll love.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <DatasetLinkedOutlined color="info" />
                  <Typography variant="h6">Find What You’ll Love</Typography>
                  <Typography variant="caption">
                    Pikoria helps you uncover new favorites tailored to your
                    interests, making every discovery exciting and relevant.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <ReceiptLongRounded color="primary" />
                  <Typography variant="h6">Endless Possibilities</Typography>
                  <Typography variant="caption">
                    Whether you're looking for inspiration or just curious,
                    Pikoria offers a world of options tailored to you.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Grid>
        <Divider sx={{ width: "100%" }} />
        <Grid
          size={12}
          minHeight={"100vh"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            p: 5,
            gap: 7,
          }}
        >
          <Box>
            <Avatar
              sx={{ width: "100%", maxWidth: "100%", height: 350 }}
              alt="A graphical representation of data insights"
              variant="square"
              src={bannerTwo}
            />
          </Box>
          <Box
            maxWidth={400}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={3}
          >
            <Typography variant="h4">
              Seamless Exploration, Endless Ideas
            </Typography>
            <Typography>
              Dive into your personalized results and discover new favorites
              across various categories. Pikoria makes finding what you love
              effortless and enjoyable.
            </Typography>
          </Box>
        </Grid>
        <Divider sx={{ width: "100%" }} />
        <Footer />
      </Grid>
    </>
  );
};
