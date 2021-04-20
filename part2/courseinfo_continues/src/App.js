import React from 'react';
import Course from './Course';
import Header from './Header';


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'React',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }, 
    {
      name: 'CSS Layout',
      id: 3,
      parts: [
        {
          name: 'Flexbox',
          exercises: 5,
          id: 1
        },
        {
          name: 'Grid',
          exercises: 10,
          id: 2
        }
      ]
    }
  ]

  let courseComponents;
  courseComponents = courses.map((course) => {
    return <Course key={course.id} course={course} />
  })

  return (
    <div>
      <Header header="Web development curriculum" size={1} />
      <div>{courseComponents}</div>
    </div>
  )
}

export default App;
