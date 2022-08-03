import React from "react";

import { useAppDispatch } from "../../../../redux/store";
import { editTodoAsync } from "../../../../redux/todos/asyncActions";
import styles from "./TodoEdit.module.scss";

interface TodoEditProps {
  id: number | string;
  title: string;
  description: string;
  editMode: boolean;
  setEditMode: (flag: boolean) => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({
  id,
  title,
  description,
  editMode,
  setEditMode,
}) => {
  const [editedTitle, setEditedTitle] = React.useState(title);
  const [editedDescription, setEditedDescription] = React.useState(description);
  const dispatch = useAppDispatch();

  const handleEditTodo = () => {
    const editedTodo = {
      id,
      title: editedTitle,
      description: editedDescription,
    };
    dispatch<any>(editTodoAsync(editedTodo));
    setEditMode(!editMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBlock}>
        <input
          className={styles.inputTitle}
          name="editedTitle"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <input
          className={styles.inputDescription}
          name="editedDescription"
          size={20}
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </div>
      <button className={styles.edit} onClick={handleEditTodo}>
        Edited
      </button>
    </div>
  );
};

export default TodoEdit;
