import React, {useState, useEffect} from "react";
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { auth, getUsername} from './components/firebaseStuff';
import { Feed } from './pages/feed';
import { Profile } from './pages/profile';
import {LoginModal} from './components/loginModal';
import {onAuthStateChanged } from 'firebase/auth';

function App() {
  const [userState, setUserState] = useState({logged: false, username: ""});
  const [imgs, setImgs] = useState([]);
  const [loginModal, setLoginModal] = useState({color: "", message: "", visible: "hidden"});
  const [userPic, setUserPic] = useState("");
  const [init, setInit] = useState(true);
  


  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
      if(user.displayName && (init || !userState.logged)){
        getUsername(user.email)
          .then(({username, pic}) => {
            setUserState({logged: true, username: user.displayName});
            setUserPic(pic);
            setInit(false);
          })
          .catch((error) => { console.log(error) });
      }else if(init || !userState.logged){
        getUsername(user.email)
          .then(({username, pic}) => {
              setUserState({logged: true, username: username});
              setUserPic(pic);
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
          <Route path="/" element={<LoginPage setUserPic={setUserPic} setUserState={setUserState} userInfo={userState} setLoginModal={setLoginModal} setInit={setInit} logged={userState.logged} user={userState.user}/>}/>
          <Route path="/feed" element={<Feed userPic={userPic}  setImgs={setImgs} imgs={imgs} init={init} setInit={setInit} logged={userState.logged} username={userState.username}/>}/>
          <Route path="/redirect" element={userState.logged ? <Navigate to="/feed" replace /> : <Navigate to="/" replace/>}/>
          <Route path="/profile" element={<Profile setLoginModal={setLoginModal}  userPic={userPic} setUserPic={setUserPic} init={init} user={userState}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
