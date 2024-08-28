import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card";

interface Step {
  step_number: number;
  description: string;
}

interface VideoData {
  video: {
    title: string;
    description: string;
  };
  steps: Step[];
  key_insights: string[];
}

interface VideoTakeawaysListProps {
  data: VideoData | null | undefined;
}



interface VideoContent {
  introduction: string;
  purpose: string;
  definition: string;
  personal_experience: string;
  benefits: string;
  routine: string;
  conclusion: string;
  fundraiser: string;
}

interface VideoContentDisplayProps {
  content: VideoContent;
}

const VideoContentDisplay: React.FC<VideoContentDisplayProps> = ({ content }) => {
  return (
    <div className="content-container">
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="content-item">
          <h3 className="content-title">{key.replace(/_/g, ' ')}</h3>
          <p className="content-value">{value}</p>
        </div>
      ))}
    </div>
  );
};


export const VideoTakeawaysList: React.FC<VideoTakeawaysListProps> = ({ data }) => {
  if (!data) {
    return <div className="no-data-message"></div>;
  }

  const { steps } = data;

  if (!steps) {
    return <div className="no-data-message"></div>;
  }

  const outputObject = {
    content: {
        introduction: data.introduction,
        purpose: data.purpose,
        definition: data.definition,
        personal_experience: data.personal_experience,
        benefits: data.benefits,
        routine: data.routine,
        conclusion: data.conclusion,
        fundraiser: data.fundraiser,
    },
};

  return (
    <div className="takeaways-container">
      <Card>
        <CardHeader>
          <CardTitle className="takeaways-title"></CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="steps-list">
            {steps.map((step, index) => (
              <li key={index}>{step.description}</li>
            ))}
          </ul>

          <VideoContentDisplay content={outputObject.content} />
        </CardContent>
      </Card>
    </div>
  );
};
