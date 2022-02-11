import React from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import TodoItem from "/components/Todo/TodoItem.js";
import TodoItemCreator from "/components/Todo/TodoItemCreator.js";
import TodoListStats from "/components/Todo/TodoListStats.js";
import {
  filteredTodoListState,
  filterState,
} from "/recoil/TodoRecoil/todoState";
import Paper from "@mui/material/Paper";
import { Container, Draggable } from "react-smooth-dnd";
import useToast from "/hooks/useToast";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const TodoWrapper = styled(Paper)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.todos.textColor,
    margin: "0 auto 0",
    borderRadius: "8px",
    maxWidth: "800px",
    background: theme.palette.todos.iframe,
    padding: "4.5rem 1.8rem 2.5rem",
    color: "#fff",
  };
});

const ItemTodoWrapper = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.palette.todos.wrapper,
    maxWidth: "600px",
    minWidth: "200px",
    width: "100%",
    color: theme.palette.todos.textColor,
    borderRadius: "8px",
    marginBottom: "10px",
    padding: "1.6rem",
  };
});

export default function TodoApp() {
  const [todoList, setTodoList] = useRecoilState(filteredTodoListState);
  const appliedFilter = useRecoilValue(filterState);
  const displayToast = useToast();
  const theme = useTheme();

  function applyDrop(dropResult) {
    if (appliedFilter === "Show All") {
      const { removedIndex, addedIndex, payload, element } = dropResult;
      if (removedIndex === null && addedIndex === null) return;

      const result = [...todoList];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      setTodoList(result);
    } else {
      displayToast(
        "Update positions only available in 'Show All' filter",
        "info"
      );
    }
  }

  return (
    <TodoWrapper elevation={2}>
      <TodoItemCreator />

      <ItemTodoWrapper>
        <Container onDrop={(e) => applyDrop(e)}>
          {todoList.length ? (
            todoList.map((todoItem, index) => {
              return appliedFilter === "Show All" ? (
                <Draggable key={todoItem.id}>
                  <TodoItem item={todoItem} />
                </Draggable>
              ) : (
                <TodoItem key={todoItem.id} dragable item={todoItem} />
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>No todos to show</h1>
          )}
        </Container>
      </ItemTodoWrapper>

      <TodoListStats />
      <Typography
        sx={{
          marginTop: 5,
          fontWeight: "lighter",
          fontSize: 12,
          color: theme.palette.todos.textColor,
        }}
      >
        Todos playground
      </Typography>
    </TodoWrapper>
  );
}
