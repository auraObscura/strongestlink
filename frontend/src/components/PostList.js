<<<<<<< HEAD
function PostList (props){

  return (
    <div className="newsfeed-container">
      {
      props.posts
      &&
      props.posts.map( 
        post =>
        <div className="post-container" key={`post#${post.id}`}>
          <a href={`#/posts/${post.id}`}><img src={post.image}></img></a>
          <div className="post-details-container">
            <h3>{post.caption}</h3>
            <p>{post.date}</p>
          </div>
        </div>
        )
      }
    </div>
  )
}

=======
function PostList (props){

  return (
    <div>
      {
      props.posts
      &&
      props.posts.map( 
        post =>
        <div key={`post#${post.id}`}>
          <a href={`#/posts/${post.id}`}><img src={post.image}></img></a>  
          <h3>{post.caption}</h3>
          <a href={`#/user/${post.user.id}`}><p>{post.user.username}</p></a>
          <p>{post.date}</p>
        </div>
        )
      }
    </div>
  )
}

>>>>>>> main
export default PostList