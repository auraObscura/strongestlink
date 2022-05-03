function PostForm (props){

  return (
    <form onSubmit={props.handleSubmitPost}>
      <label>
        Image:
        <input type="file" name="image" onChange={(event) => 
          props.setImageSelected(event.target.files[0])}/>
      </label>
      <label>
        Caption:
        <input type="text" name="caption"/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )

}

export default PostForm