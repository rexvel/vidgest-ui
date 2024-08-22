import React, { useEffect, useState } from 'react';
import { useProfileData } from '@/hooks/useProfileData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

interface VideoData {
  id?: string;
  video: {
    title: string;
    description: string;
    videoId: string;
  };
  highlights: string[];
  key_insights: string[];
}

const HistoryPage: React.FC = () => {
  const { getAllItems, isReady } = useProfileData<VideoData>({ dbName: 'mindtree', storeName: 'videos' });
  const [historyItems, setHistoryItems] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchHistoryItems = async () => {
      if (isReady) {
        try {
          const items = await getAllItems();
          setHistoryItems(items);
        } catch (error) {
          console.error('Error fetching history items:', error);
        }
      }
    };

    fetchHistoryItems();
  }, [isReady, getAllItems]);

  return (
    <div className="history-container">
      {historyItems.map((item) => (
        <Card key={item?.id} className="history-item">
          <CardHeader>
            <CardTitle>{item?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <YouTubeVideoCard videoId={item.video.videoId} /> */}
            <div className="highlights">
              <h3>Highlights</h3>
              <ul>
                {item.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HistoryPage;