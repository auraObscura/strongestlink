import CommentForm from "./CommentForm";

function Comments(props) {
  const renderComments = () => {
    let elements = [];
    for (let i = 0; i < props.comments.length; i++) {
      if (props.comments[i]) {
        elements.push(
          <div key={`comment${props.comments[i].id}`} className="comment">
            <p>
              <span>{props.comments[i].text}</span>
            </p>
            <p>{props.comments[i].date}</p>
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className="comments-container">
      {props.comments && renderComments()}
      <CommentForm handleSubmitComment={props.handleSubmitComment} />
    </div>
  );
}

export default Comments;
