import { env } from "~/env";
import { type TMDBResponse, type Movie } from "~/types/tmdb";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${env.TMDB_API_KEY}&language=en-US&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as TMDBResponse;
    return data.results;
  } catch (error) {
    console.error(
      "Error fetching popular movies:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.TMDB_API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as Movie;
    return data;
  } catch (error) {
    console.error(
      "Error fetching movie details:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}

export async function searchMovies(query: string, page = 1): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as TMDBResponse;
    return data.results;
  } catch (error) {
    console.error(
      "Error searching movies:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}
