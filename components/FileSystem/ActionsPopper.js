import {
  Popper,
  Paper,
  Typography,
  Divider,
  Box,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import RenameFolderDialog from "./Dialogs/RenameFolderDialog";
import RemoveFolderDialog from "./Dialogs/RemoveFolderDialog";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { fileListState } from "/recoil/FilesRecoil/filesState";
import { useRecoilState } from "recoil";
import useToast from "/hooks/useToast";

const ActionButton = styled("button")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "100%",
    height: "50px",
    fontSize: "18px",
    padding: "0 25px 0",
    color: "#0D1216",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    ":hover": {
      background: "#F2F3F5",
    },
  };
});

export default function ActionsPopper({ anchorEl, handleClose, folder }) {
  const open = Boolean(anchorEl);
  const [filesState, setFilesState] = useRecoilState(fileListState);
  const displayToast = useToast();
  const id = open ? "simple-popover" : undefined;

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      transition
    >
      {({ TransitionProps }) => (
        <Fade timeout={300} {...TransitionProps}>
          <div>
            <ClickAwayListener onClickAway={handleClose}>
              <Paper
                elevation={1}
                sx={{
                  minWidth: "400px",
                  borderRadius: "5px",
                }}
              >
                <Box
                  sx={{
                    padding: "30px",
                  }}
                >
                  <Typography variant="h4" component="h2">
                    {folder.title}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ color: "#A2A4A6", marginTop: "6px" }}
                  >
                    by Kevin Bueno
                  </Typography>
                </Box>

                <Divider sx={{ color: "#A2A4A6", marginTop: "-10px" }} />

                <Box marginTop="10px" paddingBottom="10px">
                  <RenameFolderDialog folder={folder} />
                  <ActionButton>
                    <Box
                      sx={{ width: "100%" }}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{ width: "100%" }}
                        display="flex"
                        alignItems="center"
                        gap="15px"
                      >
                        <DriveFileMoveOutlinedIcon sx={{ fontSize: "30px" }} />
                        Move
                      </Box>
                      <ArrowForwardIosOutlinedIcon sx={{ fontSize: "20px" }} />
                    </Box>
                  </ActionButton>
                  <ActionButton>
                    <ShareOutlinedIcon sx={{ fontSize: "30px" }} />
                    Share
                  </ActionButton>
                  <RemoveFolderDialog folder={folder} />
                </Box>
              </Paper>
            </ClickAwayListener>
          </div>
        </Fade>
      )}
    </Popper>
  );
}
