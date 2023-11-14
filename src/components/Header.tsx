import logo from "../assets/logo.svg";
import { useDialogContext } from "../contexts/dialogContext";
import Button from "./Button";
import { Icon } from "@iconify/react";

export default function Header() {
  const { openDialog } = useDialogContext();
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <img src={logo} alt="VM Auth Logo" />

      <div className="flex items-center gap-8">
        <Button
          type="button"
          className="hidden sm:flex"
          onClick={() => openDialog()}
        >
          <span>Add new account</span>
          <Icon icon="material-symbols:add-rounded" />
        </Button>

        <Icon
          icon="material-symbols:menu-rounded"
          className="text-xl text-blue-700"
        />
      </div>
    </header>
  );
}
