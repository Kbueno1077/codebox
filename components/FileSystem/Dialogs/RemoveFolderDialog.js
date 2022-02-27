import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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

const RemoveBtn = styled(Button)(({ theme }) => {
  return {
    padding: "0 20px 0",
    height: "40px",
    background: "#FF4407",
    color: "#F2F3F5",
    textTransform: "none",
    transform: "0.3s",
    marginTop: "15px",

    ":hover": {
      background: "#BF3507",
    },
  };
});

const CancelBtn = styled(Button)(({ theme }) => {
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

export default function AddFolderDialog({ folder }) {
  const [open, setOpen] = React.useState(false);
  const [filesState, setFilesState] = useRecoilState(fileListState);
  const displayToast = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeFolder = () => {
    setFilesState(filesState.filter((item) => item.title !== folder.title));
    displayToast(`Removed '${folder.title}'`);
    handleClose();
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
        <DeleteOutlineIcon sx={{ fontSize: "30px" }} />
        Remove
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
                Remove Folder
              </Typography>
            </DialogTitle>

            <DialogContent>
              <Typography>
                Are you sure you want to remove this folder?
              </Typography>
            </DialogContent>

            <DialogActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "18px",
                  padding: "0 22px 0",
                  width: "100%",
                  gap: "15px",

                  "@media (max-width: 420px)": {
                    display: "block",
                  },
                }}
              >
                <CancelBtn fullWidth onClick={handleClose}>
                  Cancel
                </CancelBtn>

                <RemoveBtn fullWidth onClick={removeFolder}>
                  Remove Folder
                </RemoveBtn>
              </Box>
            </DialogActions>
          </Dialog>
        </div>
      </Zoom>
    </Box>
  );
}
