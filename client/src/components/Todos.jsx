import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import {
  getTodos,
  addTodo,
  editTodo,
  toggleTodo,
  removeTodo,
} from "../api/todo";

function Todos({ user, onLogout }) {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodoList(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!newTodo.trim()) return;

    try {
      const created = await addTodo(newTodo);
      setTodoList([...todoList, created]);
      setNewTodo("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    setError("");

    try {
      const updated = await toggleTodo(id);
      setTodoList(todoList.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (id, newTask) => {
    setError("");

    try {
      const updated = await editTodo(id, newTask);
      setTodoList(todoList.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError("");

    try {
      await removeTodo(id);
      setTodoList(todoList.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="todos-container">
      <div className="todos-header">
        <span>
          Logged in as: <strong>{user}</strong>
        </span>
        <button onClick={onLogout} className="logout-btn">
          Log Out
        </button>
      </div>

      <h1>Todo App</h1>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleAdd} className="todos-add-form">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todos-list">
        {todoList.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default Todos;
