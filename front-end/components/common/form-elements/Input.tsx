import React from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  register?: any;
}

export const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  register = {},
}) => {
  return (
    <div className="w-full min-w-[200px] relative">
      <input
        id={name}
        name={name}
        type={type}
        className="border border-primary-border rounded p-1 text-sm w-full"
        placeholder={placeholder || ""}
        {...register}
        value={register.value}
        onBlur={register.onBlur}
        onChange={register.onChange}
      />
    </div>
  );
};
