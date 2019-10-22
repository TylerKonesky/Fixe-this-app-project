import React from "react"
import { Droppable } from "react-beautiful-dnd"

import StudentDraggable from "./StudentDraggable"

const TeamList = props => {
  const [students] = React.useState(props.students)
  
  

  const renderStudents = () => {
    const teamPride = students.filter(student => student.team_number == +props.number)
    console.log("Team List",students)
    return teamPride.map((student, index) => {
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      )
    })
  }

  React.useEffect(() => {

  }, [students])
  

  return (
    <Droppable droppableId={props.number}>
      {provided => (
        <div
          className="team-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="team-title">team {props.number}</div>
          <div className="team-students">{renderStudents()}</div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default TeamList
