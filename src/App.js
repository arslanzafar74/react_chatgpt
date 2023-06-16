import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import AuthRoutes from './components/AuthRoutes'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={
          <AuthRoutes >
            <Home />
          </AuthRoutes>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



















































































































































