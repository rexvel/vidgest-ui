import React, { useCallback, useState, useEffect } from 'react';
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { Loader2 as Loader } from "lucide-react";

interface VideoUrlFormProps {
    onSubmit: (url: string) => void;
    initialUrl: string;
}

const VideoUrlForm: React.FC<VideoUrlFormProps> = ({ onSubmit, initialUrl }) => {
    const [isSending, setIsSending] = useState(false);
    const [url, setUrl] = useState(initialUrl);

    useEffect(() => {
        setUrl(initialUrl);
    }, [initialUrl]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        onSubmit(url);
        setIsSending(false);
    }, [url, onSubmit]);

    return (
        <div className="form-container">
            <div className="form-layout">
                <form onSubmit={handleSubmit} className="flex-grow">
                    <Textarea
                        value={url}
                        onChange={handleChange}
                        placeholder="Paste video link"
                        className="custom-textarea"
                    />
                </form>
                <Button
                    variant="secondary"
                    type="submit"
                    className="submit-button"
                    disabled={!url.trim() || isSending}
                    onClick={() => onSubmit(url)}
                >
                    {isSending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        'Summarize video'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default VideoUrlForm;