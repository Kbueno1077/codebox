import { useRecoilValue } from "recoil";
import { statsState } from "/recoil/TodoRecoil/todoState";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StatsTodoWrapper = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.palette.todos.wrapper,
    maxWidth: "600px",
    minWidth: "200px",
    width: "100%",
    borderRadius: "8px",
    color: theme.palette.todos.textColor,
    padding: "0.8rem 1.8rem",
  };
});
export default function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(statsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <StatsTodoWrapper>
      <span>Stats: </span>
      <Box display="flex" justifyContent="center">
        <ul>
          <li>Total items: {totalNum}</li>
          <li>Items completed: {totalCompletedNum}</li>
          <li>Items not completed: {totalUncompletedNum}</li>
          <li>Percent completed: {formattedPercentCompleted}</li>
        </ul>
      </Box>
    </StatsTodoWrapper>
  );
}
