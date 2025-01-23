import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { changeTheme } from "../redux/themeSlice.redux";

export const Side = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { localTheme } = useAppSelector((state) => state.theme);
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      open={!isLargeScreen}
      variant="persistent"
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box sx={{ minWidth: 250 }}>
        <Box height={62} />
        <Divider />
        <List>
          <ListItemButton>
            <HomeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Home
          </ListItemButton>
          <ListItemButton>
            <HomeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Categories
          </ListItemButton>
          <ListItemButton>
            <HomeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Home
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <SettingsIcon fontSize="small" sx={{ mr: 2 }} />
            Settings
          </ListItemButton>
          <ListItemButton onClick={() => dispatch(changeTheme())}>
            {localTheme === "dark" ? (
              <DarkModeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            ) : (
              <LightModeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            )}
            Theme
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
