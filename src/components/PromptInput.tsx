import { useCallback, useState } from 'react';
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { Loader2 as Loader } from "lucide-react";

interface VideoUrlFormProps {
    onSubmit: (url: string) => void;
}

const MessageInput: React.FC<VideoUrlFormProps> = ({ onSubmit }) => {
    const [isSending, setIsSending] = useState(false);

    const [url, setUrl] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        debugger;
        e.preventDefault();
        onSubmit(url);
    }, [url, onSubmit]);


    console.log(url);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-[#f8f9fa] rounded-lg">
            <div className="flex flex-start flex-col space-x-2">
                <form onSubmit={handleSubmit} className="flex-grow">
                    <Textarea
                        value={url}
                        onChange={handleChange}
                        placeholder="Paste video link"
                        className="custom-textarea bg-[#f8f9fa]" />
                </form>
                <Button
                    variant="secondary"
                    type="submit"
                    className=" min-w-fit self-start p-2 m-4"
                    disabled={!url.trim() || isSending}
                    onClick={handleSubmit}
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

export default MessageInput;