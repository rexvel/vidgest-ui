import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from '@/router/AppRouter';
import { MobileFormProvider } from '@/hooks/useMobileForm';
import { ErrorBoundary, Header, Sidebar } from '@/components';
import '@/App.css'

function AppContent() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="container mx-auto flex flex-col md:flex-row max-w-[1400px] px-4 xl:px-6">
          <Sidebar />
          <main className="flex-1 md:pl-8 pt-8">
            <AppRouter />
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <MobileFormProvider>
          <AppContent />
        </MobileFormProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;