import { useState, useCallback } from 'react';
import { YouTubeVideoCard, VideoUrlForm, VideoTakewaysList, Only, MobileFormPortal, YouTubeVideoButton } from '@/components';
import { useVideoData, useMobileForm, useYouTube } from '@/hooks';
import { MOBILE_BREAKPOINT, DEFAULT_SUMMARY_DESCRIPTION } from '@/constants';
import '@/App.css'

export function Home() {
  const { data, fetchAndSaveData, isLoading } = useVideoData();
  const { videoUrl, setVideoUrl, videoId } = useYouTube();
  const [showForm, setShowForm] = useState(false);
  const { isMobileFormOpen, setIsMobileFormOpen } = useMobileForm();

  const handleSubmit = useCallback(async (url: string) => {
    setVideoUrl(url);
    await fetchAndSaveData(url);
    setShowForm(false);
  }, [fetchAndSaveData, setVideoUrl]);

  const handleMobileFormSubmit = useCallback(async (url: string) => {
    setVideoUrl(url);
    await fetchAndSaveData(url);
    setIsMobileFormOpen(false);
  }, [fetchAndSaveData, setVideoUrl, setIsMobileFormOpen]);

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleYoutubeVideoClick = useCallback(() => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      setIsMobileFormOpen(true);
    } else {
      setShowForm(true);
    }
  }, [setIsMobileFormOpen]);

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
            <YouTubeVideoButton onClick={handleYoutubeVideoClick} />
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
          <VideoTakewaysList
            topics={data?.topics || []}
            summary={data?.summary || { description: DEFAULT_SUMMARY_DESCRIPTION }}
            isLoading={isLoading}
          />
        </div>
      </div>
      <MobileFormPortal
        isOpen={isMobileFormOpen}
        onClose={() => setIsMobileFormOpen(false)}
        onSubmit={handleMobileFormSubmit}
      />
    </div>
  );
}