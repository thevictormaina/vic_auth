import { useState } from "react";
import { CounterType } from "../types/counter";

/**
 * @param intervalAmount In milliseconds
 */
function computeCounter(intervalAmount: number): CounterType {
  const currentTime = Date.now();
  const currentInterval = Math.floor(currentTime / intervalAmount);
  const counter = (currentTime % currentInterval) + 1;

  return {
    counter,
    currentInterval,
    intervalAmount,
  };
}

/**
 * @param intervalAmount In milliseconds
 */
export default function useCounter(intervalAmount: number) {
  const [counter, setCounter] = useState<CounterType>(
    computeCounter(intervalAmount)
  );

  function updateCounter() {
    setCounter(() => computeCounter(intervalAmount));
  }

  return { ...counter, updateCounter } as const;
}
