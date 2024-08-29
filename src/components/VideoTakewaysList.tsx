import React from 'react';
import { Topic } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

interface VideoTakewaysListProps {
  topics: Topic[] | null;
  onRemoveHighlight: (topicId: string, highlightId: string) => void;
}

export const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ topics, onRemoveHighlight }) => {
  if (!topics || topics.length === 0) {
    return <p>No takeaways available.</p>;
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Card key={topic.id} className="relative">
          <CardHeader>
            <CardTitle>{topic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {topic.highlights.map((highlight) => (
                <li key={highlight.id} className="relative group">
                  {highlight.text}
                  <button
                    onClick={() => onRemoveHighlight(topic.id, highlight.id)}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-opacity"
                    aria-label="Remove highlight"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
