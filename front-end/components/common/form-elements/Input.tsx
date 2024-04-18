import React from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  register?: any;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  register = {},
  error,
  label,
}) => {
  return (
    <>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
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
        {error && (
          <div className="absolute -bottom-5 left-0 text-xs text-danger-text">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
