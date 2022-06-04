import React, {useState} from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { Header } from './components/header';


function App() {

  const [userState, setUserState] = useState({logged: false, user: ""});

  return (
    <div className="App">
      <Router>
        <Header logged={userState.logged} user={userState.user}/>
        <Routes>
          <Route path="/" element={<LoginPage setUserState={setUserState}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
