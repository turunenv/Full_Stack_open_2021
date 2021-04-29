import React from 'react';

const WeatherDisplay = ({weather, capital}) => {

    if(!weather.temperature) {
        return <></>
    }
    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>
                <b>temperature: </b>{weather.temperature} Celcius
            </p>
            <img src={weather.weather_icons[0]} alt="Weather icon" style={{maxWidth:150}}></img>
            <p>
                <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}
            </p>
        </>
    )
}

export default WeatherDisplay;