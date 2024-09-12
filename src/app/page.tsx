"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { MovieList } from "~/app/_components/movielist";
import { SearchBox } from "~/app/_components/searchbox";
import { type Movie } from "~/types/tmdb";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularMoviesQuery = api.movie.getPopularMovies.useQuery({ page: 1 });
  const searchMoviesMutation = api.movie.searchMovies.useMutation({
    onSuccess: (data) => {
      setSearchResults(data);
      setIsSearching(false);
    },
    onError: () => {
      setIsSearching(false);
    },
  });

  const isLoading = popularMoviesQuery.isLoading || isSearching;
  const error = popularMoviesQuery.error ?? searchMoviesMutation.error;
  const movies = query ? searchResults : (popularMoviesQuery.data ?? []);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery) {
      setIsSearching(true);
      searchMoviesMutation.mutate({ query: newQuery, page: 1 });
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex max-w-4xl flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Movie Portal
        </h1>
        <SearchBox onSearch={handleSearch} initialQuery={query} />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">An error occurred: {error.message}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              {query ? "Search Results" : "Popular Movies"}
            </h2>
            <MovieList movies={movies} />
          </>
        )}
      </div>
    </main>
  );
}
