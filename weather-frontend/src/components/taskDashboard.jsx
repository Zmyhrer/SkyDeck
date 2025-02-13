import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SplitCell from "./splitCell";
import { useState, useEffect } from "react";

const rows = Array(20)
  .fill()
  .map((_, id) => ({
    id: id + 1,
    name: "Example Name",
    boolean: true,
    c: [10, 20, 30, 40, 50, 60, 70],
    v: [true, false, true, false, true, false, true],
    t: Array(7).fill("Temp"),
  }));

const headCells = [
  { id: "name", label: "Dessert", align: "left" },
  { id: "boolean", label: "Boolean", align: "center" },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `c${i + 1}`,
    label: `C${i + 1}`,
    align: "center",
  })),
];

export default function EnhancedTable() {
  const [tableHeight, setTableHeight] = useState(0);

  // Calculate available space when the component mounts or when the window resizes
  useEffect(() => {
    const calculateTableHeight = () => {
      const headerHeight = 64; // Adjust if needed for Paper or other UI elements
      const remainingHeight = window.innerHeight - headerHeight;
      setTableHeight(remainingHeight);
    };

    calculateTableHeight(); // Initial calculation
    window.addEventListener("resize", calculateTableHeight); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", calculateTableHeight);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // full height of the viewport
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: tableHeight, // Dynamically set the max height based on available space
          }}
        >
          <Table sx={{ minWidth: 750 }} size="medium" align="center">
            {/* Sticky Table Header */}
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 2,
              }}
            >
              <TableRow>
                {headCells.map(({ id, label, align }) => (
                  <TableCell
                    key={id}
                    align={align}
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">
                    {row.boolean ? "True" : "False"}
                  </TableCell>
                  {row.c.map((cell, i) => (
                    <TableCell key={i} align="center">
                      <SplitCell
                        category={row.t[i]}
                        value={cell}
                        boolean={row.v[i]}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
