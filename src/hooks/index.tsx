import { useState, useCallback } from 'react';

interface MindTreeData {
  // Define the structure of your mind tree data here
  // For example:
  nodes: Array<{ id: string; label: string }>;
  edges: Array<{ source: string; target: string }>;
}

interface MindTreeState {
  data: MindTreeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: MindTreeState = {
  data: null,
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

  const setData = useCallback((data: MindTreeData) => {
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
      const jsonData: MindTreeData = await res.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }, [setLoading, setError, setData]);

  return { ...state, fetchData };
};

export default useMindTreeData;