import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
