import React from 'react'
import Header from './Header'


  const Total = ({ course }) => {
     const parts = course.parts;
     let total;
     total = parts.reduce((accumulator, part) => {
       return accumulator + part.exercises
     }, 0)
     return (
            <p>
              <b>total of {total} exercises</b>
            </p>
     )
   }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = (props) => {
    let parts;
    parts = props.course.parts.map((part) => {
      return <Part key={part.id} part={part} />
    });
    return parts;
}


const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name} size={2} />
        <Content course={course} />
        <Total course={course} />
      </div>

    )
}

export default Course