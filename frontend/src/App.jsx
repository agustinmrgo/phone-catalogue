import ErrorBoundary from './components/ErrorBoundary';
import PhoneList from './components/PhoneList';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <PhoneList />
      </div>
    </ErrorBoundary>
  );
}

export default App;