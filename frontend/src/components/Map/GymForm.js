import './GymForm.css';
import React, { useState } from 'react';
import StrongestLinkApi from '../../api/StrongestLinkApi'

function GymForm(props) {
  const [nameField, setNameField] = useState('');

  const handleSaveWorkouts = async (e) => {
    e.preventDefault();
    const gymData = {
      name: e.target.elements['gym_name'].value,
      type: 'gym',
      description: 'a location',
      latitude: e.target.elements['lat'].value,
      longitude: e.target.elements['lng'].value,
    };
    const data = await StrongestLinkApi.postPin(gymData);
    console.log(gymData);
    setNameField("")
  };


  return (
    <>
      <h1>{props.lat}</h1>
      <h1>{props.lng}</h1>
      <form onSubmit={handleSaveWorkouts} className="bg" method="POST">
        <label>Input the gym info</label>
        <input  value={nameField} onChange={(e) => setNameField(e.target.value)} name="gym_name"></input>
        <input name="lat" type="hidden" value={props.lat} />
        <input name="lng" type="hidden" value={props.lng} />
        <button className="button" type="submit" >Create Gym Location</button>
      </form>
    </>);
}

export default GymForm;