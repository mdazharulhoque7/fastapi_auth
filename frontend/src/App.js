
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import Home from './components/Home';

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState();

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    setToken(auth_token);
  }, [token]);


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

  const renderedPage = () => {
    if (token == null) {
      return (<div className="flex items-center justify-center min-h-screen bg-gray-400">
        <div className="z-20 px-12 py-12 bg-white shadow-xl rounded-2xl">
          {/* <Register /> */}
          {/* <Login /> */}
          {/* <ForgetPassword /> */}
          {choosePage()}
        </div>
      </div>)
    } else {
      return <Home />
    }
  }
  return (

    <>{renderedPage()}</>
  );
}

export default App;
