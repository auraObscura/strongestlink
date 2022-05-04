import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllPostsPage from './pages/AllPostsPage';
import PostPage from './pages/PostPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';

import Map from './pages/Map/Map'
import { ChakraProvider, theme } from '@chakra-ui/react'
import MyPostsPage from './pages/MyPostsPage';

function App() {

  // probably better to set an auth context which I'll probably do, but just to get some conditional rendering on the minimal demo UI I have up to prove working auth decided to go with a state value
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("user"));
    if (foundUser) {
      console.log("founduser: ", foundUser)
      const userId = foundUser.pk
      // const username = foundUser.username
      const user = foundUser
      setUser(user)
      console.log("user", user)
      console.log("user id:", userId)
    }
  }, [isLoggedIn])

  // HashRouter has been elevated to index.js, I find it works better like that if your routing structure gets complicated
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>}>
          <Route path="register" element={<RegisterForm />}/>
          <Route path="login" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>}/>
        
        </Route>
        <Route exact path = "/my-posts" element = {<MyPostsPage user={user}/> }/>
        <Route exact path = "/posts" element = {<AllPostsPage/> }/>
        <Route path="/map" element={  <ChakraProvider theme={theme}><Map /></ChakraProvider>}/>
        <Route exact path = "/posts/:postID" element = {<PostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;