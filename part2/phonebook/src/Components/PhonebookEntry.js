import React from 'react';


const PhonebookEntry = ({person, deletePerson}) => {
    return (
        <li className="phoneBookEntry">
            {person.name} {person.number}
            <button 
              onClick={() => deletePerson(person)} 
              name={person.id}>delete
            </button>
            
        </li>
    )
}

export default PhonebookEntry;