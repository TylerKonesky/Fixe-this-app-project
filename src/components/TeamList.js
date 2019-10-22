import React from "react"
import { Droppable } from "react-beautiful-dnd"

import StudentDraggable from "./StudentDraggable"
import axios from "axios"

const TeamList = props => {
  console.log("team list page update?", props)
  const [students] = React.useState(props.students)
  
  

  const renderStudents = () => {
    console.log("check on students", students)
    const teamPride = students.filter(student => student.team == +props.number || student.team_number == +props.number)
    
    
    return teamPride.map((student, index) => {
      if(student.team != student.team_number){
        axios.put(`https://serene-sierra-85530.herokuapp.com/change-team-num/${student.name}`,{"name": student, "teamNumber": `${student.team}`}).then(response=>{
        console.log("updated user", response.data)  
        })
      }
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      )
    })
  }

  
  

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
