import { useState, useRef } from "react";
import logo from "../assets/logo.svg";
import useAccountsMapContext from "../contexts/accountsMapContext";
import { useDialogContext } from "../contexts/dialogContext";
import { EditableAccountPropertiesType } from "../types/accounts";
import { BaseAccountForm } from "./BaseAccountForm";
import Button from "./Button";
import { Icon } from "@iconify/react";
import { Dialog } from "./Dialog";

export default function Header() {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <img src={logo} alt="VM Auth Logo" />

      <div className="flex items-center gap-8">
        <AddNewAccount />

        <Icon
          icon="material-symbols:menu-rounded"
          className="text-xl text-blue-700"
        />
      </div>
    </header>
  );
}

function AddNewAccount() {
  const { openDialog } = useDialogContext();
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} type="button" onClick={() => openDialog()}>
        <span>Add new account</span>
        <Icon icon="material-symbols:add-rounded" />
      </Button>

      <div ref={formWrapperRef}>
        <NewAccountForm />
      </div>
    </>
  );
}

function NewAccountForm() {
  const { createAccount } = useAccountsMapContext();
  const [newAccount, setNewAccount] = useState<EditableAccountPropertiesType>({
    label: "",
    secret: "",
    username: "",
    issuerName: "",
    issuerUrl: "",
  });

  function clearAccountProperties() {
    setNewAccount({
      label: "",
      secret: "",
      username: "",
      issuerName: "",
      issuerUrl: "",
    });
  }

  function handleSubmit() {
    createAccount(newAccount);
    clearAccountProperties();
  }

  return (
    <Dialog>
      <BaseAccountForm
        title="New account"
        accountProperties={newAccount}
        setAccountProperties={setNewAccount}
        clearAccountProperties={clearAccountProperties}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
}
