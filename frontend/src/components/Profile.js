function Profile (props){
  return (
    <div>
      <img src={props.userProfile.profile_img}></img>
      <h3>{props.userProfile.user.username}</h3>
      <p>{props.userProfile.about_me}</p>
      <h5>Friends:</h5>
    </div>
  )
}

export default Profile