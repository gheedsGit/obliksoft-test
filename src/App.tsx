import React from "react";

import styles from "./App.module.scss";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useAppDispatch } from "./redux/store";
import { getTodosAsync } from "./redux/todos/asyncActions";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch<any>(getTodosAsync());
  }, []);

  return (
    <div className={styles.container}>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
