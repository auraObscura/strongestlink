
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
  const [page, setPage] = useState(1)
  const [pageContent, setPageContent] = useState([])
  

  useEffect(() => {
    renderdrop();
  }, []);


  useEffect(() => {
    renderdrop();
  }, [topdropvalue]);


  // useEffect(() => {
  //   renderCards()
  // }, [page]);

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
  

  const renderCards = (data) => {
    const results = []
    let starting = 0
    if (page == 1 ) {
      starting = 0
    }
    else {
      starting = (page * 7) + 1
    }

    for (let i = starting; i <= (page * 7); i++) {
      results.push(data[i])
    }
    return results.map(workout => <MyCard data={workout} />)
  }

  

  const renderButtons = (data) => {
    const pageButtons = []
    const pages = data.length / 7
    for(let i = 1; i <= pages; i++) {
      pageButtons.push(<button key={i} onClick={() => {setPage(i)} } className={page == i ? "page-btn-active" : "page-btn"}>{i}</button>)
    }
    return pageButtons
  }

  return (
    <section className="gym-page">
      <div className="search-section">
      <h2>Need a quick workout?</h2>
      <form className="drop-downs" onSubmit={handleSearch}>
        <select onChange={(event) => setTopdropvalue(event.target.value)} name="topSearch" >
          <option value="bodyPart"> Body Part</option>
          <option value="target"> Target Muscle</option>
          <option value="equipment"> Equipment</option>
        </select>
        <select name="deepsearch">
          {renderDropdown(deepSearch)}
        </select>
        <button className="search-button" type="submit"> Search </button>
      </form>
      </div>
      <div className="page-btn-container">{responseData.length > 0 ? renderButtons(responseData) : ''}</div>
      <div className="results"> {responseData.length > 0 ? renderCards(responseData) : ''}</div>
    </section>
   
  );
}

export default WorkoutPage;;