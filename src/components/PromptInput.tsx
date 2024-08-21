import React, { useCallback, useState, useEffect } from 'react';
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
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
        <div className="max-w-2xl mx-auto p-4 bg-[#f8f9fa] rounded-lg">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <form onSubmit={handleSubmit} className="flex-grow">
                    <Textarea
                        value={url}
                        onChange={handleChange}
                        placeholder="Paste video link"
                        className="custom-textarea bg-[#f8f9fa] w-full"
                    />
                </form>
                <Button
                    variant="secondary"
                    type="submit"
                    className="w-full sm:w-auto p-2"
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