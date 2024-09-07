import { useState, useCallback } from 'react';
import { YOUTUBE_VIDEO_ID_LENGTH } from '@/constants';

export function useYouTube() {
  const [videoUrl, setVideoUrl] = useState('');

  const extractVideoId = useCallback((url: string): string | null => {
    const youtubeUrlPattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(youtubeUrlPattern);
    const videoIdMatchGroup = 2;

    return (match && match[videoIdMatchGroup].length === YOUTUBE_VIDEO_ID_LENGTH)
      ? match[videoIdMatchGroup]
      : null;
  }, []);

  const videoId = extractVideoId(videoUrl);

  return { videoUrl, setVideoUrl, videoId };
}