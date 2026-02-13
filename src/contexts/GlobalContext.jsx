import { createContext, useContext } from "react";
// custom hooks
import useService from "../hooks/useService";
import useCompare from "../hooks/useCompare";
import useStorage from "../hooks/useStorage";
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
  return (
    <GlobalContext.Provider
      value={{
        services,
        categories,
        getDetailedService,
        compareIds,
        addToCompare,
        removeFromCompare,
        handleAddToCompare,
        getComparingList,
        favs,
        setFavs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
