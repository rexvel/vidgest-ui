import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card";

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

export const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ data }) => {
  if (!data) {
    return <div className="no-data-message">No data available</div>;
  }

  const { highlights, key_insights } = data;

  if (!highlights || !key_insights) {
    return <div className="no-data-message"></div>;
  }

  return (
    <div className="takeaways-container">
      <Card>
        <CardHeader>
          <CardTitle className="takeaways-title">Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="highlights-list">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
