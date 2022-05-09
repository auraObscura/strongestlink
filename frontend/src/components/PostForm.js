function PostForm (props){

  return (
    <form className="posts-form" onSubmit={props.handleSubmitPost}>
      <div className="input-item-container">
      </div>
      <label>
        Image:
      </label>
      <input className="input-img" type="file" name="image" onChange={(event) => 
        props.setImageSelected(event.target.files[0])}/>
      <input className="input-img" type="text" name="caption" placeholder="Enter caption"/>
      <input type="submit" value="Submit" className="btn" />
    </form>
  )
}

export default PostForm