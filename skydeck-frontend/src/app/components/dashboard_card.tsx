"use client";

import React from "react";
type CardProps = {
  title: string;
  size: string;
  top: string;
  left: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, size, top, left, children }) => {
  return (
    <div
      className={`${size} p-2 bg-white shadow-lg rounded-lg absolute`}
      style={{ top, left }}
    >
      <h3 className="text-lg font-semibold text-center m-1 border-b border-gray200">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
