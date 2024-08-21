import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center p-8 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops, something went wrong :(</h1>
                        <p className="text-gray-600">We're sorry for the inconvenience.</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;