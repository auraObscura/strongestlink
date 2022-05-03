import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"

//pages
import AllPostsPage from './pages/AllPostsPage';
import PostPage from './pages/PostPage';

function App() {
  return (
   <HashRouter>
     <Routes>
      <Route exact path = "/posts" element = {<AllPostsPage/> }/>
      <Route exact path = "/posts/:postID" element = {<PostPage/>}/>
     </Routes>
   </HashRouter>
  );
}

export default App;
