import React from "react";

import { useAppDispatch } from "../../../redux/store";
import { deleteTodoAsync } from "../../../redux/todos/asyncActions";
import TodoEdit from "./TodoEdit";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  id: number | string;
  title: string;
  description: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description }) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = React.useState(false);

  const handleEditMode = () => {
    setEditMode((editMode) => !editMode);
  };

  const handleDeleteTodo = () => {
    dispatch<any>(deleteTodoAsync(id));
  };

  return (
    <div className={styles.container}>
      {editMode ? (
        <TodoEdit
          editMode
          setEditMode={setEditMode}
          id={id}
          title={title}
          description={description}
        />
      ) : (
        <>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.descriptionBlock}>
            <span className={styles.descriptionText}>{description}</span>
            <div className={styles.buttonBlock}>
              <button className={styles.edit} onClick={handleEditMode}>
                Edit
              </button>
              <button className={styles.delete} onClick={handleDeleteTodo}>
                x
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
