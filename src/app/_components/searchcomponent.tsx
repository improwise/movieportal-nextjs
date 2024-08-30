"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { MovieCard } from "./moviecard";
import { type Movie } from "~/types/tmdb";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const searchMutation = api.movie.searchMovies.useMutation({
    onSuccess: (data) => {
      setSearchResults(data);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchMutation.mutate({ query, page: 1 });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-grow rounded-l-md border border-gray-300 p-2 text-black"
          />
          <button
            type="submit"
            className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Search Results</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
