import React from "react";
import styled from "@emotion/styled";

const TagCode = styled.code(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.silver,
    color: theme.palette.text.black,
    borderRadius: "5px",
    padding: "0.75rem",
    fontSize: "1.1rem",
    fontFamily:
      "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
  };
});

export default function Code({ codeText }) {
  return <TagCode>{codeText}</TagCode>;
}
