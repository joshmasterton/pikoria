import {
  alpha,
  AppBar,
  Box,
  Button,
  Divider,
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
import { Logo } from "../comps/Logo.comp";
import { useThemeContext } from "../context/Theme.context";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const HideOnScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Nav = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("one");
  const { isDark, toggleIsDark } = useThemeContext();

  const toggleIsOpen = () => setOpen(!open);

  return (
    <HideOnScroll>
      <AppBar
        color="inherit"
        elevation={0}
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: alpha(theme.palette.background.default, 0.4),
          backdropFilter: "blur(24px)",
          borderLeft: 0,
          borderRight: 0,
          borderTop: 0,
        }}
      >
        <Box
          width="100%"
          maxWidth={900}
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
              <ToggleButton
                size="small"
                value="one"
                color="primary"
                sx={{ border: 0 }}
                selected={tabValue === "one"}
                onClick={() => setTabValue("one")}
              >
                <Typography>One</Typography>
              </ToggleButton>
              <ToggleButton
                size="small"
                selected={tabValue === "two"}
                color="primary"
                sx={{ border: 0 }}
                onClick={() => setTabValue("two")}
                value="two"
              >
                <Typography>Two</Typography>
              </ToggleButton>
              <ToggleButton
                size="small"
                selected={tabValue === "three"}
                color="primary"
                sx={{ border: 0 }}
                onClick={() => setTabValue("three")}
                value="three"
              >
                <Typography>Three</Typography>
              </ToggleButton>
            </Box>
          </Box>
          <Tooltip title="Switch light mode">
            <IconButton
              aria-label="theme button"
              onClick={toggleIsDark}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {isDark ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <SwipeableDrawer
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
              }}
            >
              <Logo />
              <Typography sx={{ mr: 1 }} variant="h6">
                Statalize
              </Typography>
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
  );
};
