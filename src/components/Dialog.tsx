// import { useEffect, useRef } from "react";
// import {
//   useDialogContext,
//   DialogContextProvider,
// } from "../contexts/dialogContext";
// import useEventListener from "../hooks/useEventListener";

import React, { useEffect, useRef } from "react";
import useEventListener from "../hooks/useEventListener";

// export function DialogWithProvider({ children }: React.PropsWithChildren) {
//   return (
//     <DialogContextProvider>
//       <Dialog>{children}</Dialog>
//     </DialogContextProvider>
//   );
// }

// type DialogProps = React.PropsWithChildren & { id?: string };
// export function Dialog({ children, id }: DialogProps) {
//   const { dialogOpen, closeDialog } = useDialogContext();
//   const dialogRef = useRef<HTMLDialogElement>(null);

//   useEventListener(
//     "click",
//     (e) => {
//       const rect = dialogRef.current!.getBoundingClientRect();
//       const isInDialog =
//         rect.top <= e.clientY &&
//         e.clientY <= rect.top + rect.height &&
//         rect.left <= e.clientX &&
//         e.clientX <= rect.left + rect.width;

//       if (!isInDialog) closeDialog();
//     },
//     dialogRef.current!
//   );

//   // Toggle modal based on context state
//   useEffect(() => {
//     if (dialogOpen) {
//       dialogRef.current?.showModal();
//       dialogRef.current?.classList.remove("translate-y-20", "opacity-0");
//     } else {
//       dialogRef.current?.classList.add("translate-y-20", "opacity-0");
//       dialogRef.current?.close();
//     }

//     console.log(dialogOpen);
//   }, [dialogRef, dialogOpen]);

//   return (
//     <dialog
//       ref={dialogRef}
//       className="p-4 sm:p-8 backdrop:bg-slate-200/90 rounded-2xl bg-slate-100 drop-shadow-sm border border-slate-200/60 sm:min-w-[30rem] max-w-full max-h-full overflow-hidden transition-all"
//     >
//       {children}
//     </dialog>
//   );
// }

type DialogModalProps = {
  isOpen: boolean;
  onModalToggle: (prev: boolean) => void;
} & React.PropsWithChildren;
export function DialogModal({
  children,
  isOpen = false,
  onModalToggle,
}: DialogModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current !== null) {
      if (isOpen) {
        dialogRef.current.showModal();
        dialogRef.current.classList.remove("translate-y-20", "opacity-0");
      } else {
        dialogRef.current.classList.add("translate-y-20", "opacity-0");
        dialogRef.current.close();
      }
    }
  }, [isOpen, dialogRef]);

  useEventListener(
    "click",
    (e) => {
      const rect = dialogRef.current!.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      const isInsideForm =
        e.target !== null && (e.target as HTMLDialogElement).closest("form");

      if (!isInDialog && !isInsideForm) {
        onModalToggle(false);
      }
    },
    dialogRef.current!
  );

  useEventListener(
    "close",
    () => {
      // e.preventDefault();
      onModalToggle(false);
    },
    dialogRef.current!
  );

  return (
    <dialog
      ref={dialogRef}
      className="p-4 sm:p-8 backdrop:bg-slate-200/90 rounded-2xl bg-slate-100 drop-shadow-sm border border-slate-200/60 sm:min-w-[30rem] max-w-full max-h-full overflow-hidden transition-all"
    >
      {children}
    </dialog>
  );
}
