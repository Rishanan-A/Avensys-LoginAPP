
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Components/Welcome/Welcome';
import Login from './Components/Login/Login';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Restricted from './Components/Restricted/Restricted';
import './App.css';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restricted" element={<Restricted />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;