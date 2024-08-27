import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
return(
  <div>filter shown with <input value={props.filterParameter} onChange={props.handleFiltering}/></div>
)
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNewName}/></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNewNumber}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
return(
  <ul>
  {props.filterPersons.map(person =>
    <p key={person.name}>{person.name} {person.number} <button onClick={ (event) => props.deletePerson(event,person)}>delete</button></p>
  )}
</ul>
)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParameter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(persons.find(person => person.name === newName).id,personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== returnedPerson.id ? person : returnedPerson
          ));
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (event,person) =>{
    event.preventDefault()
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(pers => pers.id !== person.id))
      })
    }
  }

  const filterPersons = filterParameter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filterParameter.toLowerCase())
    )
    : persons

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterParameter={filterParameter} handleFiltering={handleFiltering} />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName}
        handleNewNumber={handleNewNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App
