import { Avatar } from "@mui/material";
import logo from "../assets/pikoria.png";

export const Logo = ({ large }: { large?: boolean }) => {
  return (
    <Avatar
      variant="square"
      sx={{ width: large ? 75 : 35, p: 0, m: 0 }}
      alt="logo"
      src={logo}
    />
  );
};
