import React from "react";
import { Option } from "./types";

interface SelectProps {
  placeholder?: string;
  options?: Option[];
  register?: any;
  multiple?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  placeholder = "select",
  options = [],
  register = {},
  multiple = false,
}) => {
  return (
    <select
      placeholder={placeholder}
      className="border border-primary-border rounded p-1 text-sm w-full min-w-[200px]"
      {...register}
      multiple={multiple}
    >
      {options?.map(({ label, value }, index) => (
        <option
          key={`place-option-${index}`}
          value={value}
          className="p-1 text-sm"
        >
          {label}
        </option>
      ))}
    </select>
  );
};
