import React, {useState} from 'react'

import FullCountryInfo from './FullCountryInfo'

const CountryDisplay = ({country}) => {
    //useState hook to see if the user has clicked on the show-button
    const [hidden, setHidden] = useState(true);

    const toggleButton = () => setHidden(!hidden);
    
    //If button status is hidden, show button with text "show" and siapley only the country name
    return hidden ?
        <>
        {country.name}
        <button onClick={toggleButton}>show</button>
        </> 
        //If status is hidden=false, show hide-button with the full country display
        :
        <>
            <FullCountryInfo country={country} />
            <button onClick={toggleButton}>hide</button>
        </>



}
export default CountryDisplay
