import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_BASE } from "../../utils/consts";
import { addTodo, deleteTodo, editTodo } from "./todosSlice";
import { Todo, TodoReq } from "./types";

export const getTodosAsync = createAsyncThunk("todos/getTodos", async () => {
  const { data } = await axios.get(API_BASE + `/tasks`);

  return data;
});

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number | string, { dispatch }) => {
    await axios.delete(API_BASE + `/task/delete/${id}`);

    dispatch(deleteTodo(id));
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (todo: TodoReq, { dispatch }) => {
    const { data } = await axios.post(API_BASE + `/task/create`, {
      title: todo.title,
      description: todo.description,
    });

    dispatch(addTodo(data.task));
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodo",
  async (todo: Todo, { dispatch }) => {
    await axios.post(API_BASE + `/task/update`, {
      id: todo.id,
      title: todo.title,
      description: todo.description,
    });

    dispatch(editTodo(todo));
  }
);
