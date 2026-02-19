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
  const {
    services,
    categories,
    getDetailedService,
    query,
    handleQuery,
    handleCategory,
  } = useService();

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
  const handleFavorites = (id) => {
    favs.includes(id)
      ? setFavs(favs.filter((f) => f !== id))
      : setFavs([...favs, id]);
  };

  return (
    <GlobalContext.Provider
      value={{
        //useService()
        services,
        categories,
        getDetailedService,
        query,
        handleQuery,
        handleCategory,

        //useCompare()
        compareIds,
        addToCompare,
        removeFromCompare,
        handleAddToCompare,
        getComparingList,

        //useStorage()
        favs,
        handleFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
