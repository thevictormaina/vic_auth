import { CounterType } from "../../types/counter";

type CounterProps = Pick<CounterType, "counter" | "intervalAmount">;
export default function Counter({ counter, intervalAmount }: CounterProps) {
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
