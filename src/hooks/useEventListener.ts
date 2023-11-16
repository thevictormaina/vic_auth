import { useEffect, useRef } from "react";

type Element<T extends HTMLElement> = T | Document | Window;

export default function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  eventType: K,
  callback: (e: HTMLElementEventMap[K]) => void,
  element: Element<T>
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: HTMLElementEventMap[K]) => {
      callbackRef.current(e);
    };
    element.addEventListener(
      eventType,
      handler as EventListenerOrEventListenerObject
    );

    return () =>
      element.removeEventListener(
        eventType,
        handler as EventListenerOrEventListenerObject
      );
  }, [eventType, element]);
}
