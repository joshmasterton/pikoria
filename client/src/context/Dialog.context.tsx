import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const DialogContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
} | null>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "useDialogContext must be used within a DialogContextProvider"
    );
  }

  return context;
};

export const DialogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  return (
    <DialogContext.Provider
      value={{ open, setOpen, message, setMessage, title, setTitle }}
    >
      {children}
    </DialogContext.Provider>
  );
};
