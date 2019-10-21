import React from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import StudentDraggable from "./components/StudentDraggable"

import mockData from "./mockData"
import TeamList from "./components/TeamList"

const App = () => {
  const [student, setStudent] = React.useState("")
  const [students, setStudents] = React.useState(mockData)
  const [numberOfTeams, setNumberOfTeams] = React.useState("" || 3)

  const renderStudents = () => {
    console.log(students)
    const noTeam = students.filter(student => student.team === 0) 
    return noTeam.map((student, index) => {
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      )
    }) 
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStudents([
      ...students,
      { id: students.length + 1, name: student, team: 0 }
    ])
  }

  const resetTeams = () => {
    return students.map(student => {
      console.log(student.team)
      student.team = 0
      setStudents([...students])
    })
  }
  
  const shuffleStudents = (arr) =>{
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while( 0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1

      temporaryValue = arr[currentIndex]
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = temporaryValue
    }
    return arr
  }

  const randomTeams = () =>{
    console.log(students)
    shuffleStudents(students);
    let studentsPerTeam = Math.ceil
    let counter = 1
    return students.map(student =>{ 
      student.team = counter
      if(counter == numberOfTeams){
        counter = 1
      }else{
        counter += 1
      }
      }
    )
  }
  
  const newTeams = () =>{
    randomTeams();
    setStudents([...students])
  }
  
 
  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const droppedStudent = students.find(
      student => student.id === result.draggableId
    )
    droppedStudent.team = +result.destination.droppableId
  }

  const createTeams = () => {
    if(numberOfTeams){
      let total = new Array(numberOfTeams).fill("1")
    let counter = 0
    
    return total.map(()=>{
      counter++
      return(
        <TeamList students={students} number={`${counter}`} />
      )
    })

    }else{
      return
    }
    
    
  }

  const handleNumberOfTeams = (event)=>{
    console.log(numberOfTeams)
    event.preventDefault()
    setNumberOfTeams(
      parseInt(event.target.value)
    )
  }

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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  value={student}
                  onChange={e => setStudent(e.target.value)}
                />
                <button>Add Student</button>
                
              </form>

              <form>
                Number of Teams:   <input type="text" onChange={event => setNumberOfTeams(parseInt(event.target.value))}></input>
              </form>
              
              
              <button onClick={()=>{resetTeams()}}>Reset</button>
              <button onClick={()=>{newTeams()}}>Random</button>
              {renderStudents()}
              <div className="separator-skew" />
            </div>
          )}
        </Droppable>
        

        <div className="teams-wrapper">
          {createTeams()}
        </div>
      </div>
    </DragDropContext>
    
  )
}

export default App
