"use client";

import React from "react";
import Table from "@/app/components/table";
import dataDecks from "@/data/decks.json";

const page = () => {
  const first10Elements = dataDecks.data.map((item) => {
    return {
      ...item,
      elements: item.elements.slice(0, 20),
    };
  });

  const maxElementCount = Math.max(
    ...first10Elements.map((item) => item.elements.length)
  );
  console.log(maxElementCount);
  const elementNewHeaders = Array.from(
    { length: maxElementCount },
    (_, i) => `E${i + 1}`
  );
  const headerLabels = ["Deck Name", "Boolean", ...elementNewHeaders];
  console.log(headerLabels);

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center md:justify-start  dark:bg-black dark:text-purple-50 ">
          Decks
        </h1>
      </div>

      <div className="border border-gray-200">
        <Table
          headersKey={dataDecks.headers}
          headersLabel={headerLabels}
          data={first10Elements}
        />
      </div>
    </div>
  );
};

export default page;
