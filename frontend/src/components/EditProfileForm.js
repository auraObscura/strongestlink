function EditProfileForm (props) {
  return (
    <div>
      <form className="edit-form" onSubmit={props.handleEditProfile}>
      <label>
        Profile Image:
        </label>
        <input type="file" name="profileImage" onChange={(event) => 
          props.setImageSelected(event.target.files[0])}/>
      <label>
        Weight:
        </label>
        <input type="number" name="weight" step="any" min="0" placeholder="Enter weight"/>
      <label>
        About Me:
        </label>
        <textarea name="aboutMe"/>
      <label>
        Gender:
      </label>
      <select name="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
      </select>
      <input type="submit" value="Submit" className="btn submit"/>
    </form>
    </div>
  )
}

export default EditProfileForm


// function EditProfileForm (props) {
//   return (
//     <div>
//       <form className="edit-form" onSubmit={props.handleEditProfile}>
//       <label>
//         Profile Image:
//       </label>
//       <input type="file" name="profileImage" onChange={(event) => 
//         props.setImageSelected(event.target.files[0])}/>
//       <label>
//         Weight:
//       </label>
//       <input type="number" name="weight" step="any" min="0" placeholder="Enter weight" />
//       <label>
//         About Me:
//         </label>
//       <textarea name="aboutMe"/>
//       <label>
//         Gender:
//       </label>
//       <select name="gender">
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Unspecified">Unspecified</option>
//         </select>
//       <input type="submit" value="Submit" className="btn submit" />
//     </form>
//     </div>
//   )
// }

// export default EditProfileForm
