import {
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useDialogContext } from "../context/Dialog.context";

export const AlertDialog = () => {
  const { message, title, open, setOpen } = useDialogContext();
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      aria-label="Dialog"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          background: alpha(theme.palette.background.default, 1),
          backdropFilter: "blur(24px)",
          border: 1,
          borderColor: theme.palette.divider,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
