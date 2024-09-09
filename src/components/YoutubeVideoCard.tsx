import React from 'react';
import { useYouTubeVideoInfo } from '@/hooks/useYoutubeVideoInfo';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';

interface YouTubeVideoCardProps {
  videoId: string | null;
}

const Only: React.FC<{ if: boolean; children: React.ReactNode }> = ({ if: condition, children }) => {
  return condition ? <>{children}</> : null;
};

export const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({ videoId }) => {
  const { videoInfo, loading, error } = useYouTubeVideoInfo(videoId);
  const formatDuration = (duration?: string): string => {
    if (!duration) return '';
    
    const [, hours, minutes, seconds] = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) || [];
    
    return [hours, minutes, seconds]
      .filter(Boolean)
      .map(unit => unit.padStart(2, '0'))
      .join(':');
  };
  
  return (
    <Card className="video-card">
      <Only if={loading}>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-4 w-[200px] mt-4" />
          <Skeleton className="h-4 w-[150px] mt-2" />
        </CardContent>
      </Only>

      <Only if={!!error}>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load video information: {error?.message}</p>
        </CardContent>
      </Only>

      <Only if={!loading && !error && !videoInfo}>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No video information available</p>
        </CardContent>
      </Only>

      <Only if={!loading && !error && !!videoInfo}>
        <CardHeader>
          <CardTitle className="video-card-title">{videoInfo?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <a href={videoInfo?.videoUrl} target="_blank" rel="noopener noreferrer">
            <img src={videoInfo?.thumbnailUrl} alt={videoInfo?.title} className="video-thumbnail" />
          </a>
          <p className="video-card-content">Duration: {formatDuration(videoInfo?.duration)}</p>
        </CardContent>
      </Only>
    </Card>
  );
};

