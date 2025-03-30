// src/components/Button.jsx
import React from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-primary text-white text-xl p-6 rounded-3xl hover:bg-primary-2 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
