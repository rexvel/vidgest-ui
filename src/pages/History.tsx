import React, { useCallback, useEffect, useState } from 'react';
import { useProfileData } from '@/hooks/useProfileData';
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";

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

export const HistoryPage: React.FC = () => {
  const { getAllItems, removeItem, isReady } = useProfileData<VideoData>({ dbName: 'mindtree', storeName: 'videos' });
  const [historyItems, setHistoryItems] = useState<VideoData[]>([]);

  const fetchHistoryItems = useCallback(async () => {
    if (isReady) {
      try {
        const items = await getAllItems();
        setHistoryItems(items);
      } catch (error) {
        console.error('Error fetching history items:', error);
      }
    }
  }, [isReady, getAllItems]);

  useEffect(() => {
    fetchHistoryItems();
  }, [isReady, getAllItems, fetchHistoryItems]);

  const handleRemove = async (id: string) => {
    if (id) {
      try {
        Promise.all([
          removeItem(id),
          fetchHistoryItems()
        ]);
      } catch (error) {
        console.error('Error removing history item:', error);
      }
    }
  };

  return (
    <div className="history-container space-y-4">
      {historyItems && historyItems.map((item) => (
        <Card key={item?.id} className="history-item relative">
          <CardHeader>
            <CardTitle>{item?.video?.title}</CardTitle>
            <Button
              onClick={() => item?.id && handleRemove(item.id)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
              variant="ghost"
              size="sm"
            >
              ×
            </Button>
          </CardHeader>
          <CardContent>
            <div className="highlights">
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc pl-5 space-y-1">
                {item.highlights && item.highlights.map((highlight, index) => (
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
