import React from "react";
import { List } from "@material-ui/core";
import Todo from "./Todo";

function TodoList({ todos }) {
  return (
    <List>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </List>
  );
}

export default TodoList;