import { createContext, useContext } from "react";
// custom hooks
import useService from "../hooks/useService";
import useCompare from "../hooks/useCompare";
export const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  const { services, categories, getDetailedService } = useService();
  const {
    compareIds,
    addToCompare,
    removeFromCompare,
    handleAddToCompare,
    getComparingList,
  } = useCompare();
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
