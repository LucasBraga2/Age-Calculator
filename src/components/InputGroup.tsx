import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";

interface InputGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function InputGroup({
  label,
  id,
  value,
  onChange,
  error,
  min,
  max,
  placeholder,
  inputRef,
}: InputGroupProps) {
  return (
    <div className="flex flex-col w-24 sm:w-28">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        inputRef={inputRef}
        error={error}
      />
      <span className="text-xs text-red-500 h-4 mt-1">{error}</span>
    </div>
  );
}