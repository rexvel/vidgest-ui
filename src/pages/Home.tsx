import { useState, useCallback } from 'react';
import { YouTubeVideoCard, VideoTakewaysList, VideoUrlForm } from '@/components';
import { useLoadedHighlights, useProfileData } from '@/hooks';
import '@/App.css'

const Only: React.FC<{ if: boolean; children: React.ReactNode }> = ({ if: condition, children }) => {
  return condition ? <>{children}</> : null;
};

export function Home() {
  const { data, fetchData } = useLoadedHighlights();
  const [videoUrl, setVideoUrl] = useState('');
  const { addItem, isReady } = useProfileData({ dbName: 'mindtree', storeName: 'videos' });

  const saveFetchedData = useCallback(async (fetchedData) => {
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

  const handleSubmit = useCallback((url: string) => {
    setVideoUrl(url);
    fetchAndSaveData(url);
  }, [fetchAndSaveData]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = extractVideoId(videoUrl);

  return (
    <div className="home-container">
      <div className="home-content">
        <VideoUrlForm onSubmit={handleSubmit} initialUrl={videoUrl} />
        <div className="home-layout">
          <Only if={!!videoId}>
            <div className="home-video-section">
              <YouTubeVideoCard videoId={videoId!} />
            </div>
          </Only>
          <div className="home-takeaways-section">
            <VideoTakewaysList data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}