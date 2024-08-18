import React, { useCallback, useState } from 'react'
import { Input, Label, Button } from './ui';
import VideoTakewaysList from './components/VideoTakewaysList';
import useMindTreeData from './hooks'
import './App.css'


function App() {
  const [url, setUrl] = useState('');
  const { data, loading, error, fetchData } = useMindTreeData();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(url);
  }, [url, fetchData]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <Label htmlFor="message">Youtube link</Label>
        <Input
          placeholder="Paste video URL"
          id="message"
          value={url}
          onChange={handleChange}
          className="mb-2"
        />
        <Button variant="outline" type="submit">Generate summary</Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <VideoTakewaysList data={data as unknown} />}
    </div>
  )
}

export default App