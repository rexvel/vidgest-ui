import React from 'react';

interface Subtopic {
  description: string;
}

interface Topic {
  topic: string;
  subtopics: Subtopic[];
}

interface TopicSubtopicDisplayProps {
  data: {
    topics: Topic[];
  };
}

const VideoTakewaysList: React.FC<TopicSubtopicDisplayProps> = ({ data }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {data.topics.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px',
              margin: '0',
              borderBottom: '1px solid #ccc',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px'
            }}
          >
            {item.topic}
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '30px', margin: '10px 0' }}>
            {item.subtopics.map((subtopic, subIndex) => (
              <li key={subIndex} style={{ margin: '5px 0' }}>{subtopic.description}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VideoTakewaysList;