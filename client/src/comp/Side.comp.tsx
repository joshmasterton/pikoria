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
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { changeTheme } from "../redux/themeSlice.redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.redux";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export const Side = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const trigger = useScrollTrigger();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { localTheme } = useAppSelector((state) => state.theme);
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      open={!isLargeScreen}
      variant="permanent"
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box sx={{ minWidth: 246 }}>
        <List
          sx={{
            pt: trigger ? 1 : 9,
            transition: (theme) =>
              theme.transitions.create("padding", {
                duration: theme.transitions.duration.short,
              }),
          }}
        >
          <ListItemButton onClick={() => navigate("/home")}>
            <HomeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Home
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/categories")}>
            <AppsRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Categoires
          </ListItemButton>
          {user ? (
            <ListItemButton
              disabled={loading}
              onClick={async () => await dispatch(logout())}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} sx={{ mr: 4.5 }} />
              ) : (
                <LogoutRoundedIcon fontSize="small" sx={{ mr: 2 }} />
              )}
              Sign out
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate("/auth/signin")}>
              <LoginRoundedIcon fontSize="small" sx={{ mr: 2 }} />
              Sign in
            </ListItemButton>
          )}
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
