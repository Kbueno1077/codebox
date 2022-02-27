import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import TodoItem from "/components/Todo/TodoItem.js";
import TodoItemCreator from "/components/Todo/TodoItemCreator.js";
import TodoListStats from "/components/Todo/TodoListStats.js";
import { filterState, todoListState } from "/recoil/TodoRecoil/todoState";
import Paper from "@mui/material/Paper";
import { Container, Draggable } from "react-smooth-dnd";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { swapArrayElements } from "/helpers/swapArrayElements";
import styles from "../..//styles/Home.module.css";

const TodoWrapper = styled(Paper)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.todos.textColor,
    margin: "0 auto 0",
    borderRadius: "8px",
    maxWidth: "700px",
    width: "100%",
    background: theme.palette.todos.iframe,
    padding: "4.5rem 1.8rem 2.5rem",
    color: "#fff"
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
    padding: "1.6rem"
  };
});

export default function TodoApp() {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const appliedFilter = useRecoilValue(filterState);
  const [filteredTodos, setFilteredTodos] = React.useState(todoList);
  const theme = useTheme();

  React.useEffect(() => {
    switch (appliedFilter) {
      case "Show Completed":
        setFilteredTodos(todoList.filter(item => item.isComplete));
        break;
      case "Show Uncompleted":
        setFilteredTodos(todoList.filter(item => !item.isComplete));
        break;
      default:
        setFilteredTodos(todoList);
        break;
    }
  }, [todoList, appliedFilter]);

  function applyDrop(dropResult) {
    const { removedIndex, addedIndex, payload, element } = dropResult;
    if (removedIndex === null && addedIndex === null) return;

    let rIndex = todoList[filteredTodos[removedIndex].order].order;
    let aIndex = todoList[filteredTodos[addedIndex].order].order;

    let result = [...todoList];

    if (aIndex !== null && rIndex !== null) {
      swapArrayElements(result, aIndex, rIndex);
    }

    result = result.map((item, index) => {
      return { ...item, order: index };
    });

    setTodoList(result);
  }

  return (
    <TodoWrapper elevation={2}>
      <TodoItemCreator />

      <ItemTodoWrapper>
        <Container onDrop={e => applyDrop(e)}>
          {filteredTodos.length ? (
            filteredTodos.map((todoItem, index) => {
              return (
                <Draggable key={todoItem.id}>
                  <TodoItem item={todoItem} />
                </Draggable>
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
          color: theme.palette.todos.textColor
        }}
      >
        Todos playground
      </Typography>
    </TodoWrapper>
  );
}
