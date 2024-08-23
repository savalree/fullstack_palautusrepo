const Header = (props) => {
    return(  
    <div>
      <h1>{props.course}</h1>
    </div>)
  }
  
  const Content = (props) => {
    console.log("Content sai: ", props)
    return(
      <div>
        {props.parts.map((part) => (
          <Part key={part.id} part ={part.name} exercises={part.exercises} />
        ))}    </div>
    )
  }
  
//   const Total = (props) => {
//     console.log(props)
//     let summa = 0
  
//     props.parts.forEach(part => {
//       summa += part.exercises
//     })
  
//     return(
//     <div>
//     <p>{summa}</p>
//     </div>
//     )
//   }
  
  const Part = (props) => {
    console.log("Part sai: ", props)
    return(
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
}
const Course = ({course}) => {

    console.log("course sai tällasen", course.name)

    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          {/* <Total parts={course.parts} /> */}
        </div>
      )
}
export default Course