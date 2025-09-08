import type { FC } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PhoneList from './components/PhoneList';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <PhoneList />
      </div>
    </ErrorBoundary>
  );
};

export default App;
