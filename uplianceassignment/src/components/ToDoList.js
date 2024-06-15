import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../Styles/ToDoList.css";

const initialTasks = [
  { id: "1", content: "Task 1" },
  { id: "2", content: "Task 2" },
  { id: "3", content: "Task 3" },
  { id: "4", content: "Task 4" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ToDoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );
    setTasks(reorderedTasks);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = { id: tasks.length + 1, content: newTask };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="to-do-list-container">
      <h1>ToDo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="to-do-list">
          {(provided) => (
            <ul
              className="to-do-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      className="task-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{task.content}</span>
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ToDoList;
