import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos);

  return (
    <div className={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
        />
      ))}
    </div>
  );
};

export default TodoList;
