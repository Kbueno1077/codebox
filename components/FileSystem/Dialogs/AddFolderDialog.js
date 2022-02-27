import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { fileListState } from "/recoil/FilesRecoil/filesState";
import { useRecoilState } from "recoil";
import useToast from "/hooks/useToast";

const AddFolder = styled(Button)(({ theme }) => {
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

export default function AddFolderDialog() {
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

  const createFolder = () => {
    if (!filesState.filter((item) => item.title === value).length) {
      setFilesState([...filesState, { title: value.trim(), elements: 0 }]);
      setValue("");
      displayToast(`Folder '${value.trim()}' created`, "default");
      setOpen(false);
    } else {
      displayToast(`Folder '${value.trim()}' already exist`, "default");
    }
  };

  return (
    <Box
      sx={{
        "@media (max-width: 510px)": {
          width: "100%",
        },
      }}
    >
      <AddFolder
        sx={{
          "@media (max-width: 510px)": {
            width: "100%",
            marginTop: "-20px",
            marginBottom: "20px",
          },
        }}
        onClick={handleClickOpen}
      >
        Create folder
      </AddFolder>
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
                Create a new folder
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
                Folder name
              </Typography>

              <FolderNameInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Assign a name to your new folder"
                id="Folder_name"
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
              <AddFolder
                fullWidth
                disabled={!value.trim()}
                onClick={createFolder}
              >
                Create Folder
              </AddFolder>
            </DialogActions>
          </Dialog>
        </div>
      </Zoom>
    </Box>
  );
}
