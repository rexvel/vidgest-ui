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

  const { highlights, key_insights } = data;


  if ( !highlights || !key_insights) {
    return <div className="text-center p-4"></div>;
  }

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTakewaysList;