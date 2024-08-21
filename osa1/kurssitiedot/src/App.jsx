const Header = (props) => {
  console.log(props)
  return(  
  <div>
    <h1>{props.course}</h1>
  </div>)
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}    </div>
  )
}

const Total = (props) => {
  console.log(props)
  let summa = 0

  props.parts.forEach(part => {
    summa += part.exercises
  })

  return(
  <div>
  <p>{summa}</p>
  </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App