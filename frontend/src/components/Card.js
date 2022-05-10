
function MyCard(props) {

  return (
    <div className="card">
      <img className="card-image" src={props.data.gifUrl} />
      <div className="card-name">{props.data.name.toUpperCase()}</div>
      <div className="card-body">{props.data.bodyPart.toUpperCase()}</div>
      <div className="card-equip">{props.data.equipment.toUpperCase()}</div>
      <div className="card-target">{props.data.target.toUpperCase()}</div>
      <button onClick = {() => props.handleClickHandler(props.data.gifUrl, props.data.name.toUpperCase())} className="btn card-button">Post It!</button>
    </div>
    );
}

export default MyCard;