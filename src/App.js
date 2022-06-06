import React, {useState} from "react";
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import {userLogged} from './components/firebaseStuff';
import { Header } from './components/header';
import { Feed } from './pages/feed';

function App() {

  const [userState, setUserState] = useState({logged: userLogged(), user: ""});

  return (
    <div className="App">
      <Router>
        <Header logged={userState.logged} user={userState.user}/>
        <Routes>
          <Route path="/" element={<LoginPage setUserState={setUserState} userInfo={userState}/>}/>
          <Route path="/feed" element={<Feed />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
