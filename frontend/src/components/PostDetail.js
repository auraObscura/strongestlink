import { convertTimestamp } from "../utils/helpers"
function PostDetail (props) {

  
  return (
    <div className="post-container">
      {props.post.image && 
        <img src={props.post.image}></img>
      }
      <div className="post-details-container">
        <h3 className="caption" key={`post#${props.post.id}`}>
          {props.post.user ? <span className="post-author">{props.post.user.username}</span>: null}
          <span className="post-caption">{props.post.caption}</span>  
        </h3>
        {props.post.date && 
          <p className="time">{convertTimestamp(props.post.date)}</p>
        }
      </div>
    </div>
  )
}

export default PostDetail
