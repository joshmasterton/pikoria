import { DarkMode, LightMode, StarBorderSharp } from "@mui/icons-material";
import {
  alpha,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useThemeContext } from "../context/Theme.context";

export const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
