import React from "react";

interface AutocompleteProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

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
