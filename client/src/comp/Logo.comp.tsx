import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/pikoria.png";

export const Logo = () => {
  return (
    <Box flexDirection="row" display="flex" gap={2} alignItems="center">
      <Avatar
        variant="square"
        sx={{ width: 20, height: 20 }}
        alt="Pikoria"
        src={logo}
      />
    </Box>
  );
};
