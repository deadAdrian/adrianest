import React, {useState, useEffect} from "react";
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { auth, getUsername} from './components/firebaseStuff';
import { Feed } from './pages/feed';
import {LoginModal} from './components/loginModal';
import {onAuthStateChanged } from 'firebase/auth';

function App() {
  const [userState, setUserState] = useState({logged: false, user: ""});
  const [imgs, setImgs] = useState([]);
  const [loginModal, setLoginModal] = useState({color: "", message: "", visible: "hidden"});
  const [init, setInit] = useState(true);


  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
      if(user.displayName && (init || !userState.logged)){
        setUserState({user: user.displayName, logged: true});
        setInit(false);
      }else if(init || !userState.logged){
        getUsername(user.email)
          .then((username) => {
              setUserState({user: username, logged: true});
              setInit(false);
          })
          .catch((error) => { console.log(error) });
      }
    } else {
    // User is signed out
    // ...
    }
});

  

  return (
    <div className="App">
      
      <Router>
        <LoginModal info={loginModal}/>
        
        <Routes>
          <Route path="/" element={<LoginPage setUserState={setUserState} userInfo={userState} setLoginModal={setLoginModal} setInit={setInit} logged={userState.logged} user={userState.user}/>}/>
          <Route path="/feed" element={<Feed setImgs={setImgs} imgs={imgs} init={init} setInit={setInit} logged={userState.logged} user={userState.user}/>}/>
          <Route path="/redirect" element={userState.logged ? <Navigate to="/feed" replace /> : <Navigate to="/" replace/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
