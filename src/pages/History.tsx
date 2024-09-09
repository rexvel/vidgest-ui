import React, { useCallback, useEffect, useState } from 'react';
import { useProfileData } from '@/hooks/useProfileData';
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Topic {
  title: string;
  points: string[];
}

interface Summary {
  description: string;
  'bullet-points': string[];
}

interface VideoData {
  id: number;
  topics: Topic[];
  summary: Summary;
  userId: string;
}

interface ExpandedState {
  [key: number]: boolean;
}

export const HistoryPage: React.FC = () => {
  const { getAllItems, removeItem, isReady } = useProfileData<VideoData>({ dbName: 'mindtree', storeName: 'videos' });
  const [historyItems, setHistoryItems] = useState<VideoData[]>([]);
  const [expandedSummaries, setExpandedSummaries] = useState<ExpandedState>({});

  console.log('historyItems', historyItems);

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

  const toggleSummary = (id: number) => {
    setExpandedSummaries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="history-container space-y-4">
      {historyItems && historyItems.map((item: VideoData) => (
        <Card key={item.id} className="history-item relative">
          <CardHeader>
            <CardTitle>{item.topics[0].title}</CardTitle>
            <Button
              onClick={() => handleRemove(item.id.toString())}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
              variant="ghost"
              size="sm"
            >
              ×
            </Button>
          </CardHeader>
          <CardContent>
            <div className="topics mb-4">
              <h3 className="font-semibold mb-2">Topics</h3>
              {item.topics.map((topic, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-medium">{topic.title}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {topic.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="summary">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Summary</h3>
                <Button
                  onClick={() => toggleSummary(item.id)}
                  variant="ghost"
                  size="sm"
                  className="p-1"
                >
                  {expandedSummaries[item.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
              </div>
              {expandedSummaries[item.id] && (
                <>
                  <p className="mb-2">{item.summary.description}</p>
                  <h4 className="font-medium mb-1">Key Points:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.summary['bullet-points'].map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
