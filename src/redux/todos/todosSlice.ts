import { getTodosAsync } from "./asyncActions";
import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "./types";

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo: Todo = action.payload;
      state.todos.push(todo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state) => {
      state.todos = [];
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.todos = action.payload.tasks;
    });
  },
});
export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
