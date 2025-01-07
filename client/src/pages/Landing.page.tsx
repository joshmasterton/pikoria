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

export const Landing = () => {
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
              Explore the World of Data with Statalize
            </Typography>
            <Typography>
              Dive into a world of endless possibilities with a platform that
              brings you fascinating data and insights across a wide range of
              topics—whether you're curious about global trends, niche facts, or
              surprising statistics.
            </Typography>
            <Button variant="contained" fullWidth>
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
              Empowering Your Curiosity with Data: Accessible, Versatile, and
              Reliable Insights
            </Typography>
            <Typography variant="caption">
              Explore data with ease and versatility. Whether you're uncovering
              trends or seeking quick insights, our platform provides the tools
              to make informed decisions—wherever your curiosity takes you.
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
                  <Typography variant="h6">Your Data, Your Way </Typography>
                  <Typography variant="caption">
                    Track only what matters to you. With customizable metrics,
                    Statalize lets you focus on the insights that matter most.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <DatasetLinkedOutlined color="info" />
                  <Typography variant="h6">Insights in an Instant</Typography>
                  <Typography variant="caption">
                    Access real-time data on demand and explore insights as they
                    happen. Whether you're tracking trends, comparing
                    statistics, or diving into detailed analyses, get the
                    information you need when you need it.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <ReceiptLongRounded color="primary" />
                  <Typography variant="h6">
                    Data That Inspires Change
                  </Typography>
                  <Typography variant="caption">
                    Turn complex data into clear insights that drive informed
                    decisions. With Statalize, you can act on the information
                    that matters most, unlocking new opportunities along the
                    way.
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
            <Typography variant="h4">Seamless Data Exploration</Typography>
            <Typography>
              Effortlessly browse, filter, and compare data across diverse
              categories. With intuitive tools and customizable features,
              Statalize makes it easy to find the insights you need in just a
              few clicks.
            </Typography>
          </Box>
        </Grid>
        <Divider sx={{ width: "100%" }} />
        <Footer />
      </Grid>
    </>
  );
};
