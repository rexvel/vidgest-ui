import React, { useState, useEffect, useRef } from 'react';

export function StreamedSummary() {
  const [summary, setSummary] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const handleGenerateSummary = () => {
    setIsStreaming(true);
    setSummary('');

    const url = new URL('/generate-summary-notes-stream', window.location.origin);
    url.searchParams.append('url', 'https://youtu.be/3wrhq6Tz_lU?si=Xx4KOOzAhnjVoXFL');

    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      setSummary((prev) => prev + event.data);
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('EventSource failed:', error);
      setIsStreaming(false);
      eventSourceRef.current?.close();
    };

    eventSourceRef.current.onopen = () => {
      console.log('EventSource connected');
    };
  };

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return (
    <div className="streamed-summary">
      <button
        onClick={handleGenerateSummary}
        disabled={isStreaming}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Summary
      </button>
      <div className="mt-4 p-4 border rounded-lg min-h-[100px] whitespace-pre-wrap">
        {summary}
      </div>
    </div>
  );
}