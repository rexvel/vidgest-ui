import useMindTreeData from '@/hooks';
import '../App.css'
import { useState } from 'react';
import YouTubeVideoCard from './YoutubeVideoCard';
import VideoTakewaysList from './VideoTakewaysList';
import VideoUrlForm from './PromptInput';

export function Home() {
  const { data, loading, error, fetchData } = useMindTreeData();
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (url: string) => {
    setVideoUrl(url);
    fetchData(url);
  };

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