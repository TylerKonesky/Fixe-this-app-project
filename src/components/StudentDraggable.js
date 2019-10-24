import React from "react";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

const StudentDraggable = props => {
  console.log(props.nightMode);
  const { student } = props;

  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(
        `https://serene-sierra-85530.herokuapp.com/remove-name/${student.name}`
      )
      .then(response => {
        console.log("Successfully deleted: " + response.data.name);
        teamListHandleUpdate(response.data);

        alert("SUCCESSFUL DELETE");
        // teamListHandleUpdate(response.data)

      })
      .catch(error => {
        console.log("Error on delete: " + error);
      });
  };


  const teamListHandleUpdate = arr => {
    props.teamListHandleUpdate(arr);
  };

  return (
    <Draggable draggableId={student.id} index={props.index}>
      {provided => (
        <div
          className={
            props.nightMode ? "night-student-draggable" : "student-draggable"
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >

          <p
            className={props.nightMode ? "night-student-name" : "student-name"}
          >
            {student.name}
          </p>
          <button
            className={props.nightMode ? "night-del-student" : "del-student"}
            onClick={e => handleDelete(e)}
          >

            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default StudentDraggable;
