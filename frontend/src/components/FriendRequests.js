function FriendRequests (props) {

  const renderFriendRequests = () => {
    let elements = []
    for(let i = 0; i < props.friendRequests.length; i++){
      if(props.friendRequests[i]){
        if(!props.friendRequests[i].accepted){
          elements.push(
          <div key={`request#${props.friendRequests[i].id}`}>
             <div>{`You have a request from `}<a href={`#/user/${props.friendRequests[i].sender.id}`}>{props.friendRequests[i].sender.username}</a>
              <div className="btn-container">
                <button className="btn primary" onClick ={() => props.handleAcceptRequest(props.friendRequests[i].id)}>Accept</button>
                <button className="btn secondary" onClick ={() => props.handleRejectRequest(props.friendRequests[i].id)}>Reject</button>
              </div>
             </div>
          </div>
          )
        }
      } 
    }
    return elements
  }


  return (
    <div className="search-results">
       <h5>Friend Requests</h5>
       {renderFriendRequests()}
    </div>
   
  )
}

export default FriendRequests