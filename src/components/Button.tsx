type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`p-4 flex items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-soft-glow ${props.className} transition-all`}
    >
      {props.children}
    </button>
  );
}
