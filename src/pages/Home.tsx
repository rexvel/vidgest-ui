import { useState, useCallback } from 'react';
import { YouTubeVideoCard, VideoUrlForm, VideoTakewaysList, Only } from '@/components';
import { useLoadedHighlights, useProfileData, useMobileForm } from '@/hooks';
import '@/App.css'

export function Home() {
  const { data, fetchData, removeHighlight } = useLoadedHighlights();
  const [videoUrl, setVideoUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { addItem, isReady } = useProfileData({ dbName: 'profileData', storeName: 'videos' });
  const { setIsMobileFormOpen } = useMobileForm();

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
    setShowForm(false);
  }, [fetchAndSaveData]);

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, []);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = extractVideoId(videoUrl);

  // console.log(data.topics)

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="mb-4">
          <div className="text-[#030303] text-[20px] font-montserrat font-bold leading-[30px] mb-2">
            New note
          </div>
          <div className="text-[#8e8e93] text-[15px] font-montserrat font-bold leading-[26px] mb-4">
            Record audio, upload audio, or use a YouTube URL
          </div>
        </div>

        <div className="relative">
          <div
            className={`transition-opacity duration-400 ${showForm ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div
              className="bg-white rounded-[32px] w-[344px] h-[117px] flex items-center p-4 mb-4 cursor-pointer"
              onClick={() => {
                const isMobile = window.innerWidth <= 450;
                if (isMobile) {
                  setIsMobileFormOpen(true);
                } else {
                  setShowForm(true);
                }
              }}
            >
              <div
                className="w-[73px] h-[72px] bg-cover bg-center bg-no-repeat mr-4"
                style={{
                  backgroundImage: `url(https://assets.api.uizard.io/api/cdn/stream/21dd2cdf-057f-4908-91f6-3ace53f43e3b.png)`
                }}
              />
              <div className="text-[#030303] text-[20px] font-montserrat font-bold leading-[29px]">
                YouTube video
              </div>
            </div>
          </div>

          <div
            className={`transition-opacity duration-400 absolute top-0 left-0 w-full ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <VideoUrlForm onSubmit={handleSubmit} initialUrl={videoUrl} onCancel={handleCancel} />
          </div>
        </div>

        <div className="home-layout">
          <Only if={!!videoId}>
            <div className="home-video-section">
              <YouTubeVideoCard videoId={videoId!} />
            </div>
          </Only>
          <div className="home-takeaways-section">
            <VideoTakewaysList
              topics={data.topics}
              onRemoveHighlight={removeHighlight}
            />
          </div>
        </div>
      </div>
    </div>
  )
}