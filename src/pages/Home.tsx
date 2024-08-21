//@ts-nocheck
import { useState, useCallback } from 'react';
import useMindTreeData from '@/hooks/useMindTree';
import YouTubeVideoCard from '@/components/YoutubeVideoCard';
import VideoTakewaysList from '@/components/VideoTakewaysList';
import VideoUrlForm from '@/components/PromptInput';
import { useProfileData } from '@/hooks/useProfileData';
import '@/App.css'

export function Home() {
  const { data, loading, error, fetchData } = useMindTreeData();
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
    debugger;
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
          <div className="home-video-section">
            {videoId && <YouTubeVideoCard videoId={videoId} />}
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
          </div>
          <div className="home-takeaways-section">
            <VideoTakewaysList data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}