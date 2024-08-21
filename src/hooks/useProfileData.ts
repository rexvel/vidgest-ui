import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useIndexedDB } from './useIndexedDB'; // Import the previous hook

interface useProfileDataOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

export function useProfileData<T extends { id?: string }>({ dbName, storeName, version }: useProfileDataOptions) {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { add, getAll, update, remove, isReady: isDbReady } = useIndexedDB<T & { userId: string }>({ dbName, storeName, version });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(isUserLoaded && isSignedIn && isDbReady);
  }, [isUserLoaded, isSignedIn, isDbReady]);

  const addItem = useCallback(async (item: Omit<T, 'id'>) => {
    if (!isReady || !user) throw new Error('User data is not ready');
    const itemWithUserId = { ...item, userId: user.id } as T & { userId: string };
    return add(itemWithUserId);
  }, [isReady, user, add]);

  const getAllItems = useCallback(async () => {
    if (!isReady || !user) throw new Error('User data is not ready');
    const allItems = await getAll();
    return allItems.filter(item => item.userId === user.id) as T[];
  }, [isReady, user, getAll]);

  const updateItem = useCallback(async (id: string, updates: Partial<T>) => {
    if (!isReady || !user) throw new Error('User data is not ready');
    const existingItem = (await getAll()).find(item => item.id === id && item.userId === user.id);
    if (!existingItem) throw new Error('Item not found or does not belong to the current user');
    return update(id, { ...updates, userId: user.id } as Partial<T> & { userId: string });
  }, [isReady, user, getAll, update]);

  const removeItem = useCallback(async (id: string) => {
    if (!isReady || !user) throw new Error('User data is not ready');
    const existingItem = (await getAll()).find(item => item.id === id && item.userId === user.id);
    if (!existingItem) throw new Error('Item not found or does not belong to the current user');
    return remove(id);
  }, [isReady, user, getAll, remove]);

  return {
    addItem,
    getAllItems,
    updateItem,
    removeItem,
    isReady,
    user,
  };
}