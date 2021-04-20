import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import FilterResults from './components/FilterResults'

function App() {
  console.log("Aaaaand the api key is...", process.env.react_app_api_key)
  
  //useState hooks to hold the values of the filter and the countries-array
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  //Update the filter value when user changes the input element
  const handleFilterChange = e => setFilter(e.target.value);

  //Fetch the country data from the RESTcountries API using the useEffect hook and axios library
  //Giving useEffect an empty array as the second argument to fetch the data only once, during the initial render
  useEffect(() => {
    //console.log("useEffect fired, will cause a re-render")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      })
  }, [])
  
  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <FilterResults filter={filter} countries={countries}/>
    </div>
  )
}
export default App;
