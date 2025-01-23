import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.redux";
import { useTheme } from "@mui/material/styles";
import { CustomTooltip } from "./CustomTooltip.comp";
import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { Logo } from "./Logo.comp";
import { Theme } from "./Theme.comp";
import { changeTheme } from "../redux/themeSlice.redux";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Menu from "@mui/material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Button from "@mui/material/Button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Nav = () => {
  const [userSettingsAnchor, setUserSettingsAnchor] =
    useState<HTMLElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user, loading } = useAppSelector((state) => state.auth);
  const { localTheme } = useAppSelector((state) => state.theme);
  const navigate = useNavigate();
  const openUserSettings = Boolean(userSettingsAnchor);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box flexGrow={1}>
      <AppBar
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.divider,
          p: 2,
          bgcolor: theme.palette.background.default,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Stack alignItems="center" direction="row" gap={2}>
          <Logo />
          <Box
            display={{ xs: "flex", sm: "none" }}
            justifyContent="end"
            flexGrow={1}
          >
            <IconButton
              aria-label="Menu"
              size="small"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            display={{ xs: "none", sm: "flex" }}
            justifyContent="end"
            flexGrow={1}
            gap={2}
          >
            <CustomTooltip title="Home">
              <IconButton aria-label="Home" size="small">
                <HomeRoundedIcon fontSize="small" />
              </IconButton>
            </CustomTooltip>
            <Theme />
            <CustomTooltip title={user?.displayName ?? "Sign in"}>
              <IconButton
                aria-label="User settings"
                size="small"
                onClick={(event) => setUserSettingsAnchor(event.currentTarget)}
                sx={{ p: 0 }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <Avatar
                    sx={{ height: 30, width: 30 }}
                    alt={user?.displayName ?? ""}
                    src={user?.photoURL ?? undefined}
                  />
                )}
              </IconButton>
            </CustomTooltip>
            <Menu
              elevation={0}
              open={openUserSettings}
              onClose={() => setUserSettingsAnchor(null)}
              anchorEl={userSettingsAnchor}
            >
              {user ? (
                <Button
                  color="inherit"
                  sx={{ px: 2 }}
                  loading={loading}
                  startIcon={<LogoutRoundedIcon />}
                  onClick={async () => {
                    await dispatch(logout());
                    setUserSettingsAnchor(null);
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  color="inherit"
                  sx={{ px: 2 }}
                  startIcon={<LoginRoundedIcon />}
                  onClick={() => navigate("/auth/signin")}
                >
                  Sign in
                </Button>
              )}
            </Menu>
          </Box>
        </Stack>
        <Drawer
          elevation={0}
          anchor="top"
          open={openDrawer && isLargeScreen}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
          }}
          onClose={() => setOpenDrawer(!openDrawer)}
        >
          <Box>
            <List>
              <ListItemButton>
                <HomeRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                Home
              </ListItemButton>
              {user ? (
                <ListItemButton
                  disabled={loading}
                  onClick={async () => await dispatch(logout())}
                >
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                      sx={{ mr: 4.5 }}
                    />
                  ) : (
                    <LogoutRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                  )}
                  Logout
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => navigate("/auth/signin")}>
                  <LoginRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                  Login
                </ListItemButton>
              )}
            </List>
            <Divider />
            <List>
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
      </AppBar>
    </Box>
  );
};
