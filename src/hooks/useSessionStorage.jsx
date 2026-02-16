import { useState } from "react";

export default function useSessionStorage(itemKey, init) {
  const [state, setState] = useState(() => {
    const prevState = sessionStorage.getItem(itemKey);
    if (prevState) {
      return JSON.parse(prevState);
    } else {
      sessionStorage.setItem(itemKey, init);
      return init;
    }
  });
  const changeState = (value) => {
    setState(value);
    sessionStorage.setItem(itemKey, JSON.stringify(value));
  };
  return [state, changeState];
}
