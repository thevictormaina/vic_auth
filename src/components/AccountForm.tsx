
import { EditableAccountPropertiesType } from "../types/accounts";
import { Input } from "./Input";
import { useState } from "react";

type BaseAccountFormProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  onAccountSubmit: (
    updatedAccountProperties: EditableAccountPropertiesType
  ) => void;
  onReset?: () => void;
  accountProperties?: EditableAccountPropertiesType;
};

export function AccountForm({
  header,
  footer,
  onAccountSubmit,
  accountProperties,
}: BaseAccountFormProps) {
  const [values, setValues] = useState<EditableAccountPropertiesType>({
    label: accountProperties?.label ?? "",
    issuerName: accountProperties?.issuerName ?? "",
    secret: accountProperties?.secret ?? "",
    username: accountProperties?.username ?? "",
    issuerUrl: accountProperties?.issuerUrl ?? "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof EditableAccountPropertiesType;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("pre-submit");
    onAccountSubmit(values);
    // if (!accountProperties) handleReset();
  }

  function handleReset() {
    setValues(
      (prev) =>
        Object.keys(prev).reduce(
          (init, key) => ({ ...init, [key]: "" }),
          {}
        ) as EditableAccountPropertiesType
    );
  }

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
    >
      {/* Header should contain form title and a close button if form is in modal/dialog. */}
      {header}

      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))]  gap-4">
        <div className="col-span-full">
          <Input
            type="text"
            inputLabel="Account label"
            id="label"
            name="label"
            value={values.label ?? ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <Input
          type="text"
          inputLabel="Secret"
          id="secret"
          name="secret"
          value={values.secret ?? ""}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          inputLabel="Username"
          id="username"
          name="username"
          value={values.username ?? ""}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          inputLabel="Issuer's name"
          id="issuerName"
          name="issuerName"
          value={values.issuerName ?? ""}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          inputLabel="Issuer's URL"
          id="issuerUrl"
          name="issuerUrl"
          value={values.issuerUrl ?? ""}
          onChange={handleInputChange}
        />
      </div>

      <hr className="border-slate-200 border my-4" />

      {/* Footer should contain form actions */}
      {footer}
    </form>
  );
}
