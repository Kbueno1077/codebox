import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import FilesApp from "/components/FileSystem/FilesApp";
import { Popper, ClickAwayListener } from "@mui/material";

const TagSpan = styled.span(({ theme }) => {
  if (theme.palette.mode === "light")
    return {
      height: "1em",
      marginBottom: "0.2em",
      marginLeft: "0.2rem"
    };
  else
    return {
      height: "1em",
      marginBottom: "0.7em",
      marginLeft: "0.5rem"
    };
});

const PillBox = styled(Box)(({ theme }) => {
  if (theme.palette.mode === "dark")
    return {
      background: theme.palette.background.silver,
      padding: "0.2em 0.5em 0.2em 0.2em",
      marginBottom: "0.2em",
      borderRadius: "5px"
    };
});

export default function FilesSystemPage() {
  const theme = useTheme();
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = event => {
    if (!anchorEl2) setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl2);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Navbar>
        <div className={styles.container}>
          <Head>
            <title>File System</title>
            <meta name="description" content="A file system example" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <FilesApp />
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <TagSpan>
                <PillBox>
                  <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                  />
                </PillBox>
              </TagSpan>
            </a>
          </footer>
        </div>
      </Navbar>
    </>
  );
}
