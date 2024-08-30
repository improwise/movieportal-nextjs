export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TMDBResponse {
  results: Movie[];
}

export interface MovieCardProps {
  movie: Movie;
}
