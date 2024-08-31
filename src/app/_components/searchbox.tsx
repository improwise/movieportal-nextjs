"use client";

import { useState, useEffect } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export function SearchBox({ onSearch, initialQuery }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b border-b-2 border-white py-2">
        <input
          className="mr-3 w-full appearance-none bg-transparent px-2 py-1 leading-tight text-white focus:outline-none"
          type="text"
          placeholder="Search movies..."
          aria-label="Search movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="flex-shrink-0 rounded border-4 border-white bg-white px-2 py-1 text-sm text-[#2e026d] hover:border-gray-200 hover:bg-gray-200"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
