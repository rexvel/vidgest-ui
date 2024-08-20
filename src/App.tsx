import VideoTakewaysList from './components/VideoTakewaysList';
import useMindTreeData from './hooks'
import VideoUrlForm from './components/PromptInput';
import './App.css'
import YouTubeVideoCard from './components/YoutubeVideoCard';
import { useState } from 'react';


function App() {
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
    <div className="flex justify-center w-full bg-gray-100 min-h-screen"> {/* Full-width container */}
      <div className="w-[1400px] mx-auto px-4 py-8"> {/* 1600px wide centered container */}
        <VideoUrlForm onSubmit={handleSubmit} initialUrl={videoUrl} />
        <div className="flex flex-col md:flex-row gap-8 mt-8"> {/* Flex container for content */}
          <div className="w-full md:w-1/2"> {/* Left column */}
            {data && videoId && <YouTubeVideoCard videoId={videoId} />}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
          </div>
          <div className="w-full md:w-1/2"> {/* Right column */}
            {data && <VideoTakewaysList data={data} />}
          </div>
        </div>
      </div>
    </div>


  )
}

export default App