function EditProfileForm (props) {
  return (
    <div>
      <form onSubmit={props.handleEditProfile}>
      <label>
        Profile Image:
        <input type="file" name="profileImage" onChange={(event) => 
          props.setImageSelected(event.target.files[0])}/>
      </label>
      <label>
        Weight:
        <input type="number" name="weight" step="any" min="0"/>
      </label>
      <label>
        About Me:
        <textarea name="aboutMe"/>
      </label>
      <label>
        Gender:
        <select name="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  )
}

export default EditProfileForm