import VideoTakewaysList from './components/VideoTakewaysList';
import useMindTreeData from './hooks'
import './App.css'
import VideoUrlForm from './components/PromptInput';


function App() {
  const { data, loading, error, fetchData } = useMindTreeData();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <VideoUrlForm onSubmit={fetchData} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <VideoTakewaysList data={data}/> }
    </div>
  )
}

export default App