import React from "react";
import ElementValue from "@/app/components/elementValue"; // Import ElementValue component

type TableProps = {
  headers: string[]; // Array of header names
  data: Array<{
    [key: string]:
      | string
      | number
      | boolean
      | { title: string; value: number; arrowUp: boolean };
  }>; // Data array with objects, where keys are the same as header values, including objects for "E" columns
};

const Table = ({ headers, data }: TableProps) => {
  const isElementValue = (
    value:
      | string
      | number
      | boolean
      | { title: string; value: number; arrowUp: boolean }
  ): value is { title: string; value: number; arrowUp: boolean } => {
    return (
      typeof value === "object" &&
      value !== null &&
      "title" in value &&
      "value" in value
    );
  };

  return (
    <div>
      {/* Applying dynamic height with 40px margin at the bottom */}
      <div
        className="overflow-x-auto"
        style={{ height: "calc(100vh - 176px)" }}
      >
        <table className="w-full border-spacing-0 border-separate">
          <thead className="z-2 bg-gray-800 sticky top-0">
            <tr className="text-white">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`py-2 px-4 text-center font-bold ${
                    index === 0 ? " bg-gray-800 sticky left-0 z-3" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, index) => {
                  const value = row[header];
                  const isFirstColumn = index === 0;

                  const firstColumnClass = isFirstColumn
                    ? "sticky left-0 bg-white z-1 border-l-2 border-t border-b border-r border-gray-200"
                    : "border border-gray-200";

                  return (
                    <td
                      key={index}
                      className={`py-2 px-2 bg-white text-center ${firstColumnClass}`}
                    >
                      {isElementValue(value) ? (
                        <ElementValue
                          title={value.title}
                          value={value.value}
                          arrowUp={value.arrowUp}
                        />
                      ) : typeof value === "boolean" ? (
                        value ? (
                          "✅"
                        ) : (
                          "❌"
                        )
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
