import { ReactElement, useState } from "react";
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
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

const HideOnScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const ScrollTop = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Fade in={trigger}>
      <Box sx={{ position: "fixed", bottom: 15, right: 15, zIndex: 4 }}>
        {children}
      </Box>
    </Fade>
  );
};

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
      <ScrollTop>
        <Fab
          size="small"
          color="primary"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ExpandLessRoundedIcon />
        </Fab>
      </ScrollTop>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={{
            height: 64,
            borderBottom: 1,
            borderColor: theme.palette.divider,
            p: 2,
            bgcolor: theme.palette.background.default,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            height="100%"
            gap={2}
          >
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
                <IconButton
                  onClick={() => navigate("/home")}
                  aria-label="Home"
                  size="small"
                >
                  <HomeRoundedIcon fontSize="small" />
                </IconButton>
              </CustomTooltip>
              <CustomTooltip title="Categories">
                <IconButton
                  onClick={() => navigate("/categories")}
                  aria-label="Categories"
                  size="small"
                >
                  <AppsRoundedIcon fontSize="small" />
                </IconButton>
              </CustomTooltip>
              <Theme />
              <CustomTooltip title={user?.displayName ?? "Sign in"}>
                <IconButton
                  aria-label="User settings"
                  size="small"
                  onClick={(event) =>
                    setUserSettingsAnchor(event.currentTarget)
                  }
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
              <Stack p={2} height={63} justifyContent="center">
                <Logo />
              </Stack>
              <Divider />
              <List>
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
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ mr: 4.5 }}
                      />
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
      </HideOnScroll>
    </Box>
  );
};
