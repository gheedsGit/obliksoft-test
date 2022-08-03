import React from "react";

import styles from "./TodoInput.module.scss";
import { useAppDispatch } from "../../redux/store";
import { addTodoAsync } from "../../redux/todos/asyncActions";

const TodoInput: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    const todo = { title, description };
    dispatch<any>(addTodoAsync(todo));
    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoInput;
