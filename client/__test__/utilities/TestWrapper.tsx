import React from "react";
import { AuthContextProvider } from "../../src/context/Auth.context";
import { DialogContextProvider } from "../../src/context/Dialog.context";
import { ThemeContextProvider } from "../../src/context/Theme.context";
import { RouterProvider } from "react-router";
import { AlertDialog } from "../../src/comps/AlertDialog.comp";
import { memoryRouter } from "../../vitest.setup";

export const TestWrapper = ({ initialEntries }: { initialEntries: string }) => {
  const router = memoryRouter(initialEntries);

  return (
    <DialogContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
          <AlertDialog />
        </ThemeContextProvider>
      </AuthContextProvider>
    </DialogContextProvider>
  );
};
