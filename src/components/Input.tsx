import React from "react";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
}

export function Input({
  id,
  value,
  onChange,
  min,
  max,
  placeholder,
  inputRef,
  error,
}: InputProps) {
  return (
    <input
      type="number"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      placeholder={placeholder}
      ref={inputRef}
      className={`text-2xl font-bold px-3 py-2 border rounded-lg outline-none transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
  );
}