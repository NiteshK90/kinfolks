import React from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  register?: any;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  register = {},
}) => {
  return (
    <div className="w-full min-w-[200px] relative">
      <input
        type={type}
        className="border border-primary-border rounded p-1 text-sm w-full"
        placeholder={placeholder || ""}
        {...register}
      />
    </div>
  );
};
