import { useCallback, useState } from 'react';
import { useLoadedHighlights, useProfileData } from '@/hooks';

export function useVideoData() {
  const { addItem, isReady } = useProfileData({ dbName: 'mindtree', storeName: 'videos' });
  const { data, fetchData, removeHighlight } = useLoadedHighlights();
  const [isLoading, setIsLoading] = useState(false);

  const saveFetchedData = useCallback(async (fetchedData: Awaited<ReturnType<typeof fetchData>>) => {
    if (isReady && fetchedData) {
      try {
        await addItem(fetchedData);
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [isReady, addItem]);

  const fetchAndSaveData = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const fetchedData = await fetchData(url);
      if (fetchedData) {
        await saveFetchedData(fetchedData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, saveFetchedData]);

  return { data, fetchAndSaveData, removeHighlight, isLoading };
}