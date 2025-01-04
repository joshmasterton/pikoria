import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import logo from "../assets/statalize.png";
import {
  DatasetLinkedOutlined,
  EqualizerOutlined,
  ReceiptLongRounded,
} from "@mui/icons-material";

export const Landing = () => {
  const theme = useTheme();

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
            background: `linear-gradient(145deg,  transparent, transparent, ${alpha(
              theme.palette.primary.main,
              0.1
            )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            p: 5,
            pt: 12,
            gap: 7,
          }}
        >
          <Box
            maxWidth={400}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={3}
          >
            <Typography variant="h3">
              Transform Your Business with Statalize
            </Typography>
            <Typography>
              Unlock the power of your data to drive smarter decisions, optimize
              performance, and stay ahead in today's fast-paced digital world
              with Statalize.
            </Typography>
          </Box>
          <Box>
            <Avatar sx={{ width: 250, height: 250 }} alt="logo" src={logo} />
          </Box>
        </Grid>
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
            pt: 12,
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
              Empower Every Decision with Statalize, Simple, Scalable, and
              Secure Analytics
            </Typography>
            <Typography variant="caption">
              Leverage advanced analytics tailored to your unique business
              needs. From seamless integrations to predictive insights,
              Statalize provides the tools to make confident, data-driven
              decisions at every level of your organization.
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
                  <EqualizerOutlined color="error" />
                  <Typography variant="h6">Your Data, Your Way </Typography>
                  <Typography variant="caption">
                    Track only what matters to you. With customizable metrics,
                    Statalize lets you focus on insights that drive your
                    success.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <DatasetLinkedOutlined color="primary" />
                  <Typography variant="h6">Insights in an Instant</Typography>
                  <Typography variant="caption">
                    Access real-time data that updates as your business evolves.
                    Make faster, smarter decisions with live analytics at your
                    fingertips.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }} variant="outlined">
                <CardContent>
                  <ReceiptLongRounded color="warning" />
                  <Typography variant="h6">Data That Drives Action </Typography>
                  <Typography variant="caption">
                    Transform raw data into meaningful insights. Statalize
                    empowers you to take action and achieve measurable results
                    with confidence.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Grid>
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
            <Avatar sx={{ width: 250, height: 250 }} alt="logo" src={logo} />
          </Box>
          <Box
            maxWidth={400}
            sx={{ display: "flex", flexDirection: "column" }}
            gap={3}
          >
            <Typography variant="h4">
              Transform Your Business with Statalize
            </Typography>
            <Typography>
              Unlock the power of your data to drive smarter decisions, optimize
              performance, and stay ahead in today's fast-paced digital world
              with Statalize.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
