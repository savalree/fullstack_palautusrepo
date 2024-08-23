const Header = (props) => {
    return(  
    <div>
      <h1>{props.course}</h1>
    </div>)
  }
  
  const Content = (props) => {
    return(
      <div>
        {props.parts.map((part) => (
          <Part key={part.id} part ={part.name} exercises={part.exercises} />
        ))}    </div>
    )
  }
  
  const Total = (props) => {
    const reducedSumma = props.parts.reduce((accumulator, part) =>{
        return accumulator += part.exercises;
    }, 0)
  
    return(
    <div>
    <p><strong>total of {reducedSumma} exercises</strong></p>
    </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
}
const Course = ({course}) => {

    // console.log("course sai tällasen", course.name)

    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}
export default Course