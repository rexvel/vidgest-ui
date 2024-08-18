import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Subtopic {
  description: string;
}

interface Topic {
  topic: string;
  subtopics: Subtopic[];
}

interface VideoTakewaysListProps {
  data: {
    topics: Topic[];
  };
}

const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.topics.map((topic, index) => (
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