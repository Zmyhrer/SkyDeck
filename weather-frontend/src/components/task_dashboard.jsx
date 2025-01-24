import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

function TaskDashboard() {
  // Sample data for the table
  const defaultData = [
    {
      Task: "Hot Weather",
      Result: false,
      C1: 24,
      C2: 100,
      C3: 120,
      C4: 50,
      C5: 80,
      C6: 90,
      C7: 100,
    },
    {
      Task: "Cold Weather",
      Result: true,
      C1: 34,
      C2: 100,
      C3: 120,
      C4: 50,
      C5: 80,
      C6: 90,
      C7: 100,
    },
  ];

  const header_titles = [
    "Task",
    "Result",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
  ];

  // Column definition for the table
  const columnHelper = createColumnHelper();
  const columns = header_titles.map((title) => {
    if (title === "Task") {
      // Color the Task column based on the Result column value
      return columnHelper.accessor(title, {
        id: title,
        header: () => title,
        cell: (info) => {
          const row = info.row.original;
          const isResultTrue = row.Result;
          return (
            <div
              className={`text-left font-bold ${
                isResultTrue ? "text-green-500" : "text-red-500"
              }`}
            >
              {info.getValue()}
            </div>
          );
        },
      });
    }

    if (title === "Result") {
      // Customize the Result column to show TRUE or FALSE with colors
      return columnHelper.accessor(title, {
        id: title,
        header: () => title,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span
              className={`font-bold ${
                value ? "text-green-500" : "text-red-500"
              }`}
            >
              {value ? "TRUE" : "FALSE"}
            </span>
          );
        },
      });
    }

    if (title.match(/^C/)) {
      // Matches titles starting with 'C' (with icon and value)
      return columnHelper.accessor(title, {
        id: title,
        header: () => title,
        cell: (info) => {
          const value = info.getValue();
          const isUp = value > 50; // Determine if value is up or down
          return (
            <div className="flex items-center justify-center">
              {isUp ? (
                <ArrowUpIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 text-red-500 mr-2" />
              )}
              {value}
            </div>
          );
        },
      });
    }

    // Default rendering for other columns
    return columnHelper.accessor(title, {
      id: title,
      header: () => title,
      cell: (info) => info.getValue(),
    });
  });

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskDashboard;
