import { getMovieDetails } from "~/server/services/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(parseInt(params.id));

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-500 hover:underline"
      >
        &larr; Back to Movies
      </Link>
      <div className="flex flex-col md:flex-row">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg"
          />
        )}
        <div className="md:ml-8">
          <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>
          <p className="mb-4 text-gray-400">{movie.tagline}</p>
          <p className="mb-4">{movie.overview}</p>
          <div className="mb-4">
            <strong>Release Date:</strong> {movie.release_date}
          </div>
          <div className="mb-4">
            <strong>Runtime:</strong> {movie.runtime} minutes
          </div>
          <div className="mb-4">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </div>
          <div className="mb-4">
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
          </div>
        </div>
      </div>
    </div>
  );
}
