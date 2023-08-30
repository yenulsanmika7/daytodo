import React, { useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Authorization/Registration'
import Home from './Pages/Home'

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('access_token') == false) {
      setIsAuth(true);
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth === false ? <Login /> : <Navigate to="/" />} />           
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
