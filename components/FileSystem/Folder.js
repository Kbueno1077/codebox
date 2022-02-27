import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionsPopper from "./ActionsPopper";
import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

const FolderWrapper = styled("div")(({ theme }) => {
  return {
    width: "100%",
  };
});
const FolderButton = styled("button")(({ theme }) => {
  return {
    display: "flex",
    borderRadius: 10,
    width: "100%",

    alignItems: "center",
    justifyContent: "space-between",
    height: "75px",
    padding: "12px",
    color: "#0D1216",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    transition: "0.3s",
    "&:hover .actions": {
      transition: "0.3s",
      display: "block",
      visibility: "visible",
      opacity: 1,
    },
    ":hover": {
      background: "#F2F3F5",
    },
  };
});

const FolderIcon = styled("div")(({ theme }) => {
  return {
    height: "60px",
    width: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E6E8EC",
    borderRadius: 10,
  };
});

const FolderTitle = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    marginTop: "2px",
  };
});

const Actions = styled(Button)(({ theme }) => {
  return {
    display: "none",
    visibility: "hidden",
    opacity: 0,
    height: "40px",
    color: "#212121",
    border: "none",
    width: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",

    borderRadius: 10,

    ":hover": {
      background: "#E6E8EC",
    },
  };
});

export default function Folder({ title, elements, isEditable = true }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <FolderWrapper>
      <FolderButton>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          <FolderIcon>
            <FolderOpenIcon sx={{ fontSize: 25 }} />
          </FolderIcon>
          <FolderTitle>
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
            <Typography sx={{ fontWeight: "thin", color: "#989B9D" }}>
              {elements} elements
            </Typography>
          </FolderTitle>
        </Box>
        {isEditable && (
          <Actions className="actions" onClick={handleClick}>
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </Actions>
        )}
      </FolderButton>
      <ActionsPopper
        anchorEl={anchorEl}
        handleClose={handleClose}
        folder={{ title: title, elements: elements }}
      />
    </FolderWrapper>
  );
}
