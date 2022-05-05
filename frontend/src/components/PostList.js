import { convertTimestamp } from "../utils/helpers"
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
            <h3 className="caption">{post.caption}</h3>
            {post.date && 
            <p className="time">{convertTimestamp(post.date)}</p>
            }
          </div>
        </div>
        )
      }
    </div>
  )
}

export default PostList