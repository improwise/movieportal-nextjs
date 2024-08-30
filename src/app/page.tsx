import Link from "next/link";
import Image from "next/image";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const popularMovies = await api.post.getPopularMovies({ page: 1 });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Popular Movies
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="flex flex-col items-center">
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
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
