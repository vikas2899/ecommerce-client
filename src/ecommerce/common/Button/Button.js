import React from "react";

function Button({ text }) {
  return (
    <div className="border-2 border-[lightgray]">
      <button>{text}</button>
    </div>
  );
}

export default Button;
