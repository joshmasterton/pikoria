import { useAppDispatch, useAppSelector } from "../redux/store.redux";
import { changeTheme } from "../redux/themeSlice.redux";
import { CustomTooltip } from "./CustomTooltip.comp";
import IconButton from "@mui/material/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

export const Theme = () => {
  const dispatch = useAppDispatch();
  const { localTheme } = useAppSelector((state) => state.theme);

  return (
    <CustomTooltip title="Change theme">
      <IconButton size="small" onClick={() => dispatch(changeTheme())}>
        {localTheme === "dark" ? (
          <DarkModeRoundedIcon fontSize="small" />
        ) : (
          <LightModeRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </CustomTooltip>
  );
};
