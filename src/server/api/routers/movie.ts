import { z } from "zod";
import { getPopularMovies } from "~/server/services/tmdb";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .query(async ({ input }) => {
      const movies = await getPopularMovies(input.page);
      return movies;
    }),
});
