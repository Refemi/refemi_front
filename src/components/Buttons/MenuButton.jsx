import React from "react";

export default function MenuButton({ className, onClick, label }) {
  return (
    <button id="dropdown" onClick={onClick} className={`menu-btn ${className}`}>
      {label}
    </button>
  );
}
