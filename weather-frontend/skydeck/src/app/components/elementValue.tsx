import React from "react";

type PageProps = {
  title: string;
  value: number;
  arrowUp: boolean;
};

const ElementValue = ({ title, value, arrowUp }: PageProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-center">{title}</div>

      <div className="flex flex-row justify-center items-center w-full">
        <div className="text-md mr-2">{value}</div>

        {arrowUp && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7-7-7 7"
            />
          </svg>
        )}
        {!arrowUp && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 15l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ElementValue;
