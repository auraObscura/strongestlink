function CommentForm(props){
  return (
    <form class="comment-form" onSubmit={props.handleSubmitComment}>
      <input type="text" name="text" placeholder="Enter comment"/>
      <input type="submit" value="Submit" className="submit" />
    </form>
  )
}

export default CommentForm