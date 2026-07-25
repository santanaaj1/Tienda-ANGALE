import { createContext, useState } from "react";

export const SearchContext =
  createContext();

function SearchProvider({ children }) {

  const [searchTerm, setSearchTerm] =
    useState("");

  return (

    <SearchContext.Provider

      value={{
        searchTerm,
        setSearchTerm
      }}

    >

      {children}

    </SearchContext.Provider>

  );

}

export default SearchProvider;