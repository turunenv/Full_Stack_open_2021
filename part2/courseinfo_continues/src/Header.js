import React from 'react'

//Component to return differently sized header-elements
const Header = ({ header, size }) => {
    if (size === 1) {
        return <h1>{header}</h1>
    } else if (size === 2){
        return <h2>{header}</h2>
    }
    return <h3>{header}</h3>
}

export default Header;
