
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './Components/Loading/Loading';
import Welcome from './Components/Welcome/Welcome';
import Login from './Components/Login/Login';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Restricted from './Components/Restricted/Restricted';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== '') {
      setIsLoading(false);
    }
  }, []);

  const isManager = localStorage.getItem('role')?.toLowerCase() === 'manager';

  return (
    <div className="App">
      {isLoading ? (
        <Loading /> 
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          {isManager ? (
          <Route path="/restricted" element={<Restricted />} />
          ) : null}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;