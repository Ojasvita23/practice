import React from "react";

import { SearchInputProps } from "./types";

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mb-4 p-2 w-full"
    />
  );
};

export default SearchInput;
