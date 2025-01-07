import { Avatar } from "@mui/material";
import logo from "../assets/statalize.png";

export const Logo = () => {
  return <Avatar variant="square" sx={{ p: 0, m: 0 }} alt="logo" src={logo} />;
};
