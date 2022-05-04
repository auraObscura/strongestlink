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
          <h3>{post.caption}</h3>
          <p>{post.date}</p>
        </div>
        )
      }
    </div>
  )
}

export default PostList