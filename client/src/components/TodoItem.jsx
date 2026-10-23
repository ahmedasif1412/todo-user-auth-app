import { useState } from "react";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.task);

  const handleSave = () => {
    if (draft.trim() && draft !== todo.task) {
      onEdit(todo._id, draft);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(todo.task);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <span className={todo.isFinished ? "todo-task todo-finished" : "todo-task"}>
        {todo.task}
      </span>
      <button onClick={() => onToggle(todo._id)}>
        {todo.isFinished ? "Undo" : "Finished"}
      </button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
