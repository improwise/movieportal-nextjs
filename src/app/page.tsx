import { api, HydrateClient } from "~/trpc/server";
import { MovieCard } from "~/app/_components/moviecard";
import SearchComponent from "~/app/_components/searchcomponent";

export default async function Home() {
  const popularMovies = await api.movie.getPopularMovies({ page: 1 });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Popular Movies
          </h1>
          <SearchComponent />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
