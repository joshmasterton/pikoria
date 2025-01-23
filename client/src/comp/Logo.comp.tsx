import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/pikoria.png";
import Typography from "@mui/material/Typography";

export const Logo = () => {
  return (
    <Box flexDirection="row" display="flex" gap={2} alignItems="center">
      <Avatar variant="square" sx={{ width: 20, height: 20 }} src={logo} />
      <Typography color="textPrimary">PIKORIA</Typography>
    </Box>
  );
};
