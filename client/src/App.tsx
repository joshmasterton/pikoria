import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";
import { Nav } from "./pages/Nav.page";
import { Landing } from "./pages/Landing.page";

export const App = () => {
  return (
    <Box>
      <Nav />
      <Landing />
    </Box>
  );
};
