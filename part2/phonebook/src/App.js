import React, { useState } from 'react';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons'
import Filter from './Components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040 0000000",
      id: '1Arto Hellas'}
  ]);

  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('');

  //Event handlers for onChange events when user types something in the input elements
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilterChange = (e) => {
    //set filter to lowercase right away
    setFilter(e.target.value.toLowerCase());
  }

  //Event handler for adding a person object to the persons list
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Prevent adding the same name twice
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      //return statement omitted -> returns undefined, we are fine with that
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}${newName}`
    }
    const newNameArr = [...persons].concat(newPerson);
    setPersons(newNameArr);
    setNewName("");
    setNewNumber("");
  };

  //Check if filter is not empty -> filter the correct persons to show

  //If filter is an empty string, we just want to display the full array
  let personsToShow = persons;

  //If filter is not empty, filter the correct person objects
  if (filter) {
    personsToShow = persons.filter(person => {
      return person.name.toLowerCase().indexOf(filter) !== -1;
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter
        filter={filter} 
        handleFilterChange={handleFilterChange} />
      
      <h3>Add a new person to the phonebook</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />

    </div>
  )
  
}

export default App;
