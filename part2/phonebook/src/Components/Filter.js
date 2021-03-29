import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Filter names with
            <input 
                value={props.filter}
                onChange={props.handleFilterChange}
                type="text">
            </input>
        </div>
    )
}

export default Filter;