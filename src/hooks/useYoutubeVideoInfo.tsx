import { useState, useEffect } from 'react';
import { YouTubeApiClient } from '@/youtube-api';

interface ExtendedVideoInfo {
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
}

let apiClientInstance: YouTubeApiClient | null = null;

const getApiClient = () => {
  if (!apiClientInstance) {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
    if (!API_KEY) {
      throw new Error('YouTube API key is not set in environment variables');
    }
    apiClientInstance = new YouTubeApiClient(API_KEY);
  }
  return apiClientInstance;
};

console.log(import.meta.env)

export const useYouTubeVideoInfo = (videoId: string) => {
  if (!videoId) {
    return { videoInfo: null, loading: false, error: null };
  }
  const [videoInfo, setVideoInfo] = useState<ExtendedVideoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiClient = getApiClient();
        const info = await apiClient.getVideoInfo(videoId);

        console.log(`info`, info);

        
        const extendedInfo: ExtendedVideoInfo = {
          ...info,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        };
        
        setVideoInfo(extendedInfo);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [videoId]);

  return { videoInfo, loading, error };
};