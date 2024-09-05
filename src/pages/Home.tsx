import { useState, useCallback } from 'react';
import { YouTubeVideoCard, VideoUrlForm, VideoTakewaysList, Only, MobileFormPortal } from '@/components';
import { useVideoData, useMobileForm } from '@/hooks';
import '@/App.css'
import { StreamedSummary } from '@/components/StreamedSummary';

export function Home() {
  const { data, fetchAndSaveData } = useVideoData();
  const [videoUrl, setVideoUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { isMobileFormOpen, setIsMobileFormOpen } = useMobileForm();

  const handleSubmit = useCallback(async (url: string) => {
    setVideoUrl(url);
    await fetchAndSaveData(url);
    setShowForm(false);
  }, [fetchAndSaveData]);

  const handleMobileFormSubmit = useCallback(async (url: string) => {
    setVideoUrl(url);
    await fetchAndSaveData(url);
    setIsMobileFormOpen(false);
  }, [fetchAndSaveData, setIsMobileFormOpen]);

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, []);

  const extractVideoId = (url: string): string | null => {
    const youtubeUrlPattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(youtubeUrlPattern);
    
    const validVideoIdLength = 11;
    const videoIdMatchGroup = 2;

    const isValidYoutubeId = match && match[videoIdMatchGroup].length === validVideoIdLength;

    if (isValidYoutubeId) {
      const videoId = match[videoIdMatchGroup];
      return videoId;
    }

    return null;
  };

  const handleYoutubeVideoClick = () => {
    const isMobile = window.innerWidth <= 450;
    if (isMobile) {
      setIsMobileFormOpen(true);
    } else {
      setShowForm(true);
    }
  }

  const videoId = extractVideoId(videoUrl);

  return (
      <>
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
              onClick={handleYoutubeVideoClick}
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
              topics={data?.topics?.topics || []}
              summary={data?.summary || { description: '', 'bullet-points': [] }}
            />
          </div>
        </div>
      <StreamedSummary />
      </div>
      <MobileFormPortal
        isOpen={isMobileFormOpen}
        onClose={() => setIsMobileFormOpen(false)}
        onSubmit={handleMobileFormSubmit}
      />
    </div>
      </>
  )
}