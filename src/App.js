import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import StudentDraggable from "./components/StudentDraggable";
import TeamList from "./components/TeamList";
import axios from "axios";

const App = () => {
  const [student, setStudent] = React.useState("");
  const [numberOfTeams, setNumberOfTeams] = React.useState("" || 3);
  const [updatedArr, setUpdatedArr] = React.useState(null);
  const [data, setData] = React.useState(false);

  useEffect(() => {
    axios
      .get("https://serene-sierra-85530.herokuapp.com/get-all-names")
      .then(res => {
        setData(res.data);
      });
  }, [updatedArr, numberOfTeams]);

  // Initial render of students, should update upon data changing

  const renderStudents = () => {
    const noTeam = data.filter(student => student.team_number == 0);
    return noTeam.map((student, index) => {
      return (
        <StudentDraggable
          key={student.id}
          teamListHandleUpdate={teamListHandleUpdate}
          setData={setData}
          student={student}
          index={index}
        />
      );
    });
  };

  // Handles the creation of new students
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`https://serene-sierra-85530.herokuapp.com/add-team-member`, {
        name: student,
        teamNumber: "0"
      })
      .then(response => {
        setData([...data, response.data]);
      });
  };

  // sets all students teams to 0 and updates the DB

  const resetTeams = () => {
    const newArray = [];
    data.map(student => {
      student.team = 0;
      return axios
        .put(
          `https://serene-sierra-85530.herokuapp.com/change-team-num/${student.name}`,
          { teamNumber: "0" }
        )
        .then(response => {
          newArray.push(response.data);
        });
    });
    setTimeout(() => setData(newArray), 3000);
    setTimeout(() => setUpdatedArr(newArray), 3000);
    setNumberOfTeams(0);
    setTimeout(() => setNumberOfTeams(3), 3000);
  };

  // SHUFFLES STUDENTS, UPDATES DB, and RERENDERS NEW TEAMS

  const shuffleStudents = arr => {
    let currentIndex = arr.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  };

  const randomTeams = () => {
    shuffleStudents(data);
    const newArray = [];
    let counter = 1;
    data.map(student => {
      axios
        .put(
          `https://serene-sierra-85530.herokuapp.com/change-team-num/${student.name}`,
          { name: student, teamNumber: `${counter.toString()}` }
        )
        .then(response => {
          console.log(response.data);
          newArray.push(response.data);
        });
      if (counter == numberOfTeams) {
        counter = 1;
      } else {
        counter += 1;
      }
      console.log("NEW ARRAY", newArray);
      setData(...newArray);
      setNumberOfTeams(0);

      setTimeout(() => setNumberOfTeams(3), 5000);
    });
  };

  const newTeams = () => {
    randomTeams();
  };

  // Handles manual changing of student teams.

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const droppedStudent = data.find(
      student => student.id === result.draggableId
    );
    droppedStudent.team = +result.destination.droppableId;
    setTimeout(() => window.location.reload(), 1000);
  };

  // Creates the displayed "Teams" on page.

  const createTeams = () => {
    if (data) {
      let total = new Array(numberOfTeams).fill("1");
      let counter = 0;
      return total.map(() => {
        counter++;
        return (
          <TeamList
            updateData={teamListHandleUpdate}
            students={data}
            number={`${counter}`}
          />
        );
      });
    } else {
      return null;
    }
  };

  // Functions to handle updates from other pages

  const teamListHandleUpdate = arr => {
    setData(
      data.filter(student => {
        return student.name !== arr.name;
      })
    );

    setUpdatedArr(data);
    setData(updatedArr);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable droppableId={"0"}>
          {provided => (
            <div
              className="left-student-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              <form onSubmit={handleSubmit} className="add-student">
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  value={student}
                  onChange={e => setStudent(e.target.value)}
                />
                <button className="student-btn">Add Student</button>
              </form>

              <button
                onClick={() => {
                  resetTeams();
                }}
              >
                Reset
              </button>
              <button onClick={newTeams}>Random</button>
              {data ? renderStudents() : null}
              <div className="separator-skew" />
            </div>
          )}
        </Droppable>

        <div className="teams-wrapper">{createTeams()}</div>
      </div>
    </DragDropContext>
  );
};

export default App;
