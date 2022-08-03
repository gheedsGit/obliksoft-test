import { FC } from "react";

import { useAppDispatch } from "../../../redux/store";
import { deleteTodoAsync } from "../../../redux/todos/asyncActions";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  id: number | string;
  title: string;
  description: string;
}

const TodoItem: FC<TodoItemProps> = ({ id, title, description }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = () => {
    dispatch<any>(deleteTodoAsync(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.descriptionBlock}>
        <span className={styles.descriptionText}>{description}</span>
        <button className={styles.delete} onClick={handleDeleteTodo}>
          x
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
