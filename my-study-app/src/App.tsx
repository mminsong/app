import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import TodoPage from './pages/TodoList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/todo" element={<TodoPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
