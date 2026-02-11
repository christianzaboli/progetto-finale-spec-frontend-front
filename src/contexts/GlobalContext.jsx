import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  const [services, setServices] = useState([]);

  // fetch basic dall'api
  useEffect(() => {
    fetch(`http://localhost:3001/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = services?.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []);
  return (
    <GlobalContext.Provider value={{ services, categories }}>
      {children}
    </GlobalContext.Provider>
  );
}
