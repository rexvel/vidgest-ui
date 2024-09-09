import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card"
import { Loader2 as Loader } from "lucide-react";

export interface Topic {
  title: string;
  points: string[];
}

interface Summary {
  description: string;
  'bullet-points': string[];
}

interface VideoTakewaysListProps {
  topics: Topic[];
  summary: Summary;
  isLoading: boolean;
}

export const VideoTakewaysList: React.FC<VideoTakewaysListProps> = ({ topics, summary, isLoading }) => {
  if (isLoading) {
    return (
      <div className="home-takeaways-section flex justify-center items-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!topics || topics.length === 0) {
    return null;
  }

  console.log({topics, summary})

  return (
    <div className="home-takeaways-section">
    <Card className="w-full">
      <CardHeader className='flex flex-col items-start'>
        <CardTitle className='flex flex-start'>Video Takeaways</CardTitle>
        <CardDescription>Key points and summary from the video</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {topic.points.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="mb-2">{summary.description}</p>
            <ul className="list-disc pl-5 space-y-1">
              {summary['bullet-points'].map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      </Card>
  </div>
  );
};