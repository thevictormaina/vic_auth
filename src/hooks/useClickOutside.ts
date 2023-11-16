import useEventListener from "./useEventListener";

/**
 *
 * @param ref The element being targeted
 * @param callback A function to run when the click event happens
 * @param ignoreRef The element to be ignored from the outside-click event
 */
export default function useClickOutside<
  E extends HTMLElement,
  I extends HTMLElement
>(
  element: E | null,
  callback: (e: MouseEvent) => void,
  ignoreElement: I | null
) {
  useEventListener(
    "click",
    (e) => {
      if (ignoreElement && ignoreElement.contains(e.target as Node)) return;
      if (element === null || element.contains(e.target as Node)) return;
      callback(e);
    },
    document
  );
}

// /**
//  *
//  * @param ref The ref object of the element being targeted
//  * @param callback A function to run when the click event happens
//  * @param ignoreRef The ref object of an element to be ignored from the outside-click event
//  */
// export default function useClickOutside(
//   ref: React.RefObject<HTMLElement>,
//   callback: (event: Event) => void,
//   ignoreRef: React.RefObject<HTMLElement> | null = null
// ) {
//   useEventListener(
//     "click",
//     (e) => {
//       if (
//         ignoreRef &&
//         ignoreRef.current !== null &&
//         ignoreRef.current.contains(e.target as Node)
//       ) {
//         return;
//       } else if (
//         ref.current == null ||
//         ref.current.contains(e.target as Node)
//       ) {
//         return;
//       }
//       callback(e);
//     },
//     document
//   );
// }
