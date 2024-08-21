import { Topic } from '@/components/VideoTakewaysList';
import { useState, useCallback } from 'react';

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

const useMindTreeData = () => {
  const [state, setState] = useState<MindTreeState>(initialState);

  const setLoading = useCallback((loading: boolean) => {
    setState(prevState => ({ ...prevState, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prevState => ({ ...prevState, error, loading: false }));
  }, []);

  const setData = useCallback((data: Topic[]) => {
    setState(prevState => ({ ...prevState, data, loading: false, error: null }));
  }, []);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch("/generate-mind-tree", {
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

  return { ...state, fetchData };
};

export default useMindTreeData;