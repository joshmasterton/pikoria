import Tooltip from "@mui/material/Tooltip";
import { ReactElement } from "react";

export const CustomTooltip = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};
