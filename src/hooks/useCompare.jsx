import { useRef, useState } from "react";
import useSessionStorage from "./useSessionStorage";
const API_URL = import.meta.env.VITE_API_URL;

export default function useCompare() {
  const [compareIds, setCompareIds] = useSessionStorage("compareIds", []);
  const [showAlertToast, setShowAlertToast] = useState(false);
  const serviceCacheRef = useRef(new Map());
  const pendingRequestsRef = useRef(new Map());

  // ADD
  const addToCompare = (id) => {
    if (compareIds.includes(id) || compareIds.length === 4) return;
    setCompareIds([...compareIds, id]);
  };

  // REMOVE
  const removeFromCompare = (id) => {
    if (!compareIds.includes(id)) return;
    setCompareIds(compareIds.filter((s) => s !== id));
    setShowAlertToast(false);
  };

  // HANDLER
  const handleAddToCompare = (id) => {
    if (compareIds.includes(id)) {
      removeFromCompare(id);
      return;
    }
    if (compareIds.length === 4) {
      setShowAlertToast(true);
      return;
    }
    addToCompare(id);
  };

  const resetAlertToast = () => {
    setShowAlertToast(false);
  };
  async function getServiceById(id) {
    if (serviceCacheRef.current.has(id)) {
      return serviceCacheRef.current.get(id);
    }

    if (pendingRequestsRef.current.has(id)) {
      return pendingRequestsRef.current.get(id);
    }

    const request = fetch(`${API_URL}/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Errore nel fetch di servizio ${id}`);
        return res.json();
      })
      .then((obj) => {
        serviceCacheRef.current.set(id, obj.service);
        return obj.service;
      })
      .finally(() => {
        pendingRequestsRef.current.delete(id);
      });

    pendingRequestsRef.current.set(id, request);
    return request;
  }

  // MULTI DETAILED GET
  async function getComparingList(ids) {
    try {
      return await Promise.all(ids.map((id) => getServiceById(id)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  return {
    compareIds,
    addToCompare,
    removeFromCompare,
    handleAddToCompare,
    getComparingList,
    showAlertToast,
    resetAlertToast,
  };
}
