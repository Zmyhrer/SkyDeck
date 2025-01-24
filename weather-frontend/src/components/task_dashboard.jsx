import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChartBarIcon } from "@heroicons/react/24/outline"; // Import the icon

// Reusable component for rendering the icon and value in the table cell
const IconWithTextCell = ({ icon: Icon, value }) => (
  <div className="flex items-center justify-center">
    {" "}
    {/* Center the content */}
    <Icon className="h-5 w-5 mr-2 text-gray-500" /> {/* Icon */}
    {value} {/* Value */}
  </div>
);

function TaskDashboard() {
  // Sample data for the table
  const defaultData = [
    {
      Task: "Hot Weather",
      Result: "TRUE",
      C1: 24,
      C2: 100,
      C3: 120,
      C4: 50,
    },
  ];

  const header_titles = ["Task", "Result", "C1", "C2", "C3", "C4"];

  // Column definition for the table
  const columnHelper = createColumnHelper();
  const columns = header_titles.map((title) => {
    if (title === "Task") {
      // Left-align the "Task" column
      return columnHelper.accessor(title, {
        header: () => title,
        cell: (info) => <div className="text-left">{info.renderValue()}</div>,
      });
    }

    // For columns like C1, C2, etc., use IconWithTextCell component
    if (title.startsWith("C")) {
      return columnHelper.accessor(title, {
        header: () => title,
        cell: (info) => (
          <IconWithTextCell
            icon={ChartBarIcon} // Using ChartBarIcon for these columns
            value={info.getValue()}
          />
        ),
      });
    } else {
      // Regular column with text values
      return columnHelper.accessor(title, {
        header: () => title,
        cell: (info) => info.renderValue(),
      });
    }
  });

  // Setting up the table with useReactTable hook
  const [data] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 text-center bg-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border border-gray-300 px-4 py-2 ${
                    cell.column.id === "Task" ? "text-left" : "text-center"
                  }`} // Left align "Task" column, center others
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
}

export default TaskDashboard;
