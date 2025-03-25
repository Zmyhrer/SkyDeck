import React from "react";
import Cell from "@/app/components/cell"; // Import the Cell component

// Define the RowProps type
type RowProps = {
  headers: string[]; // List of headers
  rowData: {
    [key: string]:
      | string
      | number
      | boolean
      | { title: string; value: number; arrow: boolean };
  }; // Row data with mixed types, including objects with 'title'
};

const Row = ({ headers, rowData }: RowProps) => {
  return (
    <tr>
      {headers.map((header, index) => {
        const isFirstColumn = index === 0;

        return (
          <Cell
            key={index} // Use a unique key for each Cell
            value={rowData[header]}
            isFirstColumn={isFirstColumn} // Pass first column styling logic
          />
        );
      })}
    </tr>
  );
};

export default Row;
