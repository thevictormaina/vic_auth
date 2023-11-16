import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AccountPropertiesType } from "../types/accounts";
import useCounter from "../hooks/useCounter";
import { TOTP } from "otpauth";
import { CounterType } from "../types/counter";
import useClickOutside from "../hooks/useClickOutside";
type AccountInfoProps = AccountPropertiesType;
export default function AccountInfo(props: AccountInfoProps) {
  const { label, secret, issuerName, issuerUrl, username } = props;

  const { counter, intervalAmount, updateCounter } = useCounter(30 * 1000);

  const auth = new TOTP({ secret, label, issuer: issuerName });
  const otp = auth.generate();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCounter();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updateCounter]);

  return (
    <article className="bg-slate-100 shadow-soft-glow p-6 rounded-2xl font-medium flex flex-col gap-6 relative">
      <Header label={label} issuerName={issuerName} issuerUrl={issuerUrl} />

      <div className="flex items-center gap-4">
        <p className="text-slate-900 text-3xl font-bold tracking-widest">
          {otp}
        </p>

        <Copy otp={otp} />
      </div>

      <footer className="flex items-center justify-between">
        <div className="relative flex-1 overflow-hidden">
          <p className="text-slate-600">{username}</p>
          <div className="z-10 absolute w-full top-0 bottom-0 right-0 max-w-[100px] [background:_linear-gradient(90deg,_rgba(241,_245,_249,_0.00)_0%,_#F1F5F9_100%)]"></div>
        </div>

        <Counter counter={counter} intervalAmount={intervalAmount} />
      </footer>
    </article>
  );
}

type AccountInfoHeaderType = Pick<
  AccountPropertiesType,
  "label" | "issuerName" | "issuerUrl"
>;
function Header({ label, issuerName, issuerUrl }: AccountInfoHeaderType) {
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

      <Options />
    </header>
  );
}

function Options() {
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

  return (
    <>
      <button
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
        <button className="transition-colors hover:bg-blue-800 w-full text-white text-sm font-medium flex items-center gap-2 py-3 px-4">
          <Icon icon="material-symbols:edit-rounded" /> Edit
        </button>
        <hr className="border-slate-100/20" />
        <button className="transition-colors hover:bg-red-700 w-full text-white hover:text-red-100 text-sm font-medium flex items-center gap-2 py-3 px-4">
          <Icon icon="material-symbols:delete-rounded" /> Delete
        </button>
      </menu>
    </>
  );
}

type CopyProps = { otp: string };
function Copy({ otp }: CopyProps) {
  const [otpCopied, setOtpCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(otp).then(
      () => setOtpCopied(true),
      (reason) => console.error(reason)
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOtpCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [otpCopied]);

  return (
    <div className="flex items-center gap-2">
      {otpCopied ? (
        <p className="text-sm text-green-600 font-medium flex items-center gap-1 transition-all">
          <Icon icon="material-symbols:check-circle-rounded" />
          Copied
        </p>
      ) : (
        <button
          title="Copy OTP"
          className="text-xl text-blue-700 hover:text-blue-800"
          onClick={handleClick}
        >
          <Icon icon="material-symbols:content-copy-rounded" />
        </button>
      )}
    </div>
  );
}

type CounterProps = Pick<CounterType, "counter" | "intervalAmount">;
function Counter({ counter, intervalAmount }: CounterProps) {
  return (
    <div className="flex items-center text-sm gap-2 text-slate-600">
      <span>{Math.floor(counter / 1000) + 1}s</span>
      <PieProgress size={14} percent={(counter / intervalAmount) * 100} />
    </div>
  );
}

type PieProgressProps = {
  size?: number;
  percent: number;
};

function PieProgress({ size = 16, percent }: PieProgressProps) {
  const radius = 25;
  const circumference = Math.floor(Math.PI * radius * 2);

  // console.log(circumference * )

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle
        r={radius}
        cx="50"
        cy="50"
        strokeWidth={50}
        strokeDasharray={`${
          circumference * ((100 - percent) / 100)
        } ${circumference}`}
        style={{
          transform: "rotate(-90deg) scaleY(-1)",
          transformOrigin: "center",
          transition: percent > 3 ? "linear 1s all" : "none",
        }}
        className="stroke-slate-400 fill-transparent"
      >
        <animate />
      </circle>
    </svg>
  );
}

// type OptionsProps = {};
