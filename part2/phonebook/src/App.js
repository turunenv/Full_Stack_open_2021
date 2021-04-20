import React, { useState, useEffect } from 'react';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import UserNotification from './Components/UserNotification'
import backEnd from './backEnd'

const App = () => {
  
  const [persons, setPersons] = useState([]);

  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('');
  const [userMessage, setUserMessage] = useState({ message: null, className: ''});

  //Event handlers for onChange events when user types something in the input elements
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilterChange = (e) => {
    //set filter to lowercase right away
    setFilter(e.target.value);
  }

  const removeUserMessage = () => {
    setTimeout(() => {
      setUserMessage({ message: null, className:""})
    }, 3000)
  }

  //Event handler for adding a person object to the persons list
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }

    
    //If name is already added, offer the user a chance to update the number (exercise 2.18)
    const addedIndex = persons.findIndex(person => person.name === newName)
    if (addedIndex !== -1) {
      if(window.confirm(`${newName} is already in the notebook. Do you want to replace the old number with the new one (${newNumber})?`)) {
        newPerson.id = addedIndex + 1;
        backEnd.update(newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          })
      }
      setNewName('');
      setNewNumber('');
      setUserMessage({ message: `Updated the number of ${newPerson.name} succesfully!`, className: "userAddedSuccess"})
      removeUserMessage();
      return
    }
    console.log(newPerson);
    
    backEnd.create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setUserMessage({ message: `Added ${newPerson.name} succesfully!`, className: "userAddedSuccess"})
        removeUserMessage();  
      })
  };
  const deletePerson = (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      backEnd.deleteFromDB(person.id);
      let personCopy = [...persons];
      console.log("Value of state persons before splice:", personCopy.length)
      for(let i = 0; i < persons.length; i++) {
        if(persons[i].id === person.id) {
          personCopy.splice(i, 1)
        }
      }
      setPersons(personCopy);
      
    }
  }
  

  //Check if filter is not empty -> filter the correct persons to show

  //If filter is an empty string, we just want to display the full array
  let personsToShow = persons;

  //If filter is not empty, filter the correct person objects
  if (filter) {
    personsToShow = persons.filter(person => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    })
  }

  //render the initial persons from db.json using useEffect, happens once after the initial render so we 
  //add the empty array as the second argument for the useEffect-function
  useEffect(() => {
    backEnd
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  return (
    <div className="wrapper">
      <h2>Phonebook</h2>
      <UserNotification
        userMessage={userMessage} />
      
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
      <Persons 
        persons={personsToShow} 
        deletePerson={deletePerson}/>
    </div>
  )
  
}

export default App;
