function SearchResult (props){
  return (
    props.searchResult.map(result => (
      <div key={`user#${result.user.id}`}>
        <img src={result.profile_img}></img>
        <a href={`#/user/${result.user.id}`}>{result.user.username}</a>
      </div>
    ))
  )
}

export default SearchResult