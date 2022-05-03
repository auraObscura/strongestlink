import './App.css';
import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  // probably better to set an auth context which I'll probably do, but just to get some conditional rendering on the minimal demo UI I have up to prove working auth decided to go with a state value
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // HashRouter has been elevated to index.js, I find it works better like that if your routing structure gets complicated
  return (
    <div className="App">
      <h1>Welcome to Strongest Link</h1>
      <hr />
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
          <Route path="register" element={<RegisterForm />}/>
          <Route path="login" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
