import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary, Header, Sidebar} from '@/components';
import { AppRouter } from '@/router/AppRouter';
import '@/App.css'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <div className="flex-grow">
            <div className="container mx-auto flex max-w-[1400px] px-4 xl:px-6">
              <Sidebar />
              <main className="flex-1 pl-8 pt-8">
                <AppRouter />
              </main>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App