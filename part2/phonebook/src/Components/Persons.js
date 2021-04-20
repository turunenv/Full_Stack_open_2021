import React from 'react';
import PhonebookEntry from './PhonebookEntry';

//Persons only needs the persons array as props -> using destructuring right away
const Persons = ({persons, deletePerson}) => {
    return (
        <ul>
        {persons.map(person => {
          //console.log(`This is ${person.name}, number ${person.number}, id ${person.id}`)
          return (
            <PhonebookEntry
              key={person.id}
              person={person}
              deletePerson={deletePerson}/>
          )
        }
        )} 
      </ul>
    )
}
export default Persons;