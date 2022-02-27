import React from "react";
import Image from "next/image";
import styles from "../..//styles/Home.module.css";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";

const TagCode = styled.code(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.silver,
    color: theme.palette.text.black,
    borderRadius: "5px",
    padding: "0.75rem",
    fontSize: "1.1rem",
    fontFamily:
      "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"
  };
});

function MainContent() {
  const theme = useTheme();

  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">CodeBox!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing <TagCode>pages/index.js</TagCode>
      </p>

      <div className={styles.grid}>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          className={styles.card}
        >
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h2>Deploy &rarr;</h2>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div>
    </>
  );
}

export default MainContent;
