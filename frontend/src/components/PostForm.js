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
      <input className="input-img" type="text" name="caption" placeholder="Enter caption" required/>
      <select id="exercise" name="workout" defaultValue="none">
        <option value="none" disabled hidden>Select a Workout (optional)</option>
        <option value="Bench">Bench</option>
        <option value="Squat">Squat</option>
        <option value="Deadlift">Deadlift</option>
        <option value="Bike">Bike</option>
        <option value="Run">Run</option>
      </select>
      <input className="input-img" type="number" name="number" placeholder="Enter weight(lbs)/distance(miles)"/>
      <input type="submit" value="Submit" className="btn" />
    </form>
  )

}

export default PostForm