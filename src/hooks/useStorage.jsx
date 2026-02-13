import { useState } from "react";

export default function useStorage(itemKey, init) {
  const [state, setState] = useState(() => {
    const prevState = localStorage.getItem(itemKey);
    if (prevState) {
      return JSON.parse(prevState);
    } else {
      localStorage.setItem(itemKey, init);
      return init;
    }
  });
  const changeState = (value) => {
    setState(value);
    localStorage.setItem(itemKey, JSON.stringify(value));
  };
  return [state, changeState];
}
