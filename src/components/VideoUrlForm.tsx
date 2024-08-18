import React, { useCallback, useState } from 'react';
import { Input, Label, Button } from '../ui';

interface VideoUrlFormProps {
  onSubmit: (url: string) => void;
}

const VideoUrlForm: React.FC<VideoUrlFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(url);
  }, [url, onSubmit]);

  return (
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
  );
};

export default VideoUrlForm;