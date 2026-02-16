import { createContext, useContext } from "react";
// custom hooks
import useService from "../hooks/useService";
import useCompare from "../hooks/useCompare";
import useStorage from "../hooks/useStorage";
import useSessionStorage from "../hooks/useSessionStorage";
export const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  // service hook
  const { services, categories, getDetailedService } = useService();

  // compare hook
  const {
    compareIds,
    addToCompare,
    removeFromCompare,
    handleAddToCompare,
    getComparingList,
  } = useCompare();

  // favorites hook
  const [favs, setFavs] = useStorage("favoritesIds", []);
  // const [compares, setCompares] = useSessionStorage("CompareIds", []);
  return (
    <GlobalContext.Provider
      value={{
        //useService()
        services,
        categories,
        getDetailedService,

        //useCompare()
        compareIds,
        addToCompare,
        removeFromCompare,
        handleAddToCompare,
        getComparingList,
        //useStorage()
        favs,
        setFavs,
        //useSessionStorage()
        // compares,
        // setCompares,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
