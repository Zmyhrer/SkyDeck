"use client";

import { useParams } from "next/navigation";

const ElementDetail = () => {
  const { rowIndex } = useParams(); // Extracts the row index from the URL

  // Convert rowIndex to number
  const index = Number(rowIndex) - 1;

  // Define the data
  const data = [
    {
      name: "Hydrogen",
      symbol: "H",
      atomicNumber: 1,
      category: "Nonmetal",
      discovered: 1766,
      isRadioactive: false,
    },
    {
      name: "Helium",
      symbol: "He",
      atomicNumber: 2,
      category: "Noble Gas",
      discovered: 1895,
      isRadioactive: false,
    },
    {
      name: "Lithium",
      symbol: "Li",
      atomicNumber: 3,
      category: "Alkali Metal",
      discovered: 1817,
      isRadioactive: false,
    },
    {
      name: "Uranium",
      symbol: "U",
      atomicNumber: 92,
      category: "Actinide",
      discovered: 1789,
      isRadioactive: true,
    },
  ];

  // Handle invalid index case
  if (isNaN(index) || index < 0 || index >= data.length) {
    return <p>Element not found</p>;
  }

  // Get the specific element data based on the rowIndex
  const element = data[index];

  return (
    <div>
      <h1>
        {element.name} ({element.symbol})
      </h1>
      <p>Atomic Number: {element.atomicNumber}</p>
      <p>Category: {element.category}</p>
      <p>Discovered: {element.discovered}</p>
      <p>Radioactive: {element.isRadioactive ? "Yes" : "No"}</p>
    </div>
  );
};

export default ElementDetail;
