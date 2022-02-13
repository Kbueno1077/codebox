import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelBtn = styled(Button)(({ theme }) => {
  return {
    color: theme.palette.todos.gray_btn,
    ":hover": {
      background: theme.palette.todos.hover_graybtn,
    },
  };
});

export default function DeleteDialog({ open, handleClose, onDelete }) {
  const doDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper sx={{ padding: 2 }}>
          <DialogTitle id="responsive-dialog-title">Delete Todo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this todo?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ marginTop: 2 }}>
            <CancelBtn autoFocus onClick={handleClose}>
              Cancel
            </CancelBtn>
            <Button color="error" onClick={doDelete} autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}
