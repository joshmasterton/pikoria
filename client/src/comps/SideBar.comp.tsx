import {
  DarkMode,
  LightMode,
  Login,
  Logout,
  StarBorderSharp,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useThemeContext } from "../context/Theme.context";
import { useAuthContext } from "../context/Auth.context";

export const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { user, logout, loadingUpdatedUser } = useAuthContext();
  const { isDark, toggleIsDark } = useThemeContext();

  return (
    <>
      <Drawer
        variant="persistent"
        PaperProps={{
          sx: {
            zIndex: 0,
            width: 250,
            backgroundColor: alpha(theme.palette.background.default, 1),
            backdropFilter: "blur(24px)",
            borderLeft: 0,
            borderTop: 0,
            pt: 7,
          },
        }}
        anchor="left"
        elevation={1}
        open={isLargeScreen}
      >
        <Stack sx={{ height: "100%" }}>
          <List sx={{ height: "100%" }}>
            <ListItem>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <StarBorderSharp />
                </ListItemIcon>
                Navigate
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <StarBorderSharp />
                </ListItemIcon>
                Navigate
              </ListItemButton>
            </ListItem>
            <ListItem>
              {user ? (
                <Box width="100%">
                  <ListItemButton
                    disabled={loadingUpdatedUser}
                    onClick={logout}
                  >
                    <ListItemIcon>
                      {!loadingUpdatedUser && <Logout />}
                    </ListItemIcon>
                    Logout
                    {loadingUpdatedUser && (
                      <CircularProgress
                        size={24}
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </ListItemButton>
                </Box>
              ) : (
                <Box width="100%">
                  <ListItemButton onClick={() => navigate("/auth/login")}>
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
                    Login
                  </ListItemButton>
                </Box>
              )}
            </ListItem>
            <ListItem>
              <ListItemButton>
                {user?.displayName && user.photoURL && (
                  <>
                    <ListItemIcon>
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={user?.photoURL}
                      />
                    </ListItemIcon>
                    <Typography>{user?.displayName}</Typography>
                  </>
                )}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <ToggleButtonGroup
            size="small"
            aria-label="toggle dark mode"
            exclusive
            value={isDark}
            color="primary"
            onChange={(_e: SyntheticEvent, value) => {
              if (value !== null) toggleIsDark();
            }}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <ToggleButton value={true}>
              <DarkMode />
            </ToggleButton>
            <ToggleButton value={false}>
              <LightMode />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Drawer>
    </>
  );
};