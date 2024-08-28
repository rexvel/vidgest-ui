import React, { useCallback, useState, useEffect } from 'react';
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { Loader2 as Loader } from "lucide-react";

interface VideoUrlFormProps {
    onSubmit: (url: string) => void;
    initialUrl: string;
    onCancel: () => void;
}

export const VideoUrlForm: React.FC<VideoUrlFormProps> = ({ onSubmit, initialUrl, onCancel }) => {
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
        <div className="form-container transition-opacity duration-400">
            <div className="form-layout flex items-center space-x-2">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="relative overflow-hidden no-underline duration-150 ease-in rounded-xl text-sm font-extrabold px-4 py-3 bg-grey font-bold h-[52px]"
                >
                    Cancel
                </Button>
                <form onSubmit={handleSubmit} className="flex-grow">
                    <Textarea
                        value={url}
                        onChange={handleChange}
                        placeholder="Paste video link"
                        className="w-full h-[52px] bg-white rounded-[22px] border border-[#c0bfa5] px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
                <Button
                    variant="secondary"
                    type="submit"
                    className="cursor-pointer w-[130px] h-[52px] px-2 border-0 rounded-[22px] bg-[#d1d1d6] text-white text-[14px] font-montserrat font-extrabold leading-[20px] outline-none"
                    disabled={!url.trim() || isSending}
                    onClick={() => onSubmit(url)}
                >
                    {isSending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        'Create note'
                    )}
                </Button>
            </div>
        </div>
    );
};
