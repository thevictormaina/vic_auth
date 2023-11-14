import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";

type InputProps = {
  inputLabel: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  const { inputLabel, error } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div
      onClick={() => focusInput()}
      className="group text-slate-900 flex flex-col gap-2"
    >
      <div className="relative cursor-text flex flex-col p-4 py-3 gap-1 bg-white rounded-xl outline-blue-600/30 focus-within:outline focus-within:border-blue-600/60 focus-within:shadow-soft-glow border border-slate-200">
        <input
          ref={inputRef}
          className="peer order-2 w-full bg-transparent outline-none invalid:bgred-500"
          type="text"
          {...props}
          placeholder=""
        />
        <label
          className="order-1 peer-placeholder-shown:absolute peer-placeholder-shown:font-medium peer-placeholder-shown:text-base text-sm font-bold text-slate-400 peer-focus:text-slate-600 w-fit pointer-events-none flex items-start gap-[.125rem]"
          htmlFor={props.id}
        >
          {inputLabel}
          {props.required && <span className="text-xs">*</span>}
        </label>
      </div>
      {error && (
        <p className="group-invalid:bg-blue-300 font-medium text-sm text-red-600 flex items-center gap-2">
          <Icon
            icon="material-symbols:info-outline-rounded"
            className="text-base"
          />
          This field is required.
        </p>
      )}
    </div>
  );
}
