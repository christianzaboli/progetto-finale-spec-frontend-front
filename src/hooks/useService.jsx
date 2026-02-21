import { useState, useEffect } from "react";
import { fetchServiceApi } from "../assets/utils";

const API_URL = import.meta.env.VITE_API_URL;
export default function useService() {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleQuery = (value) => {
    if (typeof value !== "string")
      throw new Error("il valore deve essere una stringa");
    setQuery(value.trim());
  };

  const handleCategory = (value) => {
    if (value !== "") {
      return setCategoryFilter(value.toLowerCase());
    } else {
      return setCategoryFilter("");
    }
  };

  // fetch basic dall'api
  useEffect(() => {
    fetchServiceApi(query, categoryFilter)
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, [query, categoryFilter]);

  // Versione hardcoded (per sfruttare meglio le chiamate api disponibili)
  const categories = ["Vod", "Anime", "Free", "Mixed", "Sports", "Live"];
  // const categories = services?.reduce((acc, curr) => {
  //   if (!acc.includes(curr.category)) {
  //     acc.push(curr.category);
  //   }
  //   return acc;
  // }, []);

  // fetch detailed service
  const getDetailedService = async (id) => {
    try {
      const response = await fetch(`${API_URL}/services/${id}`);
      const data = await response.json();
      if (!data.success)
        throw new Error(`Errore nel fetch del servizio ${id}, esiste?`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    services,
    categories,
    categoryFilter,
    getDetailedService,
    query,
    handleQuery,
    handleCategory,
  };
}
