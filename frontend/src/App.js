import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AllPostsPage from "./pages/AllPostsPage";
import PostPage from "./pages/PostPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserProfilePage from "./pages/UserProfilePage";
import Header from "./components/Header";
import Map from "./pages/Map/Map";
import Leaderboard from "./pages/Leaderboard/LeaderboardPage";
import MyPostsPage from "./pages/MyPostsPage";
import WorkoutPage from "./pages/WorkoutPage";
import LocationPage from "./pages/LocationPage";
import GymPage from "./pages/GymPage";
import Footer from "./components/Footer";

function App() {
  // probably better to set an auth context which I'll probably do, but just to get some conditional rendering on the minimal demo UI I have up to prove working auth decided to go with a state value
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("user"));
    if (foundUser) {
      console.log("founduser: ", foundUser);
      const userId = foundUser.pk;
      const user = foundUser;
      setUser(user);
      console.log("user", user);
      console.log("user id:", userId);
    }
  }, [isLoggedIn]);

  // HashRouter has been elevated to index.js, I find it works better like that if your routing structure gets complicated
  return (
    <div className={`App ${theme}`}>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}
        setTheme={setTheme}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LandingPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route exact path="register" element={<RegisterForm />} />
        <Route
          exact
          path="login"
          element={
            <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          }
        />
        <Route exact path="/my-profile" element={<MyPostsPage user={user} />} />
        <Route exact path="/posts" element={<AllPostsPage user={user} />} />
        <Route exact path="/posts/:postID" element={<PostPage user={user} />} />
        <Route exact path="/map" element={<Map user={user} />} />
        <Route
          exact
          path="map/location/:locationID"
          element={<LocationPage user={user} />}
        />
        <Route
          exact
          path="/user/:userID"
          element={<UserProfilePage user={user} />}
        />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/workouts" element={<WorkoutPage />} />
        <Route exact path="/mygym" element={<GymPage user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
