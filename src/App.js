import React, { useState } from "react";
import TaskList from "./TaskList";
import noTaskImage from "./taskList.png";
import completedTasksImage from "./completedTasks.png";
import garbageCanImage from "./garbageCan.png";

// Created by: Alan Espana
// CS 247
// 5/10/2024
// First React App
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask.trim(), checked: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);

    if (newTasks[index].checked) {
      setTimeout(() => {
        handleDeleteTask(index);
      }, 4000);
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="taskListWindow">
      <div>
        <TaskList />
        <input
          className="enterBox"
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            // Enable or disable the button based on input value
            const isInputEmpty = e.target.value.trim() === "";
            const createButton = document.querySelector(".createButton");
            if (createButton) {
              createButton.disabled = isInputEmpty;
            }
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button
          className="createButton"
          onClick={handleAddTask}
          style={{
            backgroundColor: newTask ? "#00A3FF" : "#C4C4C4",
            color: newTask ? "#FFFFFF" : "#000000",
          }}
          disabled={!newTask}
        >
          Create
        </button>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{ display: "flex" }}
              className={task.text === newTask ? "newTask" : ""}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="checkSquare"
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleToggleTask(index)}
                />
                <span
                  style={{
                    marginRight: "10px",
                    textDecoration: task.checked ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <img
                  className="garbageCan"
                  src={garbageCanImage}
                  alt="Delete"
                  onClick={() => handleDeleteTask(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        {tasks.length === 0 ? (
          <div className="imageContainer">
            <img
              src={completedTasksImage}
              alt="All tasks completed"
              className="completedTasksImage"
            />
            <p className="imageText">All tasks completed!</p>
          </div>
        ) : (
          <div className="imageContainer">
            <img src={noTaskImage} alt="Tasks To-Do" className="noTaskImage" />
            <p className="imageText">Tasks To-Do.</p>
          </div>
        )}
      </div>  
    </div>
  );
};

export default App;