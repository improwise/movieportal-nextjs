export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  tagline: string | null;
  production_companies: { id: number; name: string; logo_path: string | null; origin_country: string }[];
  status: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string | null;
  imdb_id: string | null;
  homepage: string | null;
}

export interface TMDBResponse {
  results: Movie[];
}

export interface MovieCardProps {
  movie: Movie;
}
