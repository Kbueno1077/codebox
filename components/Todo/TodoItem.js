import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "/recoil/TodoRecoil/todoState";
import DeleteDialog from "./DeleteDialog";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import useToast from "/hooks/useToast";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

const TodoEditInput = styled("input", {
  shouldForwardProp: (propName) => propName !== "isCompleted",
})(({ theme, isCompleted }) => {
  return {
    backgroundColor: "transparent",
    maxWidth: "200px",
    minWidth: "200px",
    color: theme.palette.todos.background_dark,
    fontSize: "1.8rem",
    width: "100%",
    color: theme.palette.todos.textColor,
    border: "none",
    outline: "none",
    textDecoration: isCompleted ? "line-through" : "none",
  };
});

const TodoBox = styled("div", {
  shouldForwardProp: (propName) => propName !== "LastTodo",
})(({ theme, LastTodo }) => {
  return {
    backgroundColor: theme.palette.todos.todoWrapper,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.todos.textColor,
    alignItems: "center",
    padding: "10px",
    cursor: "grab",
    marginBottom: LastTodo ? 0 : "15px",
  };
});

export default function TodoItem({ item, draggable }) {
  const theme = useTheme();
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);
  const displayToast = useToast();

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });
    setTodoList(newList);
    displayToast(`Updated todo ${index + 1}`, "default");
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);

    displayToast(
      `Todo ${index + 1} ${!item.isComplete ? "completed" : "not completed"}`,
      "default"
    );
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
    displayToast(`Deleted todo  ${index + 1}`, "default");
  };

  return (
    <>
      <DeleteDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        onDelete={deleteItem}
      />
      <TodoBox
        draggable={draggable}
        onDragStart={() => {
          displayToast("Cannot drag element in this filter", "info");
        }}
        LastTodo={index === todoList.length - 1}
      >
        <Box display="flex" alignItems="center">
          <MoreVertIcon
            sx={{ fontSize: 30, marginRight: "4px", marginLeft: "-8px" }}
          />
          <TodoEditInput
            isCompleted={item.isComplete}
            type="text"
            value={item.text}
            onChange={editItemText}
          />
        </Box>

        <Box display="flex">
          <Tooltip title={item.isComplete ? "Mark as undone" : "Mark as done"}>
            <Checkbox
              checked={item.isComplete}
              onChange={toggleItemCompletion}
              sx={{
                color: theme.palette.todos.background,
                "&.Mui-checked": {
                  color: theme.palette.todos.background_dark,
                },
                ":hover": {
                  background: theme.palette.todos.filterHover,
                },
              }}
            />
          </Tooltip>

          <Tooltip title="Delete todo">
            <IconButton onClick={handleOpenDelete}>
              <DeleteIcon sx={{ color: "silver" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </TodoBox>
    </>
  );
}

TodoItem.propTypes = {
  item: PropTypes.any,
  draggable: PropTypes.bool,
};

TodoItem.defaultProps = {
  item: {},
  draggable: false,
};
