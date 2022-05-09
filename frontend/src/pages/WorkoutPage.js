
import workoutApi from '../api/workoutAPI';
import { useState, useEffect } from 'react';
import MyCard from '../components/Card'

function WorkoutPage() {
  const bodyoptions = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];
  const equipmentoptions = ["assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer", "kettlebell", "leverage machine", "medicine ball", "olympic barbell", "resistance band", "roller", "rope", "skierg machine", "sled machine", "smith machine", "stability ball", "stationary bike", "stepmill machine", "tire", "trap bar", "upper body ergometer", "weighted", "wheel roller"];
  const targetoptions = ["abductors", "abs", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"];

  const [topdropvalue, setTopdropvalue] = useState('bodyPart');
  const [responseData, setResponseData] = useState([]);
  const [deepSearch, setDeepSearch] = useState(bodyoptions);

  useEffect(() => {
    renderdrop();
  }, []);


  useEffect(() => {
    renderdrop();
  }, [topdropvalue]);

  const renderdrop = () => {
    if (topdropvalue == 'target') {
      setDeepSearch(targetoptions);
    }
    if (topdropvalue == 'equipment') {
      setDeepSearch(equipmentoptions);
    }
    if (topdropvalue == 'bodyPart') {
      setDeepSearch(bodyoptions);
    }
  };

  const fetchData = (topSearch, search) => {
    workoutApi.getData(topSearch, search)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    const workoutListData = fetchData(e.target.elements['topSearch'].value, e.target.elements['deepsearch'].value);
  };


  const renderDropdown = (data) => {
    return data.map(choice => {
      return <option value={choice}>{choice}</option>;
    });
  };

  return (
    <section className="gym-page">
      <h1>Need a quick workout?</h1>
      <form onSubmit={handleSearch}>
        <label>Search for your workout:</label>
        <select onChange={(event) => setTopdropvalue(event.target.value)} name="topSearch" >
          <option value="bodyPart"> Body Part</option>
          <option value="target"> Target Muscle</option>
          <option value="equipment"> Equipment</option>
        </select>
        <select name="deepsearch">
          {renderDropdown(deepSearch)}
        </select>
        <button className="btn secondary" type="submit"> Search </button>
      </form>
      {responseData.length > 0 ? <MyCard data={responseData[0]} /> : ''}
    </section>
   
  );
}

export default WorkoutPage;;