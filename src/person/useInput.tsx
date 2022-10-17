import React, { useState } from "react";

interface InputProps {
  id: string;
  name: string;
  type?: string;
}

const useInputElement = (value: string, setValue: (value: string) => void) => {
  const Input = ({ id, name, type }: InputProps) => (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );

  return Input;
};

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const Input = useInputElement(value, setValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    Input,
  };
};
