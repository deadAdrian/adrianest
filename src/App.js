import React, {useState} from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import {userLogged} from './components/firebaseStuff';
import { Header } from './components/header';


function App() {

  const [userState, setUserState] = useState({logged: userLogged(), user: ""});

  return (
    <div className="App">
      <Router>
        <Header logged={userState.logged} user={userState.user}/>
        <Routes>
          <Route path="/" element={<LoginPage setUserState={setUserState} userInfo={userState}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
