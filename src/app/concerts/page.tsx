"use client";
import React, { useState } from "react";

function Concerts() {
  const [mjau, setMjau] = useState(false);

  return (
    <main className="mainContent">
      <h1 className="text-blue-800 my-8">Ingrids side</h1>
      <h3 className="text-center border border-orange-500 rounded-4xl">
        {mjau &&
          "Mjau mjau mjau mjau mjau mjau mjau mjau mjau mjau mjau mjau mjau mjau"}
        {!mjau &&
          "Umjau umjau umjau umjau umjau umjau umjau umjau umjau umjau umjau"}
      </h3>
      <br />
      <img
        className="w-full sm:w-1/2 lg:w-1/4 cursor-pointer rounded-full aspect-square object-cover shadow-md hover:shadow-2xl hover:rotate-360 transition-all duration-500"
        onClick={() => setMjau(!mjau)}
        src={
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ2smvooDjWLFwiSdtPd29-CFnWgG2ea1uYZH2GspFxPFg5LX3j9OM_g1QnnTLVVXHeUHjf9FMFhR_rOGfx9NAE2Q"
        }
        alt="Ingrid"
      />
    </main>
  );
}

export default Concerts;
