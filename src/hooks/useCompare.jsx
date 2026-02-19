import useSessionStorage from "./useSessionStorage";

export default function useCompare() {
  const [compareIds, setCompareIds] = useSessionStorage("compareIds", []);

  // comparing service

  // ADD
  const addToCompare = (id) => {
    if (compareIds.includes(id) || compareIds.length === 4) return;
    setCompareIds([...compareIds, id]);
  };

  // REMOVE
  const removeFromCompare = (id) => {
    if (!compareIds.includes(id)) return;
    setCompareIds(compareIds.filter((s) => s !== id));
  };

  // REMOVE
  const handleAddToCompare = (id) => {
    if (compareIds.includes(id)) return removeFromCompare(id);
    addToCompare(id);
  };

  // MULTI DETAILED GET
  async function getComparingList(ids) {
    const promises = ids.map((id) =>
      fetch(`http://localhost:3001/services/${id}`).then((res) => res.json()),
    );
    const result = await Promise.all(promises);
    return result.map((r) => r.service);
  }

  return {
    compareIds,
    addToCompare,
    removeFromCompare,
    handleAddToCompare,
    getComparingList,
  };
}
