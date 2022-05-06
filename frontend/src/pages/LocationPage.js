import React from 'react'
import './Map/GymForm'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {Link } from "react-router-dom";
import ProfileSmallImage from './Map/ProfileSmallImage'

import StrongestLinkApi from "../api/StrongestLinkApi";

function LocationPage(props) {
  const [attendeeData, setAttendeeData] = useState();
  const [gymName, setGymName] = useState();
  const locationID = useParams()
  const [profiles, setProfiles] = useState([])
  const [attend, setAttend] = useState(false)
  
  const getData = async () => {
    const data = await StrongestLinkApi.getLocationByID(locationID['locationID'])
    setGymName(data.name)
    const attendee = data.attendees
    setAttendeeData(attendee)
  }

  useEffect(() => {
    getData() 
  }, [] )

  useEffect(() => {
    createAttendees()
  }, [attendeeData] )

  const createAttendees = async () => {
    const userProfiles = []
    if(attendeeData){
       for (const person of attendeeData){
      userProfiles.push(await StrongestLinkApi.getUserProfileByID(person))
    }
    if (attendeeData.includes(props.user.pk)) {
      setAttend(true)
    }
    setProfiles(userProfiles)
    }
  }

  const renderProfiles = () => {
    const dataProfiles = []
    profiles.forEach(id => {dataProfiles.push(id)})
    return dataProfiles.map((profile) => {return <li >
      <a className="gymLink" href={`#/user/${profile.id}`}><ProfileSmallImage image={profile.profile_img}/>
        {profile.user.username} </a>
    </li>})
  }

  const addSelfToGym = () => {
    const newattendees = [...attendeeData,  props.user.pk]
    // console.log('new attendees', newattendees)
    const newData = {'attendees' : newattendees}
    StrongestLinkApi.addAttendee(locationID['locationID'], newData)
  }



  return (
    <div className="top-score">
      These are the Top Althetes for {gymName}
    <ol><span className="top-header">Attendees</span>
      {renderProfiles()}
    </ol>
    { attend ? <div>You attend this gym</div> : <button onClick={addSelfToGym}>You don't go here</button>  }
 </div>
  )
}

export default LocationPage