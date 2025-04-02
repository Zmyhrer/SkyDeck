import React from "react";
import ElementValue from "@/app/components/elementValue";
import { useRouter } from "next/navigation";

type TableProps = {
  headers: string[];
  data: Array<{
    id: number;
    [key: string]:
      | string
      | number
      | boolean
      | { title: string; value: number; arrowUp: boolean };
  }>;
};

const Table = ({ headers, data }: TableProps) => {
  const router = useRouter();

  const handleRowClick = (rowIndex: number) => {
    router.push(`/decks/elements/${rowIndex}`);
  };

  return (
    <div>
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
                    index === 0 ? "bg-gray-800 sticky left-0 z-3" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                className="hover:bg-gray-100"
                onClick={() => handleRowClick(row.id)}
                key={row.id}
              >
                {headers.map((header, index) => {
                  const value = header in row ? row[header] : undefined;
                  const isFirstColumn = index === 0;
                  const firstColumnClass = isFirstColumn
                    ? "sticky left-0 bg-white z-1 border-l-2 border-t border-b border-r border-gray-200"
                    : "border border-gray-200";

                  return (
                    <td
                      key={index}
                      className={`py-2 px-2 bg-white text-center ${firstColumnClass}`}
                    >
                      {typeof value === "object" &&
                      value !== null &&
                      "title" in value &&
                      "value" in value ? (
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
