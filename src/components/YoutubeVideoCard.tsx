import React from 'react';
import { useYouTubeVideoInfo } from '@/hooks/useYoutubeVideoInfo';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Skeleton } from '@/components/Skeleton';

interface YouTubeVideoCardProps {
  videoId: string;
}

const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({ videoId }) => {
  const { videoInfo, loading, error } = useYouTubeVideoInfo(videoId);

  if (loading) {
    return (
      <Card className="video-card">
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-4 w-[200px] mt-4" />
          <Skeleton className="h-4 w-[150px] mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="video-card">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load video information: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!videoInfo) {
    return (
      <Card className="video-card">
        <CardHeader>
          <CardTitle>No Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No video information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="video-card">
      <CardHeader>
        <CardTitle className="video-card-title">{videoInfo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <a href={videoInfo.videoUrl} target="_blank" rel="noopener noreferrer">
          <img src={videoInfo.thumbnailUrl} alt={videoInfo.title} className="video-thumbnail" />
        </a>
        <p className="video-card-content">Posted on: {videoInfo.datePosted}</p>
        <p className="video-card-content">Author: {videoInfo.authorName}</p>
      </CardContent>
    </Card>
  );
};

export default YouTubeVideoCard;