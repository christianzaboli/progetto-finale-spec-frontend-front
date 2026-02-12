import { useState } from "react";

export default function useCompare() {
  const [compareIds, setCompareIds] = useState([]);

  // comparing service
  const addToCompare = (id) => {
    if (compareIds.includes(id)) return;
    setCompareIds((prev) => [...prev, id]);
  };
  const removeFromCompare = (id) => {
    if (!compareIds.includes(id)) return;
    setCompareIds((prev) => prev.filter((s) => s !== id));
  };
  const handleAddToCompare = (id) => {
    if (compareIds.includes(id)) return removeFromCompare(id);
    addToCompare(id);
  };

  //
  async function getComparingList() {
    const promises = compareIds.map((id) =>
      fetch(`http://localhost:3001/services/${id}`).then((res) => res.json()),
    );
    const result = await Promise.all(promises);
    const cleanRes = result.map((r) => r.service);
    return cleanRes;
  }
  return {
    compareIds,
    addToCompare,
    removeFromCompare,
    handleAddToCompare,
    getComparingList,
  };
}
