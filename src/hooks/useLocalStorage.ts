import { useState, useEffect } from "react";

// useLocalStorage Hook
export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const stateFromLocalStorage = localStorage.getItem(key);
    if (stateFromLocalStorage === null) return initialValue;
    return JSON.parse(stateFromLocalStorage, reviver<typeof initialValue>);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state, replacer<T>));
  }, [key, state]);

  return [state, setState] as const;
}

function replacer<T>(_: string, value: T) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: [...value],
    };
  }

  return value;
}

type ReviverValueType<T> = Exclude<ReturnType<typeof replacer<T>>, T>;
function reviver<T>(_: string, value: ReviverValueType<T>) {
  if (typeof value == "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }

  return value as T;
}
