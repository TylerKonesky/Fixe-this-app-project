import React from "react"

const StudentDraggable = props => {
  const { student } = props

  const dragStart = e => {
    e.dataTransfer.setData("text", e.target.id)
  }

  return (
    <div
      className="student-draggable"
      draggable={true}
      onDragStart={dragStart}
      id={student.id}
    >
      <p className="student-name">{student.name}</p>
    </div>
  )
}

export default StudentDraggable
