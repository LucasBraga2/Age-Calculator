import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-2 uppercase"
    >
      {children}
    </label>
  );
}