function PostDetail (props) {
  
  return (
    <div className="post-container">
      <img src={props.post.image}></img>
      <div className="post-details-container">
        <h3 key={`post#${props.post.id}`}>{props.post.caption}</h3>
        <a href={`#/user/${props.post.user.id}`}><p>{props.post.user.username}</p></a>
        <p>{props.post.date}</p>
      </div>
    </div>
  )
}

export default PostDetail