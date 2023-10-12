
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="z-20 px-12 py-12 bg-white shadow-xl rounded-2xl">
        <Login />
      </div>
    </div>
  );
}

export default App;
