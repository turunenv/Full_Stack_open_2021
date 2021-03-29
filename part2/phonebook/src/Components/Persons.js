import React from 'react';
import PhonebookEntry from './PhonebookEntry';

//Persons only needs the persons array as props -> using destructuring right away
const Persons = ({persons}) => {
    return (
        <ul>
        {persons.map(person => {
          return (
            <PhonebookEntry 
              key={person.id} 
              name={person.name}
              number={person.number}/>
          )
        }
        )} 
      </ul>
    )
}
export default Persons;