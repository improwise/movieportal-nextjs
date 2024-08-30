import { env } from "~/env";
import { TMDBResponse, Movie } from "~/types/tmdb";

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
