
import FullCountryInfo from './FullCountryInfo'
import CountryDisplay from './CountryDisplay'


const FilterResults = ({countries, filter}) => {

    //filter the countries-array based on the name-filter
    const filteredCountries = countries.filter(country => {
        /*
        -Compare each country objects name property to the filter with string.indexOF()-method, 
        which returns -1 if substring not found
        -Also making the filter case insensitive with string.toLowerCase() */
        
        return country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    })
   
    //The JSX we return depends on the length of the filteredCountries array:
    const numCountries = filteredCountries.length;

    if (numCountries > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (numCountries > 1) {
        return (
            <ul>
                { filteredCountries.map(country => {
                return(
                    <li key={country.name}>
                        <CountryDisplay country={country} />
                    </li>
                )
                })}

                
            </ul>
        )
    } else if (numCountries === 1) {
        const country = filteredCountries[0];
        
        return <FullCountryInfo country={country}/>
    } else {
        return <div>No matches found</div>
    }
    
    
}
export default FilterResults;