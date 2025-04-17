import React from "react";
import { AutocompleteProps } from "./types";

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select value={value} onChange={onChange} className="mb-4 p-2 w-full">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Autocomplete;
