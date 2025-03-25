import React from "react";
import ElementValue from "@/app/components/elementValue";

type CellProps = {
  value:
    | string
    | number
    | boolean
    | { title: string; value: number; arrow: boolean };

  isFirstColumn: boolean;
};

const Cell = ({ value, isFirstColumn }: CellProps) => {
  const firstColumnClass = isFirstColumn ? "sticky left-0 border-l" : "";

  if (isElementValue(value)) {
    return (
      <td
        className={`bg-white border-r border-b border-gray-200 px-2 py-2 min-w-[100px] ${firstColumnClass}`}
      >
        <ElementValue
          title={value.title}
          value={value.value}
          arrow={value.arrow}
        />
      </td>
    );
  }

  return (
    <td
      className={`py-2 bg-white border-r border-b border-gray-200 text-center ${firstColumnClass}`}
    >
      {typeof value === "boolean" ? (value ? "✅" : "❌") : value}
    </td>
  );
};

const isElementValue = (
  value:
    | string
    | number
    | boolean
    | { title: string; value: number; arrow: boolean }
): value is { title: string; value: number; arrow: boolean } => {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    "value" in value
  );
};

export default Cell;
