import React from "react"

import StudentDraggable from "./components/StudentDraggable"

import mockData from "./mockData"

const App = () => {
  const renderStudents = () => {
    return mockData.map(student => {
      return <StudentDraggable key={student.id} student={student} />
    })
  }

  return (
    <div className="app">
      <div className="left-student-list">
        <input type="text" placeholder="Enter Student Name" />
        <button>Add Student</button>
        {renderStudents()}
      </div>
      <div className="separator-skew" />
      <div className="teams-wrapper">teams wrapper</div>
    </div>
  )
}

export default App
