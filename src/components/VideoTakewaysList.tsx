import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface Subtopic {
  description: string;
}

export interface Topic {
  topic: string;
  subtopics: Subtopic[];
}

interface VideoTakewaysListProps {
  data: {
    topics: Topic[] | null;
  }
}

const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ data }) => {


  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-6">
      {data.topics!.map((topic, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{topic.topic}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              {topic.subtopics.map((subtopic, subIndex) => (
                <li key={subIndex}>
                  {subtopic.description}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoTakewaysList;