import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/card";

interface VideoData {
  video: {
    title: string;
    description: string;
  };
  highlights: string[];
  key_insights: string[];
}

interface VideoTakewaysListProps {
  data: VideoData | null | undefined;
}

const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ data }) => {
  if (!data) {
    return <div className="text-center p-4">No data available</div>;
  }

  const { video, highlights, key_insights } = data;

  if (!video || !highlights || !key_insights) {
    return <div className="text-center p-4">Incomplete data structure</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{video.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {key_insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTakewaysList;