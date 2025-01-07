import {
  alpha,
  AppBar,
  Box,
  Button,
  Divider,
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  Slide,
  SwipeableDrawer,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { ReactElement, SyntheticEvent, useState } from "react";
import { Logo } from "./Logo.comp";
import { useThemeContext } from "../context/Theme.context";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { KeyboardArrowUp } from "@mui/icons-material";

const HideOnScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger();

  return children;

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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export const Nav = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const { isDark, toggleIsDark } = useThemeContext();

  const toggleIsOpen = () => setOpen(!open);

  return (
    <>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
      <HideOnScroll>
        <AppBar
          color="inherit"
          elevation={0}
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: alpha(theme.palette.background.default, 0.7),
            backdropFilter: "blur(24px)",
            borderLeft: 0,
            borderRight: 0,
            borderTop: 0,
          }}
        >
          <Box
            width="100%"
            maxWidth={1100}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              pl: 2,
              pr: 2,
              gap: 1,
            }}
          >
            <IconButton
              aria-label="menu"
              size="small"
              onClick={toggleIsOpen}
              sx={{
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Logo />
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 1,
                  flex: 1,
                },
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button color="inherit">
                  <Typography>Navigate</Typography>
                </Button>
                <Button color="inherit">
                  <Typography>Navigate</Typography>
                </Button>
                <Button color="inherit">
                  <Typography>Navigate</Typography>
                </Button>
              </Box>
            </Box>
            <Tooltip title="Switch light mode">
              <IconButton
                color="primary"
                aria-label="theme button"
                onClick={toggleIsDark}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                {isDark ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <SwipeableDrawer
            PaperProps={{
              sx: {
                backgroundColor: alpha(theme.palette.background.default, 1),
                backdropFilter: "blur(24px)",
                borderLeft: 0,
                borderRight: 0,
                borderTop: 0,
              },
            }}
            anchor="top"
            elevation={0}
            open={!isLargeScreen && open}
            onOpen={toggleIsOpen}
            onClose={toggleIsOpen}
            ModalProps={{ keepMounted: true }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  pl: 2,
                  pr: 2,
                }}
              >
                <Logo />
              </Box>
              <Divider />
              <List>
                <ListItem>
                  <Button
                    color="inherit"
                    sx={{ display: "flex", justifyContent: "start" }}
                    fullWidth
                  >
                    Navigate
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    color="inherit"
                    sx={{ display: "flex", justifyContent: "start" }}
                    fullWidth
                  >
                    Navigate
                  </Button>
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
                sx={{ p: 2, display: "flex", justifyContent: "end" }}
              >
                <ToggleButton value={true}>
                  <DarkModeIcon />
                </ToggleButton>
                <ToggleButton value={false}>
                  <LightModeIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </SwipeableDrawer>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
