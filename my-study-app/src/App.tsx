import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TodoPage from './pages/TodoList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<TodoPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
