import VideoTakewaysList from './components/VideoTakewaysList';
import useMindTreeData from './hooks'
import VideoUrlForm from './components/PromptInput';
import './App.css'
import { useYouTubeVideoInfo } from './hooks/useYoutubeVideoInfo';
import YouTubeVideoCard from './components/YoutubeVideoCard';


function App() {
  const { data, loading, error, fetchData } = useMindTreeData();

  // const youtubeData = useYouTubeVideoInfo("eywYgAf27rs");
  // console.log(youtubeData);
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <VideoUrlForm onSubmit={fetchData} />
      <YouTubeVideoCard videoId='eywYgAf27rs' />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <VideoTakewaysList data={data}/> }
    </div>
  )
}

export default App