import React from "react";
import Row from "@/app/components/row"; // Import Row component

type TableProps = {
  headers: string[]; // Array of header names
  data: Array<{
    [key: string]:
      | string
      | number
      | boolean
      | { title: string; value: number; arrow: boolean };
  }>; // Data array with objects, where keys are the same as header values, including objects for "E" columns
};

const Table = ({ headers, data }: TableProps) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr className="bg-gray-800 text-white">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`py-2 px-4 text-center font-bold ${
                    index === 0 ? "sticky left-0 bg-gray-800 z-10 " : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <Row key={rowIndex} headers={headers} rowData={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
