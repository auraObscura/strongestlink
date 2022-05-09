function SearchResult (props){
  return (
    props.searchResult.map(result => (
      <div key={`user#${result.user.id}`} className="search-results">
        <img className="profile-avatar avatar-result" src={result.profile_img}></img>
        <a href={`#/user/${result.user.id}`}>{result.user.username}</a>
      </div>
    ))
  )
}

export default SearchResult