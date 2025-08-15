import { useState, useEffect, useCallback } from 'react';

export function useData(collectionName: string) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const refreshData = useCallback(async () => {
    if (!collectionName) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/data/${collectionName}`); // <-- CORRECTED URL
      const result = await response.json();
      setData(result);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  }, [collectionName]);

  useEffect(() => { refreshData(); }, [refreshData]);

  const createItem = useCallback(async (newItem: any) => {
    await fetch(`/api/data/${collectionName}`, { method: 'POST', /* ... */ body: JSON.stringify(newItem) });
    await refreshData();
  }, [collectionName, refreshData]);

  const updateItem = useCallback(async (updatedItem: any) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    await fetch(`/api/data/${collectionName}`, { method: 'PUT', /* ... */ body: JSON.stringify(updatedItem) });
  }, [collectionName]);

  const deleteItem = useCallback(async (itemId: string) => {
    setData(prev => prev.filter(item => item.id !== itemId));
    await fetch(`/api/data/${collectionName}`, { method: 'DELETE', /* ... */ body: JSON.stringify({ id: itemId }) });
  }, [collectionName]);

  return { data, isLoading, createItem, updateItem, deleteItem, refreshData };
}
