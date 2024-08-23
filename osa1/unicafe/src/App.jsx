import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const StatisticLine = (props) => {
    if (props.total === 0){
        return(
            <div>No feedback given</div>
        )
    }
    return(
        <div> 
        <p>{props.text} {props.value}</p></div>
    )
  }

  const Statistics = (props) => {
    return(
      <div>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.total} />
        <StatisticLine text="average" value ={props.mean} />
        <StatisticLine text="positive" value ={props.positives} />
      </div>
    )
  }
  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good+neutral+bad
  const mean = (good-bad)/total
  const positives = (good/total)*100

  const handleGoodClick = () => {
    const updatedValue = good + 1
    setGood(updatedValue)
  }

  const handleNeutralClick = () => {
    const updatedValue = neutral + 1
    const newTotal = updatedValue + good + bad
    setNeutral(updatedValue)
  }

  const handleBadClick = () => {
    const updatedValue = bad + 1
    setBad(updatedValue)
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} mean={mean} positives={positives}/>
    </div>
  )
}

export default App
