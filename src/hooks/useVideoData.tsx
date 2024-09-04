import { useCallback } from 'react';
import { useLoadedHighlights, useProfileData } from '@/hooks';

export function useVideoData() {
  const { addItem, isReady } = useProfileData({ dbName: 'profileData', storeName: 'videos' });
  const { data, fetchData, removeHighlight } = useLoadedHighlights();

  const saveFetchedData = useCallback(async (fetchedData:  Awaited<ReturnType<typeof fetchData>>) => {
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
    const fetchedData = await fetchData(url);
    if (fetchedData) {
      await saveFetchedData(fetchedData);
    }
  }, [fetchData, saveFetchedData]);

  return { data, fetchAndSaveData, removeHighlight };
}