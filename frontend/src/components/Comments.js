import CommentForm from "./CommentForm"
import { convertTimestamp } from '../utils/helpers'

function Comments (props) {

  const renderComments = () => {
    let elements = []
    for(let i = 0; i < props.comments.length; i++){
      if(props.comments[i]){
        elements.push(
          <div key={`comment${props.comments[i].id}`} className="comment">
            <div className="comment-attribution">
              <a className="commenter" href={`#/user/${props.comments[i].user.id}`}>
                <p className="comment-text">
                  {props.comments[i].user.username}</p>
              </a>
              <p className="comment-text"><span>{props.comments[i].text}</span></p>
            </div>
            {props.comments && 
              <p className="time">{convertTimestamp(props.comments[i].date)}</p>
            }
          </div>
        )
      }
    }
    return elements
  }

  return (
    <div className="comments-container">
      {props.comments && renderComments()}
      <CommentForm handleSubmitComment = {props.handleSubmitComment}/>
    </div>
  )
}

export default Comments