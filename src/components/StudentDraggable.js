import React from "react";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

const StudentDraggable = props => {
  const { student } = props;
  console.log("test on the students page", student);

  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(
        `https://serene-sierra-85530.herokuapp.com/remove-name/${student.name}`
      )
      .then(response => {
        console.log("Successfully deleted: " + response.data.name);
      })
      .catch(error => {
        console.log("Error on delete: " + error);
      });
  };

  return (
    <Draggable draggableId={student.id} index={props.index}>
      {provided => (
        <div
          className="student-draggable"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className="student-name">{student.name}</p>
          <button onClick={e => handleDelete(e)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
};

export default StudentDraggable;
