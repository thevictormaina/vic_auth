import { Icon } from "@iconify/react/dist/iconify.js";
import { DialogModal } from "../Dialog";
import { useState } from "react";
import { AccountPropertiesType } from "../../types/accounts";
import useAccountsMapContext from "../../contexts/accountsMapContext";
import Button from "../Button";

type ConfirmDeleteProps = Pick<AccountPropertiesType, "id" | "label">;

export default function ConfirmDelete({ id, label }: ConfirmDeleteProps) {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const { removeAccount } = useAccountsMapContext();

  function handleConfirmToggle(value: boolean) {
    setConfirmOpen((prev) => (value !== undefined ? value : !prev));
  }

  function handleDeleteAccount() {
    const deletedAccount = removeAccount(id);
    if (deletedAccount !== undefined) handleConfirmToggle(false);
  }

  return (
    <>
      <button
        className="transition-colors hover:bg-red-700 w-full text-white hover:text-red-100 text-sm font-medium flex items-center gap-2 py-3 px-4"
        type="button"
        onClick={() => handleConfirmToggle(true)}
      >
        <Icon icon="material-symbols:delete-rounded" /> Delete
      </button>

      <DialogModal isOpen={isConfirmOpen} onModalToggle={handleConfirmToggle}>
        <div className="">
          <header className="flex gap-4 justify-between items-center mb-4">
            <h1 className="font-bold">
              Delete account <em>"{label}"?</em>
            </h1>
            <button
              className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              type="button"
              onClick={() => handleConfirmToggle(false)}
              autoFocus
            >
              Close
              <Icon
                icon="material-symbols:close-fullscreen-rounded"
                className="text-base"
              />
            </button>
          </header>

          <p className="mb-8 text-slate-600">
            Are you sure you want to delete this account? This action cannot be
            undone.
          </p>

          {/* <hr className="border border-slate-200" /> */}

          <div className="flex gap-4 justify-center">
            {/* <button type="button" className="text-blue-700 font-medium flex-1">
              Cancel
            </button> */}
            <Button
              type="button"
              className="flex-1 justify-center"
              onClick={() => handleConfirmToggle(false)}
            >
              <Icon icon="material-symbols:cancel-rounded" /> Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-700 hover:bg-red-800 flex-1 justify-center"
              onClick={handleDeleteAccount}
            >
              <Icon icon="material-symbols:delete-rounded" /> Delete
            </Button>
          </div>
        </div>
      </DialogModal>
    </>
  );
}
