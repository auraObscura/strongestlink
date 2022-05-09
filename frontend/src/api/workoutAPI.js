import axios from 'axios'; 

export default {
  getData: (topSearch, deepSearch) =>
    axios({
      'method': 'GET',
      'url': `https://exercisedb.p.rapidapi.com/exercises/${topSearch}/${deepSearch}`,
      'headers': {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': '3ffa5fb259msh1aadb9da237bd30p1b726fjsnae990052df67'
      },
    })
};
