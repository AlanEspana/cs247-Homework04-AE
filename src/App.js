import React, { Component } from "react";
import TaskList from "./TaskList";
import noTaskImage from "./taskList.png";
import completedTasksImage from "./completedTasks.png";
import garbageCanImage from "./garbageCan.png";

// Created by: Alan Espana
// CS 247
// 5/24/2024
// First React App (class based)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
    };
  }

  handleAddTask = () => {
    if (this.state.newTask.trim() !== "") {
      this.setState((prevState) => ({
        tasks: [
          ...prevState.tasks,
          { text: this.state.newTask.trim(), checked: false },
        ],
        newTask: "",
      }));
    }
  };

  handleToggleTask = (index) => {
    const newTasks = [...this.state.tasks];
    newTasks[index].checked = !newTasks[index].checked;
    this.setState({ tasks: newTasks });

    if (newTasks[index].checked) {
      setTimeout(() => {
        this.handleDeleteTask(index);
      }, 4000);
    }
  };

  handleDeleteTask = (index) => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);
    this.setState({ tasks: newTasks });
  };

  handleKeyPress = (e) => {
    if ( e.key === "Enter") {
      this.handleAddTask();
    }
  };

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });

    // Enable or disable the button based on input value
    const isInputEmpty = e.target.value.trim() === "";
    const createButton = document.querySelector(".createButton");
    if (createButton) {
      createButton.disabled = isInputEmpty;
    }
  };

  render() {
    return (
      <div className="taskListWindow">
        <div>
          <TaskList />
          <input
            className="enterBox"
            type="text"
            placeholder="Enter a new task"
            value={this.state.newTask}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className="createButton"
            onClick={this.handleAddTask}
            style={{
              backgroundColor: this.state.newTask ? "#00A3FF" : "#C4C4C4",
              color: this.state.newTask ? "#FFFFFF" : "#000000",
            }}
            disabled={!this.state.newTask}
          >
            Create
          </button>
          <ul>
            {this.state.tasks.map((task, index) => (
              <li
                key={index}
                style={{ display: "flex" }}
                className={task.text === this.state.newTask ? "newTask" : ""}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="checkSquare"
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => this.handleToggleTask(index)}
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
                    onClick={() => this.handleDeleteTask(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
          {this.state.tasks.length === 0 ? (
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
              <img
                src={noTaskImage}
                alt="Tasks To-Do"
                className="noTaskImage"
              />
              <p className="imageText">Tasks To-Do.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;