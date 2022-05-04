function PostDetail (props) {
  
  return (
    <div>
      <img src={props.post.image}></img>
      <h3 key={`post#${props.post.id}`}>{props.post.caption}</h3>
      <p>{props.post.date}</p>
    </div>
  )
}

export default PostDetail