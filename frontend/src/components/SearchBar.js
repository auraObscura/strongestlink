import { useEffect, useState } from "react"
import SearchResult from "./SearchResult"

function SearchBar(props) {

  const[username, setUsername] = useState("")
  const [searchResult, setSearchResult] = useState("")

  useEffect(() =>{
    if(username){
      const result = props.profiles.filter(profile => profile.user.username == username)
      if(result.length !== 0){
        setSearchResult(result)
      }
      else{
        setSearchResult("")
      }
    }
  }, [username])

  const handleSubmitUsername = () => {
    setUsername(document.getElementById("username").value)
  }


  return (
    <div className="search-container">
      <h3>Search User by Username:</h3>
      <form className="posts-form" onSubmit = {(event) => event.preventDefault}>
        <div className="input-item-container">
          <input type="text" id="username" onChange = {handleSubmitUsername}placeholder="Enter Username"/>
        </div>
      </form>
      {username && (searchResult ? <SearchResult searchResult = {searchResult}/> : <p>{`User "${username}" does not exist`}</p>)}
    </div>
    
    
  )

}

export default SearchBar