function CommentForm(props){
  return (
    <form onSubmit={props.handleSubmitComment}>
      <label>
        Comment:
        <input type="text" name="text"/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default CommentForm