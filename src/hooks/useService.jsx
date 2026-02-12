import { useState, useEffect } from "react";
export default function useService() {
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

  // fetch detailed service
  const getDetailedService = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/services/${id}`);
      const data = await response.json();
      if (!data.success) throw new Error(`Errore nel fetch del servizio ${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    services,
    categories,
    getDetailedService,
  };
}
