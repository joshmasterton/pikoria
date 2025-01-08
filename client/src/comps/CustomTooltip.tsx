import { Tooltip, useTheme } from "@mui/material";
import { ReactElement } from "react";

export const CustomTooltip = ({
  children,
  title,
}: {
  children: ReactElement;
  title: string;
}) => {
  const theme = useTheme();

  return (
    <Tooltip
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.main,
          },
        },
      }}
      title={title}
    >
      {children}
    </Tooltip>
  );
};
