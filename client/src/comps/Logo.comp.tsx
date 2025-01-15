import { Avatar } from "@mui/material";
import logo from "../assets/pikoriaSmall.png";

export const Logo = ({ large }: { large?: boolean }) => {
  return (
    <Avatar
      variant="square"
      sx={{ width: large ? 50 : 35, p: large ? 0 : 0.5, m: 0 }}
      alt="logo"
      src={logo}
    />
  );
};
