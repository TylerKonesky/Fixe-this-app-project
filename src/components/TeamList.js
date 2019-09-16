import React from "react"

import StudentDraggable from "./StudentDraggable"

const TeamList = props => {
  const [students, setStudents] = React.useState(props.students)

  const onDrop = e => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text")
    const addedStudent = students.find(student => student.id === parseInt(id))
    console.log(addedStudent)
    addedStudent.team = props.number
    setStudents([...students, addedStudent])
  }

  const renderStudents = () => {
    const teamPride = students.filter(student => student.team === props.number)
    return teamPride.map(student => {
      return <StudentDraggable key={student.id} student={student} />
    })
  }

  return (
    <div
      className="team-list"
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="team-title">team {props.number}</div>
      <div className="team-students">{renderStudents()}</div>
    </div>
  )
}

export default TeamList
