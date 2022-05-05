import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import StrongestLinkApi from "../api/StrongestLinkApi";

function MyPostsPage(props) {
  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    console.log("USER in my posts: ", props.user);
    loadMyPosts();
  }, []);

  const loadMyPosts = async () => {
    const response = await StrongestLinkApi.getAllPosts();
    console.log("response: ", response);

    if (response) {
      const filteredData = response.filter(
        (post) => post.user.id === props.user.pk
      );
      console.log("filtered data: ", filteredData);
      setMyPosts(filteredData);
    }
  };

  return (
    <section>
      <h1>My Posts</h1>
      {myPosts && <PostList posts={myPosts} />}
    </section>
  );
}

export default MyPostsPage;
