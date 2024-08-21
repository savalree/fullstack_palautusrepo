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

  const handleGoodClick = () => {
    const updatedValue = good + 1
    setGood(updatedValue)
  }

  const handleNeutralClick = () => {
    const updatedValue = neutral + 1
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
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>

    </div>
  )
}

export default App
