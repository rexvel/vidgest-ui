import { BrowserRouter as Router } from 'react-router-dom';
import { MobileFormProvider } from '@/hooks/useMobileForm';
import { ErrorBoundary, AppRoot } from '@/components';
import '@/App.css'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <MobileFormProvider>
          <AppRoot />
        </MobileFormProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;