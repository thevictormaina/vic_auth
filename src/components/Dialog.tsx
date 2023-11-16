import { useEffect, useRef } from "react";
import {
  useDialogContext,
  DialogContextProvider,
} from "../contexts/dialogContext";
import useEventListener from "../hooks/useEventListener";

export function DialogWithProvider({ children }: React.PropsWithChildren) {
  return (
    <DialogContextProvider>
      <Dialog>{children}</Dialog>
    </DialogContextProvider>
  );
}

type DialogProps = React.PropsWithChildren; // & { title?: string };
export function Dialog({ children /* title */ }: DialogProps) {
  const { dialogOpen, closeDialog } = useDialogContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEventListener(
    "click",
    (e) => {
      const rect = dialogRef.current!.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) closeDialog();
    },
    dialogRef.current!
  );

  // Toggle modal based on context state
  useEffect(() => {
    if (dialogOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [dialogRef, dialogOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="p-4 sm:p-8 backdrop:bg-slate-200/90 rounded-2xl bg-slate-100 drop-shadow-sm border border-slate-200/60 sm:min-w-[30rem] max-w-full max-h-full overflow-hidden"
    >
      {children}
    </dialog>
  );
}
