import { Button, Stack, Typography } from "@mui/material";
import { Logo } from "./Logo.comp";

export const Footer = () => {
  return (
    <Stack
      spacing={3}
      sx={{ p: 5 }}
      width={"100%"}
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="row" alignItems="center">
        <Logo />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button color="inherit">
          <Typography>Navigate</Typography>
        </Button>
        <Button color="inherit">
          <Typography>Navigate</Typography>
        </Button>
        <Button color="inherit">
          <Typography>Navigate</Typography>
        </Button>
      </Stack>
      <Stack direction="row" alignItems="end" gap={1}>
        <Typography>@</Typography>
        <Typography variant="caption">
          {`${new Date().getFullYear()} Statalize. All rights reserved`}
        </Typography>
      </Stack>
    </Stack>
  );
};
