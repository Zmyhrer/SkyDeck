import * as React from "react";
import { Box, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";

function createData(name, boolean, c1, c2) {
  return { name, boolean, c1, c2 };
}

const Item = styled(Paper)(({ theme, smallHeight }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1), // Padding to control size
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center", // Vertically center the content
  color: theme.palette.text.secondary,
  height: smallHeight ? "30px" : "auto", // Smaller height for category if specified
  flexGrow: 1, // Makes the Item take up available space inside the Box
}));

export default function SplitCellTable(props) {
  return (
    <Stack spacing={1}>
      {/* Render category with smaller height */}
      <Item smallHeight>{props.category}</Item>

      {/* Render value and boolean in a row layout and make them fill the space */}
      <Box display="flex" flexDirection={{ sm: "row" }} gap={1}>
        <Item>{props.value}</Item>
        <Item>
          {props.boolean ? (
            <ArrowCircleUpTwoToneIcon style={{ color: "green" }} />
          ) : (
            <ArrowCircleDownTwoToneIcon style={{ color: "red" }} />
          )}
        </Item>
      </Box>
    </Stack>
  );
}
