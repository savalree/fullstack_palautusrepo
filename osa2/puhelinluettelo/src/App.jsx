import { useState } from 'react'

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
    <p key={person.name}>{person.name} {person.number}</p>
  )}
</ul>
)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParameter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Persons filterPersons={filterPersons} />
    </div>
  )

}

export default App
