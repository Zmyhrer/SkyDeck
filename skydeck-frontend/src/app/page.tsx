"use client";
import React from "react";
import AvatarSelector from "@/app/components/AvatarSelector";

const Home = () => {
  return (
    <div className="p-4">
      <AvatarSelector onSelect={(avatar) => console.log(avatar)} />
    </div>
  );
};

export default Home;
