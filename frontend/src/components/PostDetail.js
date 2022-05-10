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
        {
          props.user.username == props.post.user.username 
          && 
          <div className="post-details-button-container">
            <button className="btn" onClick = {() => props.setWantToEditCaption(!props.wantToEditCaption)}>Edit Caption</button> 
            <button className="btn secondary" onClick = {props.handleDeletePost}>Delete Post</button>
          </div>
        }
        {
          props.wantToEditCaption
          &&
          <form className="posts-form" onSubmit={props.handleEditPost}>
            <input className="input-img" type="text" name="caption" placeholder="Enter caption" defaultValue={props.post.caption} required/>
            <input type="submit" value="Submit" className="btn" />
          </form>
        }
      </div>
    </div>
  )
}

export default PostDetail
