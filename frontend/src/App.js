
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';

function App() {
  const [page, setPage] = useState("login")

  const choosePage = () => {
    if (page === 'login') {
      return <Login setPage={setPage} />
    }
    if (page === 'register') {
      return <Register setPage={setPage} />
    }
    if (page === 'forget_password') {
      return <ForgetPassword setPage={setPage} />
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="z-20 px-12 py-12 bg-white shadow-xl rounded-2xl">
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <ForgetPassword /> */}
        {choosePage()}
      </div>
    </div>
  );
}

export default App;
