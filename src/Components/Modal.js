import React from "react";

export default function Modal({ selectedImg, setSelectedImg }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60" onClick={() => setSelectedImg(null)}>
      <img className="max-w-[60%] max-h-[80%] my-16 mx-auto border-4 border-white shadow-lg" src={selectedImg} alt="Enlarged Pic" />
    </div>
  );
}
