import React from "react"

const StudentDraggable = props => {
  const { student } = props
  return (
    <div className="student-draggable">
      <p className="student-name">{student.name}</p>
    </div>
  )
}

export default StudentDraggable
