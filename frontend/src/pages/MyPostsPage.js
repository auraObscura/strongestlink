import PostList from "../components/PostList"
import PostForm from "../components/PostForm"

function MyPostsPage() {
  return (
    <div>
      <h1>My Strongest Posts</h1>
      <PostForm />
      <PostList />
    </div>
  )
}

export default MyPostsPage