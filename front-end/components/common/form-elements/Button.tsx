import React, { useMemo } from "react";
import { ButtonTypes } from "./types";

const getButtonClasses = (type: ButtonTypes) => {
  switch (type) {
    case ButtonTypes.Button:
    case ButtonTypes.Submit:
      return {
        active: "text-kinfolks-white bg-kinfolks-blue border-kinfolks-blue",
        disabled: "text-secondary-text bg-ice-blue border-ice-blue",
      };
    case ButtonTypes.Reset:
      return {
        active: "text-primary-text border-secondary-text",
        disabled: "text-secondary-text border-primary-border",
      };
    default:
      return {
        active: "",
        disabled: "",
      };
  }
};

interface ButtonProps {
  type: ButtonTypes;
  disabled?: boolean;
  buttonText: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  disabled = false,
  buttonText,
  onClick = () => {},
}) => {
  const buttonClasses = useMemo(() => getButtonClasses(type), [type]);
  return (
    <button
      type={type}
      className={`border rounded text-sm font-semibold px-4 py-2 ${
        disabled ? buttonClasses.disabled : buttonClasses.active
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
