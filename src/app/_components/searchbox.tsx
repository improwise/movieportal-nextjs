"use client";

import { useState, useEffect, useCallback } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export function SearchBox({ onSearch, initialQuery }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);

  const debouncedSearch = useCallback(
    (func: (query: string) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(query), delay);
      };
    },
    [],
  );

  const debouncedOnSearch = useCallback(debouncedSearch(onSearch, 300), [
    onSearch,
    debouncedSearch,
  ]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedOnSearch(newQuery);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-4xl">
      <input
        className="w-full appearance-none rounded-lg bg-white bg-opacity-20 px-4 py-3 text-lg leading-tight text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        type="text"
        placeholder="Search movies..."
        aria-label="Search movies"
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-white opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
