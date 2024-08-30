import Image from "next/image";
import Link from "next/link";
import { type Movie, type MovieCardProps } from "~/types/tmdb";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="block h-full">
      <div className="flex h-full flex-col items-center rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
        <div className="relative h-48 w-32 flex-shrink-0">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-grow flex-col justify-between">
          <h2 className="text-lg font-bold line-clamp-2">{movie.title}</h2>
          <p className="text-sm">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}
