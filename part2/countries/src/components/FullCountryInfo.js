import React, { useEffect, useState } from 'react'
import WeatherDisplay from './WeatherDisplay'
import axios from 'axios'

const FullCountryInfo = ({ country }) => {
    //Getting weather for the capital of the country from wheatherstack.com API when FullCountryInfo gets rendered
    
    const [weather, setWeather] = useState({});
    const api_key = process.env.react_app_api_key;
    
    useEffect(() => {
        console.log("UseEffect fired at FullCountryInfo.js weatherstack.com request incoming...")
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
          .then(response => setWeather(response.data.current));
          
    }, [])
    
     

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
    
            <h2>languages</h2>
            <ul>
                {country.languages.map((language, i) => {
                    return <li key={language + i}>{language.name}</li>
                })}
            </ul>

            <img src={country.flag} alt={`Flag of ${country.name}`} style={{maxWidth:200}}></img>

            <div id="weather"></div>

            
            <WeatherDisplay 
                weather={weather} 
                capital={country.capital}
            />
            
        </div>)
}
export default FullCountryInfo