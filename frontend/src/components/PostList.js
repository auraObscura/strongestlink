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

export default PostList