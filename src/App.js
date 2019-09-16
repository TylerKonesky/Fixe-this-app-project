import React from "react"

import StudentDraggable from "./components/StudentDraggable"

import mockData from "./mockData"
import TeamList from "./components/TeamList"

const App = () => {
  const [student, setStudent] = React.useState("")
  const [students, setStudents] = React.useState(mockData)

  const renderStudents = () => {
    const noTeam = students.filter(student => !student.team)
    return noTeam.map(student => {
      return <StudentDraggable key={student.id} student={student} />
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStudents([
      ...students,
      { id: students.length + 1, name: student, team: null }
    ])
  }

  return (
    <div className="app">
      <div className="left-student-list">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={e => setStudent(e.target.value)}
          />
          <button>Add Student</button>
        </form>
        {renderStudents()}
        <div className="separator-skew" />
      </div>

      <div className="teams-wrapper">
        <TeamList students={students} number={1} />
        <TeamList students={students} number={2} />
        <TeamList students={students} number={3} />
      </div>
    </div>
  )
}

export default App
