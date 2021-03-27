import React, { useState } from 'react';

//Button component returns a button-element with an event handler and a text that are passed as props
const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

//Header function component returns a h1-element with the text passed as props
const Header = ({header}) => {
  return <h1>{header}</h1>;
}

//Component to display stats from each category
//returns a table row with two table data elements in it
const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


//Component to display all the different stats
const Statistics = (props) => {
  if (props.total) {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={props.good} />
          <Statistic text="Neutral" value={props.neutral} />
          <Statistic text="Bad" value={props.bad} />
          <Statistic text="All" value={props.total} />
          <Statistic text="Average" value={props.calculateAverage()} />
          <Statistic text="Positive" value={props.good/props.total * 100 + " %"} />
        </tbody>
      </table>
    );
}
return <div>No feedback given yet</div>
}


const App = () => {

  //Let's set up useState hooks for all 3 feedback buttons
  //All of them have initial value of 0
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //Event handlers for the 3 buttons
  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  //Total number of feedbacks given
  const total = good + neutral + bad;

  //"Total value" of feedback: good = 1, neutral = 0, bad = -1 -> 1*good + 0*neutral + (-1)*bad = good-bad
  const feedbackValue = good - bad;
  
  const calculateAverage = () => feedbackValue / total;
  
  return (
    <div>
      <Header header="Give feedback" />

      <Button text="Good" handleClick={handleGood} />
      <Button text="Neutral" handleClick={handleNeutral} />
      <Button text="Bad" handleClick={handleBad} />

      <Header header="Statistics" />
      <Statistics
        total={total}
        good={good}
        neutral={neutral}
        bad={bad}
        calculateAverage={calculateAverage}
      />

    </div>

  )
}

export default App;
