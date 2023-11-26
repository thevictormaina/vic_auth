import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import useAccountsMapContext from "../../contexts/accountsMapContext";
import {
  AccountPropertiesType,
  EditableAccountPropertiesType,
} from "../../types/accounts";
import { AccountForm } from "../AccountForm";
import Button from "../Button";
import { DialogModal } from "../Dialog";

type EditAccountProps = {
  accountProperties: AccountPropertiesType;
};

export default function EditAccount({ accountProperties }: EditAccountProps) {
  const [isFormOpen, setFormOpen] = useState(false);
  const { updateAccount } = useAccountsMapContext();

  function handleFormToggle(value?: boolean) {
    // if (value) setFormOpen(value);
    // else setFormOpen((prev) => !prev);
    setFormOpen((prev) => (value !== undefined ? value : !prev  ));
  }

  function handleSubmit(
    updatedAccountProperties: EditableAccountPropertiesType
  ) {
    updateAccount(accountProperties.id, updatedAccountProperties);
    console.log("submitted");
    // handleFormToggle(false);
  }

  return (
    <>
      <button
        className="transition-colors hover:bg-blue-800 w-full text-white text-sm font-medium flex items-center gap-2 py-3 px-4"
        onClick={() => handleFormToggle(true)}
        type="button"
      >
        <Icon icon="material-symbols:edit-rounded" /> Edit
      </button>

      <DialogModal isOpen={isFormOpen} onModalToggle={handleFormToggle}>
        {isFormOpen && (
          <AccountForm
            header={
              <AccountFormHeader onFormClose={() => setFormOpen(false)} />
            }
            footer={<AccountFormFooter />}
            accountProperties={accountProperties}
            onAccountSubmit={handleSubmit}
          />
        )}
      </DialogModal>
    </>
  );
}
type AccountHeaderProps = { onFormClose: () => void };
function AccountFormHeader({ onFormClose }: AccountHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 mb-4">
      <h1 className="font-bold  text-slate-900">Edit account</h1>
      <button
        className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
        type="button"
        onClick={onFormClose}
        // autoFocus
      >
        Close
        <Icon
          icon="material-symbols:close-fullscreen-rounded"
          className="text-base"
        />
      </button>
    </header>
  );
}

// type AccountFormFooterProps = { onSubmitClick(): void; onResetClick(): void };
function AccountFormFooter() {
  return (
    <footer className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 items-center">
      <button
        className="p-4 font-medium text-red-700 hover:text-red-800 flex items-center gap-1 order-2"
        type="reset"
      >
        Clear
        <Icon icon="material-symbols:x-rounded" />
      </button>

      <Button
        type="submit"
        className="w-full order-1 sm:order-2 flex flex-1 justify-center items-center"
        autoFocus
      >
        Save account <Icon icon="material-symbols:check-small-rounded" />
      </Button>
    </footer>
  );
}
