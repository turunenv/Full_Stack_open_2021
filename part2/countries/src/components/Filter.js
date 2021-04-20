import React from 'react'

const Filter = ({handleFilterChange}) => {    
    return (
        <div>Find countries
            <input onChange={handleFilterChange}>    
            </input>
        </div>    
    )
}
export default Filter;