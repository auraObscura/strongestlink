import React from "react";
// import Boardprofiles from "./Boardprofiles";
import StrongestLinkApi from "../../api/StrongestLinkApi";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Leaderboard() {
  const [exerciseData, setExerciseData] = useState([]);
  const [cardioData, setCardioData] = useState([]);
  const [exercise, setExercise] = useState("");
  const [chartData, setChartData] = useState("");
  const [user, setUser] = useState("");
  const [userLifts, setUserLifts] = useState("");
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("user"));
    if (foundUser) {
      console.log("founduser: ", foundUser);
      const userId = foundUser.pk;
      const user = foundUser;
      setUser(user);
      console.log("user", user);
      console.log("user id:", userId);
    }
  }, []);

  const handleClick = async (e) => {
    const exercisesAll = await StrongestLinkApi.getLifts();
    const filteredExercise = exercisesAll.filter(
      (exercise) => exercise.type === e.target.id
    );
    console.log(filteredExercise);
    let topFiveLifts = [];
    setExerciseData(filteredExercise);
    setExercise(e.target.id);
    for (let object of filteredExercise) {
      topFiveLifts.push(object);
    }
    topFiveLifts.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
    setTopFive(topFiveLifts.slice(-5));
    setCardioData([]);
  };
  console.log(topFive);

  const cardioClick = async (e) => {
    const allCardio = await StrongestLinkApi.getCardio();
    const filteredCardio = allCardio.filter(
      (exercise) => exercise.type === e.target.id
    );
    let topFiveCardio = [];
    for (let object of filteredCardio) {
      topFiveCardio.push(object);
    }
    topFiveCardio.sort((a, b) => parseInt(b.miles) - parseInt(a.miles));
    setCardioData(topFiveCardio.slice(-5));
    setExercise(e.target.id);
  };

  useEffect(() => {
    const chart = async () => {
      if (exercise != "Run" && exercise != "Bike") {
        const exercisesAll = await StrongestLinkApi.getLifts();
        let weights = [];
        let dates = [];

        for (const dataObj of exercisesAll) {
          console.log(dataObj.user.id);
          if (dataObj.user.id == user.pk && dataObj.type == exercise) {
            weights.push(parseInt(dataObj.weight));
            dates.push(dataObj.date);
          }
        }
        for (let i = 0; i < dates.length; i++) {
          let temp = dates[i].split("T");
          dates[i] = temp[0];
        }

        let data = {
          labels: dates,
          datasets: [
            {
              label: "Weight",
              data: weights,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderWidth: 4,
            },
          ],
          options: {
            scales: {
              x: {
                ticks: {
                  color: "white",
                },
              },
            },
          },
        };

        let tempList = [];
        for (const dataObj of exercisesAll) {
          if (dataObj.user.id == user.pk && dataObj.type == exercise) {
            tempList.push(dataObj);
            console.log(tempList);
          }
        }

        tempList.sort((a, b) => {
          return a.weight - b.weight;
        });
        let displayList = tempList.slice(-3);
        setChartData(data ? data : []);
        setUserLifts(displayList.reverse());
        console.log(chartData);
      } else {
        const exercisesAll = await StrongestLinkApi.getCardio();
        let miles = [];
        let dates = [];
        for (const dataObj of exercisesAll) {
          if (dataObj.user.id == user.pk && dataObj.type == exercise) {
            miles.push(parseInt(dataObj.miles));
            dates.push(dataObj.date);
          }
        }
        for (let i = 0; i < dates.length; i++) {
          let temp = dates[i].split("T");
          dates[i] = temp[0];
        }

        let data = {
          labels: dates,
          datasets: [
            {
              label: "Distance in Miles",
              data: miles,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderWidth: 4,
            },
          ],
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    color: "white",
                  },
                  type: "time",
                  time: {
                    unit: "day",
                  },
                },
              ],
            },
          },
        };

        let tempList = [];
        for (const dataObj of exercisesAll) {
          if (dataObj.user.id == user.pk && dataObj.type == exercise) {
            tempList.push(dataObj);
            console.log(tempList);
          }
        }

        tempList.sort((a, b) => {
          return a.miles - b.miles;
        });
        let displayList = tempList.slice(-3);
        setChartData(data ? data : []);
        setUserLifts(displayList.reverse());
        console.log(chartData);
      }
    };
    chart();
  }, [exercise]);
  //rendering lift stats
  const renderLifts = () => {
    if (handleClick) {
      return (
        <ul>
          {topFive.map((exercise, index) => {
            return (
              <div key={`exercise-${exercise.id}`}>
                <li>
                  <h3>
                    {index + 1 + ". "} {exercise.user.username}
                  </h3>
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
                  <h3>
                    {" "}
                    {index + 1 + ". "} {exercise.user.username}{" "}
                  </h3>
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

  console.log(userLifts);
  const readableData = () => {
    let list = [];
    if (exercise != "Run" && exercise != "Bike") {
      for (const dataObj of userLifts) {
        console.log(dataObj);
        list.push(
          <li>
            You lifted {Math.round(dataObj.weight)} pounds on{" "}
            {dataObj.date.slice(0, 10)}
          </li>
        );
      }
    } else {
      for (const dataObj of userLifts) {
        console.log(dataObj);
        list.push(
          <li>
            You did {dataObj.miles} miles on {dataObj.date.slice(0, 10)}
          </li>
        );
      }
    }
    return list;
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
      <div>
        <h1 className="history">Your {exercise} History</h1>
        <div className="Chart">
          <div className="myChart">
            {chartData && <Line data={chartData} />}
          </div>
          <div className="dataList">
            <h2>Your Top Stats</h2>
            <ol>{readableData()}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
