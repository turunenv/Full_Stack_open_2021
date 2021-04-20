import React from 'react';
import PhonebookEntry from './PhonebookEntry';


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