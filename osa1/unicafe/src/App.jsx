import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [mean, setMean] = useState(0)
  const [positives, setPositives] = useState(0)


  const handleGoodClick = () => {
    const updatedValue = good + 1
    setGood(updatedValue)
    const newTotal = updatedValue + neutral + bad
    setTotal(newTotal)
    const updatedMean = mean + 1
    setMean(updatedMean)
    console.log(updatedValue, newTotal, updatedValue/newTotal)
    setPositives(updatedValue/newTotal * 100)
    console.log(positives)
  }

  const handleNeutralClick = () => {
    const updatedValue = neutral + 1
    setNeutral(updatedValue)
    const newTotal = updatedValue + good + bad
    setTotal(newTotal)
    setPositives(good/newTotal * 100)
    console.log(positives)
  }

  const handleBadClick = () => {
    const updatedValue = bad + 1
    setBad(updatedValue)
    const newTotal = updatedValue + neutral + good
    setTotal(newTotal)
    const updatedMean = mean - 1
    setMean(updatedMean)
    setPositives(good/newTotal * 100)
    console.log(positives)
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <h1>statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {total}</p>
    <p>average {mean/total}</p>
    <p>positive {positives} %</p>
    </div>
  )
}

export default App
