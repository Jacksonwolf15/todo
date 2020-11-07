import React, { useState } from "react";
import './App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { useSpring, animated, interpolate, useTransition } from "react-spring";

export default function App() {
  //Need state for list of tasks
  const [tasks, setTasks] = useState([])
  //Need state for the current value of each text input
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  
  const {o, xyz, color} = useSpring({
    from: {o: 0, xyz: [0, 0, 0], color: "pink"},
    o: 1,
    xyz: [10, 20, 20],
    color: 'white',
    config: {duration: 500}
  })
  
  //Need a function to add a task to the task list
  const handleAdd = () => {
    setTasks([
      ...tasks,
      {
        title: title,
        description: description,
        dueDate: dueDate,
      }])
      setTitle("");
      setDescription("")
      setDueDate("")
  };

  //This is a component that will be reused to represent each individual task.
  //What props does each task need?
  const TodoItem = ({task}) => {
    //Need state to represent whether the task is checked off or not
    const [checked, setChecked] = useState(false);
    //Need a function to toggle whether the task is checked off or not
    const handleCheckOff = () => {setChecked(!checked)};
    const [deleted, setDeleted] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    })
  
    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      setDeleted(!deleted);
      const newArray = []

      tasks.forEach((i) => {
        if (i !== task) newArray.push(i);
      })
      setTasks(newArray)
    };

    if (checked) {
    return (
      <div onClick={() => setFlipped(!flipped)}>
        <animated.div class = "card" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
      <Card 
      style={{
        border: "1px solid black",
        color: "black",
        textAlign: "left",
        padding: "20px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
      }} checked={checked}>
        
        <CardContent>
        {/* The title, description, and due date should appear here. 
        Remember that what you want to display changes based on whether 
        the task is checked off or not */}
        
        <h1 align = "center">{task.title}</h1>
        </CardContent>
        <CardActions>
          <Button variant = "contained" color = "secondary" onClick={handleCheckOff}>Check off</Button>
          <Button variant = "contained" color = "secondary" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
      </animated.div>
      <animated.div class = "card" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
      <Card 
      style={{
        border: "1px solid black",
        color: "black",
        textAlign: "left",
        padding: "20px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
      }} checked={checked}>
        
        <CardContent>
        {/* The title, description, and due date should appear here. 
        Remember that what you want to display changes based on whether 
        the task is checked off or not */}
        
        <h1 align = "center">{task.title}</h1>
        </CardContent>
        <CardActions>
          <Button variant = "contained" color = "p" onClick={handleCheckOff}>Check off</Button>
          <Button variant = "contained" color = "secondary" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
      </animated.div>
      </div>
    );}
    else {
      return (
<div onClick={() => setFlipped(!flipped)}>
<animated.div class = "card" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
      <Card 
      style={{
        border: "1px solid black",
        textAlign: "left",
        padding: "10px",
        color: "black",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
        marginTop: "35px",
        marginBottom: "-10px"
      }} checked={checked}>
        
        <CardContent>
          <h1 align = "center" style={{marginTop: "-10px"}}>{task.title}</h1>
          <h5 style={{marginTop: "-10px"}}>{task.dueDate}</h5>
          <p style={{marginTop: "-10px"}}>{task.description}</p>
        </CardContent>
        <CardActions>
          <Button variant = "contained" color = "secondary" style={{marginBottom: "5px"}} onClick={handleCheckOff}>Check off</Button>
          <Button variant = "contained" color = "secondary" onClick = {handleDelete}>Delete</Button>
        </CardActions>
      </Card>
      </animated.div>
      <animated.div class = "card" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
      <Card 
      style={{
        border: "1px solid black",
        textAlign: "left",
        padding: "10px",
        color: "black",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        background: "white",
        marginTop: "35px",
        marginBottom: "-10px"
      }} checked={checked}>
        
        <CardContent>
          <h1 align = "center" style={{marginTop: "-10px"}}>{task.title}</h1>
          <h5 style={{marginTop: "-10px"}}>{task.dueDate}</h5>
          <p style={{marginTop: "-10px"}}>{task.description}</p>
        </CardContent>
        <CardActions>
          <Button variant = "contained" color = "primary" style={{marginBottom: "5px"}} onClick={handleCheckOff}>Check off</Button>
          <Button variant = "contained" color = "primary" onClick = {handleDelete}>Delete</Button>
        </CardActions>
      </Card>
      </animated.div>
      </div>
        )
    }
  };

  return (
    <div className = "App-header">
    <animated.div style={{
      // If you can, use plain animated values like always, ...
      // You would do that in all cases where values "just fit"
      color,
      // Unless you need to interpolate them
      background: o.interpolate(o => `rgba(210, 57, 77, ${o})`),
      // Which works with arrays as well
      transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
      // If you want to combine multiple values use the "interpolate" helper
      border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
      // You can also form ranges, even chain multiple interpolations
      padding: o.interpolate({range: [0, 0.5, 1], output: [0, 0, 5]}).interpolate(o => `${o}%`),
      // Interpolating strings (like up-front) through ranges is allowed ...
      borderColor: o.interpolate({range: [0, .5], output: ['red', '#282c34']}),
      // There's also a shortcut for plain, optionless ranges ...
      opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
    }} >

      <h1>To-Do List!</h1>
      {/* All of the text fields and their labels should go here */}
      <form style={{marginTop: "-30px"}}>
        <div>
      <label>
        {"Title: "}
        <TextField 
          color="secondary"
          size = "small"
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
          color="secondary" 
          size = "small"
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
          color="secondary" 
          size = "small"
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
    
      <Button variant = "contained" color = "primary" style = {{margin: "8px", left: "100px"}} onClick={handleAdd}>Add Todo Item</Button>
      </animated.div>
      
      
      {tasks.map((task) => (
        <div align="center" style={{ height: tasks.length * 190}}>
          <TodoItem task={task} setTasks={setTasks} border-style = "solid" border-color = "white"/>
        </div>
      ))}

    </div>
    
  );
}

