import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { Header } from './components/header';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
