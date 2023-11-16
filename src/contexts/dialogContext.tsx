import { createContext, useContext, useState } from "react";

type DialogContextType = {
  dialogOpen: boolean;
  toggleDialog: () => void;
  openDialog: () => void;
  closeDialog: () => void;
};
export const DialogContext = createContext<DialogContextType | null>(null);

export function DialogContextProvider({ children }: React.PropsWithChildren) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const ctx: DialogContextType = {
    dialogOpen,
    toggleDialog: () => setDialogOpen((prev) => !prev),
    openDialog: () => setDialogOpen(true),
    closeDialog: () => setDialogOpen(false),
  };

  return (
    <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>
  );
}

export function useDialogContext() {
  const { dialogOpen, closeDialog, openDialog, toggleDialog } =
    useContext(DialogContext)!;

  return { dialogOpen, toggleDialog, openDialog, closeDialog };
}
