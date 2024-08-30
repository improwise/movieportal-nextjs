import Image from "next/image";
import { type Movie, type MovieCardProps } from "~/types/tmdb";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg"
        />
      )}
      <h2 className="mt-2 text-xl font-bold">{movie.title}</h2>
      <p className="text-sm">{movie.release_date}</p>
    </div>
  );
}
