import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
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

const RenameBtn = styled(Button)(({ theme }) => {
  return {
    padding: "0 20px 0",
    height: "40px",
    background: "#E6E8EC",
    color: "#212121",
    textTransform: "none",
    transform: "0.3s",
    marginTop: "15px",

    ":hover": {
      background: "#E1E4E7",
    },
  };
});

const FolderNameInput = styled("input")(({ theme }) => {
  return {
    width: "100%",
    minWidth: "450px",
    borderRadius: "5px",
    border: "1px solid #E1E4E7",
    outline: "none",
    height: "40px",
    paddingLeft: "10px",

    "@media (max-width: 600px)": {
      width: "100%",
      minWidth: "0px",
    },

    ":focus": {
      border: "1px solid #737476",
    },
  };
});

export default function AddFolderDialog({ folder }) {
  const [open, setOpen] = React.useState(false);
  const [filesState, setFilesState] = useRecoilState(fileListState);
  const [value, setValue] = React.useState("");
  const displayToast = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RenameFolder = () => {
    let canRename = true;
    const newArrayRenamed = filesState.map((item) => {
      if (item.title === value) {
        canRename = false;
        return item;
      } else {
        if (item.title === folder.title) return { ...item, title: value };
      }
    });

    if (canRename) {
      setFilesState(newArrayRenamed);
      displayToast(`Folder renamed to '${value.trim()}' `, "default");
      handleClose();
    } else
      displayToast(
        `Cannot rename folder to '${value.trim()}', it already exists `,
        "default"
      );
  };

  return (
    <Box
      sx={{
        "@media (max-width: 510px)": {
          width: "100%",
        },
      }}
    >
      <ActionButton onClick={handleClickOpen}>
        <ModeEditOutlineOutlinedIcon sx={{ fontSize: "30px" }} />
        Rename
      </ActionButton>
      <Zoom in={open} style={{ transitionDelay: open ? "1000ms" : "0ms" }}>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            sx={{ borderRadius: "20px" }}
          >
            <DialogTitle id="form-dialog-title" sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px" }}
              >
                Rename Folder
              </Typography>
            </DialogTitle>

            <DialogContent>
              <Typography
                sx={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Rename this folder
              </Typography>

              <FolderNameInput
                value={value || folder.title}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Re-Assign a name to your new folder"
                id="Folder_rename"
                aria-describedby="New folder name"
                label="Email Address"
              />
            </DialogContent>

            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "18px",
                padding: "0 22px 0",
              }}
            >
              <RenameBtn
                fullWidth
                disabled={!value.trim()}
                onClick={RenameFolder}
              >
                Rename Folder
              </RenameBtn>
            </DialogActions>
          </Dialog>
        </div>
      </Zoom>
    </Box>
  );
}
