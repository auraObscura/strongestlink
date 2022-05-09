function Friends (props){

  return (
    <div className="search-results">
       <h5>Friends:</h5>
       <div className="friends-container">
      {
      props.friends
      &&
      props.friends.map(friend => (
        <div key={`friend#${friend.user.id}`} className="friend-container">
          <img className="profile-avatar avatar-result" src={friend.profile_img}></img>
          <a href={`#/user/${friend.user.id}`}><p>{friend.user.username}</p></a>
        </div>
        ))}
      </div>
    </div>

   
  )
}

export default Friends