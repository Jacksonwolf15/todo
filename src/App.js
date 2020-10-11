import React, { useState } from "react";
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function App() {
  //Need state for list of tasks
  const [tasks, setTasks] = useState([])
  //Need state for the current value of each text input
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  
  
  //Need a function to add a task to the task list
  const handleAdd = () => {
    setTasks([
      ...tasks,
      {
        title: title,
        description: description,
        dueDate: dueDate,
      }])
  };

  //This is a component that will be reused to represent each individual task.
  //What props does each task need?
  const TodoItem = ({task}) => {
    //Need state to represent whether the task is checked off or not
    const [checked, setChecked] = useState(false)
    //Need a function to toggle whether the task is checked off or not
    const handleCheckOff = () => {setChecked(!checked)};
  
    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      const newArray = []
      tasks.forEach((i) => {
        if (i !== task) newArray.push(i);
      })
      setTasks(newArray)
    };

    if (checked) {
    return (
      <div style={{
        border: "1px solid black",
        color: "black",
        textAlign: "left",
        padding: "20px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
      }}>
        {/* The title, description, and due date should appear here. 
        Remember that what you want to display changes based on whether 
        the task is checked off or not */}
        <h1 align = "center">{task.title}</h1>
        <Button variant = "contained" color = "secondary" onClick={handleCheckOff}>Check off</Button>
        <Button variant = "contained" color = "secondary" onClick={handleDelete}>Delete</Button>
      </div>
    );}
    else {
      return (
      <div style={{
        border: "1px solid black",
        textAlign: "left",
        padding: "10px",
        color: "black",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
        margin: "5px"
      }}>
        <div>
          <h1 align = "center" style={{marginTop: "-10px"}}>{task.title}</h1>
          <h5>{task.dueDate}</h5>
          <p>{task.description}</p>
        </div>
        <Button variant = "contained" color = "secondary" style={{marginBottom: "5px"}} onClick={handleCheckOff}>Check off</Button>
        <Button variant = "contained" color = "secondary" onClick = {handleDelete}>Delete</Button>
      </div>
        )
    }
  };

  return (
    <div className = "App-header">
      <h1>To-Do List!</h1>
      {/* All of the text fields and their labels should go here */}
      <form style={{marginTop: "-30px"}}>
        <div>
      <label>
        {"Title: "}
        <TextField
          id="outlined-basic" 
          variant="outlined"
          background-color = "white"
          type = "text"
          style = {{backgroundColor: "white", marginBottom: "10px"}}
          value = {title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      </div>
      <div>
      <label>
        {"Due Date: "}
        <TextField
          id="outlined-basic" 
          variant="outlined"
          style = {{backgroundColor: "white", marginBottom: "10px"}}
          
          type = "text"
          value = {dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      </div>
      <div>
      <label>
        {"Description: "}
        <TextField
          id="outlined-basic" 
          variant="outlined"
          style = {{backgroundColor: "white", marginBottom: "10px"}}
          background-color = "white"
          type = "text"
          value = {description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      </div>
    </form>
      <Button variant = "contained" color = "secondary" style = {{margin: "8px"}} onClick={handleAdd}>Add Todo Item</Button>
      
      {/* All of the tasks should render here. How can we transform the 
      list of tasks into a list of components? */}
      {tasks.map((task) => (
          <TodoItem task={task} setTasks={setTasks} border-style = "solid" border-color = "white"/>
      ))}
      
    </div>
  );
}

