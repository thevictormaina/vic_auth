import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      {...props}
      className={`p-4 flex items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-soft-glow ${props.className} transition-all`}
      ref={ref}
    >
      {props.children}
    </button>
  );
});

export default Button;
