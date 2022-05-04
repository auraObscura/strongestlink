import CommentForm from "./CommentForm"

function Comments (props) {

  const renderComments = () => {
    let elements = []
    for(let i = 0; i < props.comments.length; i++){
      if(props.comments[i]){
        elements.push(
          <div key={`comment${props.comments[i].id}`}>
            <h4>{props.comments[i].text}</h4>
            <a href={`#/user/${props.comments[i].user.id}`}><p>{props.comments[i].user.username}</p></a>
            <p>{props.comments[i].date}</p>
            <hr></hr>
          </div>
        )
      }
    }
    return elements
  }

  return (
    <div>
      <h2>Comments:</h2>
      {props.comments && renderComments()}
      <CommentForm handleSubmitComment = {props.handleSubmitComment}/>
    </div>
  )
}

export default Comments