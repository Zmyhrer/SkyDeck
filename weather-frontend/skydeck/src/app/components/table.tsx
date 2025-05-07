import React from "react";
import ElementValue from "@/app/components/elementValue";
import { useRouter } from "next/navigation";

type Metric = {
  title: string;
  operator: string;
  value: number;
  arrowUp: boolean;
};

type TableRow = {
  [key: string]: string | number | boolean | Metric[] | undefined;
};

type TableProps = {
  headersKey: string[];
  headersLabel: string[];
  data: TableRow[];
};

const Table = ({ headersKey, headersLabel, data }: TableProps) => {
  const router = useRouter();

  const handleRowClick = (rowIndex: number) => {
    // Add 1 because your detail page seems to expect 1-based indexing
    router.push(`/decks/elements/${rowIndex + 1}`);
  };

  return (
    <div className="overflow-x-auto" style={{ height: "calc(100vh - 176px)" }}>
      <table className="min-w-max table-fixed border-spacing-0 border-separate">
        <thead className="z-2 bg-gray-800 sticky top-0">
          <tr className="text-white">
            {headersLabel.map((header, index) => (
              <th
                key={index}
                className={`py-2 px-4 text-center font-bold w-[100px] min-w-[100px] max-w-[100px] truncate ${
                  index === 0 ? "bg-gray-800 sticky left-0 z-3" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(rowIndex)}
            >
              {headersKey.map((header, index) => {
                const value = row[header];
                const isFirstColumn = index === 0;
                const firstColumnClass = isFirstColumn
                  ? "sticky left-0 bg-white z-1 border-l-2 border-t border-b border-r border-gray-200"
                  : "border border-gray-200";

                if (Array.isArray(value)) {
                  return value.map((metric, idx) => (
                    <td
                      key={`${header}-${idx}`}
                      className={`py-2 px-2 w-[150px] overflow-hidden text-center align-center ${firstColumnClass}`}
                    >
                      <ElementValue
                        title={metric.title}
                        value={metric.value}
                        arrowUp={metric.arrowUp}
                      />
                    </td>
                  ));
                }

                return (
                  <td
                    key={index}
                    className={`py-2 px-2 w-[150px] overflow-hidden text-center align-center ${firstColumnClass}`}
                  >
                    {typeof value === "boolean" ? (value ? "✅" : "❌") : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
