import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { AccountPropertiesType } from "../../types/accounts";
import useCounter from "../../hooks/useCounter";
import { TOTP } from "otpauth";
import AccountInfoHeader from "./AccountInfoHeader";
import Counter from "./Counter";

type AccountInfoProps = AccountPropertiesType;
export default function AccountInfo(props: AccountInfoProps) {
  // const { label, secret, issuerName, issuerUrl, username } = props;

  const { counter, intervalAmount, updateCounter } = useCounter(30 * 1000);

  const auth = new TOTP({
    secret: props.secret,
    label: props.label,
    issuer: props.issuerName,
  });
  const otp = auth.generate();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCounter();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [updateCounter]);

  return (
    <article className="bg-slate-100 shadow-soft-glow p-6 rounded-2xl font-medium flex flex-col gap-6 relative">
      <AccountInfoHeader {...props} />

      <div className="flex items-center gap-4">
        <p className="text-slate-900 text-3xl font-bold tracking-widest">
          {otp}
        </p>

        <Copy otp={otp} />
      </div>

      <footer className="flex items-center justify-between">
        <div className="relative flex-1 overflow-hidden">
          <p className="text-slate-600">{props.username}</p>
          <div className="z-10 absolute w-full top-0 bottom-0 right-0 max-w-[100px] [background:_linear-gradient(90deg,_rgba(241,_245,_249,_0.00)_0%,_#F1F5F9_100%)]"></div>
        </div>

        <Counter counter={counter} intervalAmount={intervalAmount} />
      </footer>
    </article>
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
    <>
      {!otpCopied && (
        <button
          title="Copy OTP"
          className="text-xl text-blue-700 p-2 rounded-md transition-all hover:bg-slate-200 hover:text-blue-800"
          onClick={handleClick}
        >
          <Icon icon="material-symbols:content-copy-rounded" />
        </button>
      )}

      <p
        className={[
          "text-sm text-green-600 font-medium flex items-center gap-1 transition-all",
          otpCopied
            ? "opacity-100"
            : "pointer-events-none opacity-0 translate-y-4",
        ].join(" ")}
      >
        <Icon icon="material-symbols:check-circle-rounded" />
        Copied
      </p>
    </>
  );
}
