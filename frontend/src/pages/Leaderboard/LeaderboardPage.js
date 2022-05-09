import React from "react";
import Boardprofiles from "./Boardprofiles";
import StrongestLinkApi from "../../api/StrongestLinkApi";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [exerciseData, setExerciseData] = useState([]);
  const [cardioData, setCardioData] = useState([]);

  const handleClick = async (e) => {
    const exercisesAll = await StrongestLinkApi.getLifts();
    // console.log(exercisesAll)
    // console.log(e.target.id)
    const filteredExercise = exercisesAll.filter(
      (exercise) => exercise.type === e.target.id
    );
    console.log(filteredExercise);

    setExerciseData(filteredExercise);
    setCardioData([]);
  };

  const cardioClick = async (e) => {
    const allCardio = await StrongestLinkApi.getCardio();
    const filteredCardio = allCardio.filter(
      (exercise) => exercise.type === e.target.id
    );
    setCardioData(filteredCardio);
    setExerciseData([]);
  };
  //rendering lift stats
  const renderLifts = () => {
    if (handleClick) {
      return (
        <ul>
          {exerciseData.map((exercise, index) => {
            return (
              <div key={`exercise-${exercise.id}`}>
                <li>
                  <h3>{index + 1 + ". "} Name of User</h3>
                </li>
                <li>
                  {exercise.weight} lbs
                  <hr />
                </li>
              </div>
            );
          })}
        </ul>
      );
    }
  };
  //rendering cardio stats
  const renderCardio = () => {
    if (cardioClick) {
      return (
        <ul>
          {cardioData.map((exercise, index) => {
            return (
              <div key={`cardio-${exercise.id}`}>
                <li>
                  <h3> {index + 1 + ". "} Cardio User</h3>
                </li>
                <li>
                  {exercise.miles} miles
                  <hr />
                </li>
              </div>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <section>
      <h1> Strongest Link Top 5</h1>
      <div className="exer-buttons">
        <button className="btn primary" onClick={handleClick} id="Bench">
          Bench
        </button>
        <button className="btn primary" onClick={handleClick} id="Squat">
          Squat
        </button>
        <button className="btn primary" onClick={handleClick} id="Deadlift">
          Deadlift
        </button>
        <button className="btn primary" onClick={cardioClick} id="Run">
          Miles
        </button>
        <button className="btn primary" onClick={cardioClick} id="Bike">
          Bike
        </button>
      </div>
      <div>{renderLifts()}</div>
      <div>{renderCardio()}</div>
      <Boardprofiles profileuser="Placeholder" />
    </section>
  );
}

export default Leaderboard;
