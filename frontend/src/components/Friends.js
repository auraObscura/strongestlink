function Friends (props){
  return (
    <div>
       <h5>Friends:</h5>
      {
      props.friends
      &&
      props.friends.map(friend => (
        <div key={`friend#${friend.user.id}`}>
          <a href={`#/user/${friend.user.id}`}><p>{friend.user.username}</p></a>
        </div>
        ))}
    </div>
   
  )
}

export default Friends