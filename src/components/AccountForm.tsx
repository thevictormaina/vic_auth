// import useAccountsMapContext from "../contexts/accountsMapContext";
import { useState } from "react";
import { EditableAccountPropertiesType } from "../types/accounts";
import { Dialog } from "./Dialog";
import { useDialogContext } from "../contexts/dialogContext";
import { Icon } from "@iconify/react";
import { Input } from "./Input";
import Button from "./Button";
import useAccountsMapContext from "../contexts/accountsMapContext";

export function NewAccountForm() {
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

type BaseAccountFormProps = {
  title: string;
  accountProperties: EditableAccountPropertiesType;
  setAccountProperties(
    properties:
      | EditableAccountPropertiesType
      | ((properties: EditableAccountPropertiesType) => void)
  ): void;
  clearAccountProperties: () => void;
  onSubmit: () => void;
}; // & React.PropsWithChildren;

export function BaseAccountForm({
  title,
  accountProperties,
  setAccountProperties,
  clearAccountProperties,
  onSubmit,
}: // children,
BaseAccountFormProps) {
  const { closeDialog } = useDialogContext();

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof accountProperties
  ) {
    const value = e.target.value ?? "";
    setAccountProperties((prev) => ({ ...prev, [fieldName]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="font-bold  text-slate-900">{title}</h1>
        <button
          className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          type="button"
          onClick={() => {
            clearAccountProperties();
            closeDialog();
          }}
          autoFocus
        >
          Close
          <Icon
            icon="material-symbols:close-fullscreen-rounded"
            className="text-base"
          />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          inputLabel="Account label"
          id="label"
          value={accountProperties.label}
          onChange={(e) => handleInputChange(e, "label")}
          required
        />

        <Input
          inputLabel="Secret"
          id="secret"
          value={accountProperties.secret}
          onChange={(e) => handleInputChange(e, "secret")}
          required
        />

        <Input
          inputLabel="Username"
          id="username"
          value={accountProperties.username}
          onChange={(e) => handleInputChange(e, "username")}
          required
        />

        <Input
          inputLabel="Issuer's name"
          id="label"
          value={accountProperties.issuerName}
          onChange={(e) => handleInputChange(e, "issuerName")}
          required
        />

        <Input
          inputLabel="Issuer's URL"
          id="label"
          value={accountProperties.issuerUrl}
          onChange={(e) => handleInputChange(e, "issuerUrl")}
          required
        />
      </div>

      <hr className="border-slate-200 border my-4" />

      <div className="flex gap-4 md:gap-8 items-center">
        <button
          className="p-4 font-medium text-red-700 hover:text-red-800 flex items-center gap-1"
          type="button"
          onClick={() => clearAccountProperties()}
          autoFocus
        >
          Clear
          <Icon icon="material-symbols:close-rounded" />
        </button>

        <Button type="submit" className="hidden sm:flex flex-1 justify-center">
          <span>Add new account</span>
          <Icon icon="material-symbols:add-rounded" />
        </Button>
      </div>
    </form>
  );
}
