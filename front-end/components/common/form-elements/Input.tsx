import React from "react";

interface InputProps {
  type: string;
  register?: any;
}

export const Input: React.FC<InputProps> = ({ type, register = {} }) => {
  return (
    <div className="w-full min-w-[200px] relative">
      <input
        type={type}
        className="border border-primary-border rounded p-1 text-sm w-full"
        {...register}
      />
    </div>
  );
};
