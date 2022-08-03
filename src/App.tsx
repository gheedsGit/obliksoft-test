import React from "react";
import { useSelector } from "react-redux";

import "./App.scss";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./redux/store";
import { getTodosAsync } from "./redux/todos/asyncActions";

function App() {
  const dispatch = useAppDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);
  React.useEffect(() => {
    dispatch<any>(getTodosAsync());
  }, []);

  return (
    <div className="App">
      <button onClick={() => console.log(todos)}>ss</button>
    </div>
  );
}

export default App;
