import React from "react";
import { Droppable } from "react-beautiful-dnd";

import StudentDraggable from "./StudentDraggable";
import axios from "axios";

const TeamList = props => {
  const [students, setStudents] = React.useState(props.students);

  const renderStudents = () => {
    const teamPride = students.filter(
      student =>
        student.team == +props.number || student.team_number == +props.number
    );

    return teamPride.map((student, index) => {
      if (student.team != student.team_number) {
        axios
          .put(
            `https://serene-sierra-85530.herokuapp.com/change-team-num/${student.name}`,
            { name: student, teamNumber: `${+props.number}` }
          )
          .then(response => {
            console.log("please don't break!");
          });
      }
      return (
        <StudentDraggable
          key={student.id}
          teamListHandleUpdate={props.updateData}
          student={student}
          index={index}
          nightMode={props.nightMode}
        />
      );
    });
  };

  return (
    <Droppable droppableId={props.number}>
      {provided => (
        <div
          className={props.nightMode ? "night-team-list" : "team-list"}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={props.nightMode ? "night-team-title" : "team-title"}>
            Team {props.number}
          </div>
          <div
            className={
              props.nightMode ? "night-team-students" : "team-students"
            }
          >
            {renderStudents()}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TeamList;
