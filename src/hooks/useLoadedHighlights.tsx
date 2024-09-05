import { useState, useCallback } from 'react';
import { Topic } from '@/components/VideoTakewaysList';

interface MindTreeState {
  data: {
    topics: Topic[] | null;
  }
  loading: boolean;
  error: string | null;
}

const initialState: MindTreeState = {
  data: {
    topics: null,
  },
  loading: false,
  error: null,
};

export const useLoadedHighlights = () => {
  const [state, setState] = useState<MindTreeState>(initialState);

  const setLoading = useCallback((loading: boolean) => {
    setState(prevState => ({ ...prevState, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prevState => ({ ...prevState, error, loading: false }));
  }, []);

  const setData = useCallback((data: Topic[]) => {
    setState(prevState => ({ ...prevState, data: { topics: data }, loading: false, error: null }));
  }, []);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch("/generate-summary-notes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData: Topic[] = await res.json();
      setData(jsonData);
      return jsonData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }, [setLoading, setError, setData]);

  const removeHighlight = useCallback((topicId: string, highlightId: string) => {
    setState(prevState => {
      if (!prevState.data.topics) return prevState;

      const updatedTopics = prevState.data.topics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            highlights: topic.highlights.filter(highlight => highlight.id !== highlightId)
          };
        }
        return topic;
      }).filter(topic => topic.highlights.length > 0);

      return {
        ...prevState,
        data: { topics: updatedTopics }
      };
    });
  }, []);

  return { ...state, fetchData, removeHighlight };
};