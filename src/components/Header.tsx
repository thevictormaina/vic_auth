import { useState } from "react";
import logo from "../assets/logo.svg";
import useAccountsMapContext from "../contexts/accountsMapContext";
import { EditableAccountPropertiesType } from "../types/accounts";
import { AccountForm } from "./AccountForm";
import Button from "./Button";
import { Icon } from "@iconify/react";
import { DialogModal } from "./Dialog";

export default function Header() {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <img src={logo} alt="VM Auth Logo" />

      <div className="flex items-center gap-8">
        <AddNewAccount />

        {/* <Icon
          icon="material-symbols:menu-rounded"
          className="text-xl text-blue-700"
        /> */}
      </div>
    </header>
  );
}

function AddNewAccount() {
  const [isFormOpen, setFormOpen] = useState(false);
  const { createAccount } = useAccountsMapContext();
  const [newAccount, setNewAccount] = useState<EditableAccountPropertiesType>();

  function handleFormToggle(value?: boolean) {
    setFormOpen((prev) => (value !== undefined ? value : !prev));
  }

  function handleSubmit(
    updatedAccountProperties: EditableAccountPropertiesType
  ) {
    const account = createAccount(updatedAccountProperties);
    setNewAccount(account);
    handleFormToggle(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setFormOpen(true)}>
        <span>Add new account</span>
        <Icon icon="material-symbols:add-rounded" />
      </Button>

      {/* <NewAccountForm /> */}
      <DialogModal isOpen={isFormOpen} onModalToggle={handleFormToggle}>
        {isFormOpen && (
          <AccountForm
            header={
              <AccountFormHeader onFormClose={() => setFormOpen(false)} />
            }
            footer={<AccountFormFooter />}
            accountProperties={newAccount}
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
      <h1 className="font-bold  text-slate-900">Add new account</h1>
      <button
        className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
        type="button"
        onClick={onFormClose}
        autoFocus
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
        autoFocus
      >
        Clear
        <Icon icon="material-symbols:x-rounded" />
      </button>

      <Button
        type="submit"
        className="w-full order-1 sm:order-2 flex flex-1 justify-center items-center"
      >
        <Icon icon="material-symbols:add-circle-rounded" />
        Add account
      </Button>
    </footer>
  );
}
