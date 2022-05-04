import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllPostsPage from './pages/AllPostsPage';
import PostPage from './pages/PostPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserProfilePage from './pages/UserProfilePage';

function App() {

  // probably better to set an auth context which I'll probably do, but just to get some conditional rendering on the minimal demo UI I have up to prove working auth decided to go with a state value
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("user"));
    if (foundUser) {
      console.log("founduser username: ", foundUser.username)
      const username = foundUser.username
      setUser(username)
      console.log("user", user)
    }
  }, [])

  // HashRouter has been elevated to index.js, I find it works better like that if your routing structure gets complicated
  return (
    <div className="App">
      <h1>Welcome to Strongest Link</h1>
      <hr />
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>}>
        <Route path="register" element={<RegisterForm />}/>
        <Route path="login" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>}/>
        </Route>
        <Route exact path = "/posts" element = {<AllPostsPage/> }/>
        <Route exact path = "/posts/:postID" element = {<PostPage/>}/>
        <Route exact path = "/user/:userID" element = {<UserProfilePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
