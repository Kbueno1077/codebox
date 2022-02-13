import { useSetRecoilState, useRecoilState } from "recoil";
import { useState } from "react";
import { todoListState, filterState } from "/recoil/TodoRecoil/todoState";
import styled from "@emotion/styled";
import { Box, Button, MenuItem, Menu, Stack, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useToast from "/hooks/useToast";
import { useTheme } from "@mui/material/styles";

const CreateTodoWrapper = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.palette.todos.wrapper,
    maxWidth: "600px",
    minWidth: "200px",
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
    color: theme.palette.todos.textColor,
    padding: "1.8rem",
  };
});

export const TodoInput = styled.input(({ theme }) => {
  return {
    border: `3px solid ${theme.palette.todos.background}`,
    borderRadius: "10px",
    paddingLeft: "10px",
    outline: "none",
    maxWidth: "250px",
    width: "100%",
    marginRight: "10px",
  };
});

const TodoButton = styled(Button)(({ theme }) => {
  return {
    backgroundColor: theme.palette.todos.background,
    borderRadius: "20px",

    ":hover": {
      backgroundColor: theme.palette.todos.background_dark,
    },
  };
});

const FilterButton = styled(Button)(({ theme }) => {
  return {
    borderRadius: "20px",
    borderColor: theme.palette.todos.background,
    color: theme.palette.todos.background_dark,

    ":hover": {
      borderColor: theme.palette.todos.background_dark,
      color: theme.palette.todos.background_dark,
      background: theme.palette.todos.filterHover,
    },
  };
});

export default function TodoItemCreator() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useRecoilState(filterState);
  const setTodoList = useSetRecoilState(todoListState);
  const displayToast = useToast();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const changeFilter = (selected) => {
    setFilter(selected);
    setAnchorEl(null);
  };

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setTodoList((oldTodoList) => [
        ...oldTodoList,
        {
          id: getId(),
          text: inputValue,
          isComplete: false,
          order: oldTodoList.length,
        },
      ]);
      displayToast("Added todo", "default");
    }
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <CreateTodoWrapper>
      <Box display="flex" justifyContent="space-between" marginBottom={3}>
        <TodoInput
          placeholder="New Todo"
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        <TodoButton variant="contained" onClick={addItem}>
          Add Todo
        </TodoButton>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <FilterButton
            variant="outlined"
            id="menu-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Filters: {filter}
          </FilterButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => changeFilter("Show All")}>All</MenuItem>
            <MenuItem onClick={() => changeFilter("Show Completed")}>
              Completed
            </MenuItem>
            <MenuItem onClick={() => changeFilter("Show Uncompleted")}>
              Uncompleted
            </MenuItem>
          </Menu>
          {filter !== "Show All" && (
            <Tooltip title="Todos cannot be dragged in this filter option">
              <HelpOutlineIcon
                sx={{
                  fontSize: 18,
                  cursor: "pointer",
                  color: theme.palette.todos.helpIcon,
                }}
              />
            </Tooltip>
          )}
        </Stack>
      </Box>
    </CreateTodoWrapper>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
