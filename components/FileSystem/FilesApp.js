import React from "react";
import Folder from "./Folder";
import styled from "@emotion/styled";
import AddFolderDialog from "./Dialogs/AddFolderDialog";
import { Box, Grid, Button, Typography } from "@mui/material";
import { fileListState } from "/recoil/FilesRecoil/filesState";
import { useRecoilValue } from "recoil";

const FilesContainer = styled("div")(({ theme }) => {
  return {
    border: "1px solid #E6E8EC",
    height: "100vh",
    width: "100%",
    padding: "0 30px 0",
    marginTop: "-70px"
  };
});

const TitleWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "15px",
    gap: "15px",
    alignItems: "center"
  };
});

const Title = styled("h1")(({ theme }) => {
  return {
    fontSize: "40px"
  };
});

export default function FilesApp() {
  const filesList = useRecoilValue(fileListState);

  return (
    <FilesContainer>
      <TitleWrapper>
        <Title>Your Folders </Title>
        <AddFolderDialog />
      </TitleWrapper>
      <Grid container spacing={2}>
        {filesList.length ? (
          filesList.map((folder, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Folder title={folder.title} elements={folder.elements} />
            </Grid>
          ))
        ) : (
          <Typography sx={{ margin: "25px 22px 0", fontSize: "18px" }}>
            No directories here
          </Typography>
        )}
      </Grid>
    </FilesContainer>
  );
}
