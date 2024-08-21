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
  debugger;
  console.log(data);
  return (
    <div className="flex justify-center w-full bg-gray-100 min-h-screen"> {/* Full-width container */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8"> {/* Updated */}
        <VideoUrlForm onSubmit={handleSubmit} initialUrl={videoUrl} />
        <div className="flex flex-col lg:flex-row gap-8 mt-8"> {/* Updated */}
          <div className="w-full lg:w-1/2"> {/* Updated */}
            { videoId && <YouTubeVideoCard videoId={videoId} />}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
          </div>
          <div className="w-full lg:w-1/2"> {/* Updated */}
             <VideoTakewaysList data={data} />
          </div>
        </div>
      </div>
    </div>


  )
}