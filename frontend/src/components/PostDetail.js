function PostDetail (props) {
  
  return (
    <div>
      <img src={props.post.image}></img>
      <h3 key={`post#${props.post.id}`}>{props.post.caption}</h3>
      <a href={`#/user/${props.post.user.id}`}><p>{props.post.user.username}</p></a>
      <p>{props.post.date}</p>
    </div>
  )
}

export default PostDetail