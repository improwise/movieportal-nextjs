import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} from "~/server/services/tmdb";

export const movieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .query(async ({ input }) => {
      return getPopularMovies(input.page);
    }),
  searchMovies: publicProcedure
    .input(z.object({ query: z.string(), page: z.number().optional() }))
    .mutation(async ({ input }) => {
      return searchMovies(input.query, input.page);
    }),
  getMovieDetails: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getMovieDetails(input.id);
    }),
});
