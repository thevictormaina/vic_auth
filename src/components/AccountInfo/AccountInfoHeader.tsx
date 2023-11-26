import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo, useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { AccountPropertiesType } from "../../types/accounts";
import EditAccount from "./EditAccount";
import ConfirmDelete from "./ConfirmDelete";

export default function AccountInfoHeader(props: AccountPropertiesType) {
  const { issuerName, issuerUrl, label } = props;
  const issuerHostName = useMemo(() => {
    if (issuerUrl) {
      try {
        const url = new URL(issuerUrl);
        return url.hostname;
      } catch (error) {
        console.error(error);
      }
    }
  }, [issuerUrl]);

  return (
    <header className="flex justify-between gap-4 relative">
      <div className="flex flex-col flex-1 overflow-x-hidden whitespace-nowrap gap-1 relative">
        <h2 className="text-slate-900 font-bold">{label}</h2>

        {issuerUrl ? (
          <a
            target="_blank"
            href={issuerUrl}
            className="flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800"
          >
            <Icon icon="material-symbols:link-rounded" />
            {issuerHostName}
          </a>
        ) : (
          <div className="font-medium text-slate-600">{issuerName}</div>
        )}

        <div className="z-10 absolute w-full top-0 bottom-0 right-0 max-w-[100px] [background:_linear-gradient(90deg,_rgba(241,_245,_249,_0.00)_0%,_#F1F5F9_100%)]"></div>
      </div>

      <Options accountProperties={props} />
    </header>
  );
}

type OptionsProps = { accountProperties: AccountPropertiesType };
function Options({ accountProperties }: OptionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLMenuElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggleMenu(isOpen?: boolean) {
    if (isOpen === undefined) setIsMenuOpen((prev) => !prev);
    else setIsMenuOpen(isOpen);
  }

  useClickOutside(
    menuRef.current,
    () => {
      if (isMenuOpen) toggleMenu(false);
    },
    buttonRef.current
  );

  // console.log(accountProperties);

  return (
    <>
      <button
        type="button"
        className="p-1 h-fit transition-all rounded-md text-blue-700 text-xl hover:text-blue-800 hover:bg-slate-200"
        title="Options"
        onClick={() => toggleMenu()}
        ref={buttonRef}
      >
        <Icon icon="material-symbols:more-vert" />
      </button>

      <menu
        className={[
          "list-none rounded-xl bg-blue-700 absolute right-0 top-10 z-50 shadow-xl overflow-hidden transition-all",
          !isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
        ref={menuRef}
      >
        <EditAccount accountProperties={accountProperties} />

        <hr className="border-slate-100/20" />

        {/* <button
          className="transition-colors hover:bg-red-700 w-full text-white hover:text-red-100 text-sm font-medium flex items-center gap-2 py-3 px-4"
          type="button"
        >
          <Icon icon="material-symbols:delete-rounded" /> Delete
        </button> */}

        <ConfirmDelete
          id={accountProperties.id}
          label={accountProperties.label}
        />
      </menu>
    </>
  );
}
