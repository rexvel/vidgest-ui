import { useState, useEffect, useCallback } from 'react';
import { dbManager } from '@/db/indexedDBManager';

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

export const useIndexedDB = <T>({ dbName, storeName, version = 1 }: UseIndexedDBOptions) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initDB = async () => {
      try {
        await dbManager.getConnection(dbName, version);
        if (isMounted) setIsReady(true);
      } catch (error) {
        console.error('IndexedDB error:', error);
      }
    };

    initDB();

    return () => {
      isMounted = false;
    };
  }, [dbName, version]);

  const performTransaction = useCallback(
    <R>(mode: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<R>): Promise<R> => {
      return new Promise(async (resolve, reject) => {
        try {
          const db = await dbManager.getConnection(dbName, version);
          const transaction = db.transaction(storeName, mode);
          const store = transaction.objectStore(storeName);
          const request = callback(store);

          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        } catch (error) {
          reject(error);
        }
      });
    },
    [dbName, storeName, version],
  );

  const add = useCallback(
    (item: T) => performTransaction('readwrite', (store) => store.add(item)),
    [performTransaction],
  );

  const getAll = useCallback(() => performTransaction('readonly', (store) => store.getAll()), [performTransaction]);

  const remove = useCallback(
    (id: IDBValidKey) => performTransaction('readwrite', (store) => store.delete(id)),
    [performTransaction],
  );

  return { add, getAll, remove, isReady };
};