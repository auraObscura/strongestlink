import StrongestLinkApi from '../api/StrongestLinkApi';
import workoutApi from '../api/workoutAPI';
import { useState, useEffect } from 'react';
import MyCard from '../components/Card'
import { useNavigate } from 'react-router-dom';
import BodyPng from '../components/BodyPng'

function WorkoutPage() {
  const bodyoptions = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];

  const equipmentoptions = ["assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer", "kettlebell", "leverage machine", "medicine ball", "olympic barbell", "resistance band", "roller", "rope", "skierg machine", "sled machine", "smith machine", "stability ball", "stationary bike", "stepmill machine", "tire", "trap bar", "upper body ergometer", "weighted", "wheel roller"];

  const targetoptions = ["abductors", "abs", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"];
  const nav = useNavigate()

  const [topdropvalue, setTopdropvalue] = useState('bodyPart');
  const [responseData, setResponseData] = useState([]);
  const [deepSearch, setDeepSearch] = useState(bodyoptions);
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);


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
    if (responseData.length > 18 ) {
      const results = [];
      responseData.forEach(data => { results.push(data); });
      let currentPage = (page === 1 ? 0 : page * 18)
      let endOfPage = (page === 1 ? (page * 18): (page * 18)  + 18)
      let starting = 0
      return results.slice(currentPage, endOfPage).map(data => {
          return <MyCard data={data} key={data.id} />;
      });
    }
    else {
    return data.map(workout => <MyCard data={workout} handleClickHandler = {handleClickHandler}/>)
  }
}

  const handleClickHandler = async (imageUrl , exerciseName) =>{
    const postData = {
      "caption" : `Check out this workout: ${exerciseName}`,
      "image" : imageUrl,
      "comments" : []
    }
    const backendResponse = await StrongestLinkApi.postPost(postData)
    if(backendResponse){
      nav(`/posts/${backendResponse.id}`)
    }
    console.log(backendResponse)
    
  }

  const renderButtons = (data) => {
    if (responseData.length > 18) {
      const pageButtons = [];
      const pages = data.length / 18;
      for (let i = 1; i <= pages; i++) {
        pageButtons.push(<button key={i} onClick={() => { setPage(i); }} className={page == i ? "page-btn-active" : "page-btn"}>{i}</button>);
      }
      return pageButtons;
    }
    else {
      return <button key={1} onClick={() => { setPage(1); }} className="page-btn-active">{1}</button>
    }
  };

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
      <BodyPng setResponseData={setResponseData} setPage={setPage} fetchData={fetchData} renderButtons={renderButtons}  />
      <div className="page-btn-container">{responseData.length > 0 ? renderButtons(responseData) : ''}</div>
      <div className="results"> {responseData.length > 0 ? renderCards(responseData) : ''}</div>
    </section>

  );
}

export default WorkoutPage;;