import React from 'react'
import Boardprofiles from './Boardprofiles';
import StrongestLinkApi from '../../api/StrongestLinkApi';
import { useState } from 'react'

function Leaderboard() {

  const [exerciseData, setExerciseData] = useState([])

  const handleClick = async (e) => {
    const exercisesAll = await StrongestLinkApi.getLifts()
    // console.log(exercisesAll)
    // console.log(e.target.id)
    const filteredExercise = exercisesAll.filter(exercise => (exercise.type === e.target.id))
      console.log(filteredExercise)
    
    setExerciseData(filteredExercise)
  }

  return (
    <div>
      <h1> Strongest Link Top 5</h1>
      <div className="exer-buttons">
        <button onClick={handleClick} id="Bench">Bench</button>
        <button onClick={handleClick} id="Squat">Squat</button>
        <button onClick={handleClick} id="Deadlift">Deadlift</button>
        <button onClick={handleClick} id="Miles">Miles</button>
      </div>
      <hr />
        <ul>
          {exerciseData.map((exercise, index) => {
            return(
              <div key={index}>
                <li>
                  <h3>{index + 1 + ". " } Name of User</h3>
                </li>
                <li>
                  {exercise.weight} lbs
                  <hr/>
                </li>
              </div>
            )})}
        </ul>
      <Boardprofiles profileuser="Placeholder"/>
    </div>
  )
}

export default Leaderboard;