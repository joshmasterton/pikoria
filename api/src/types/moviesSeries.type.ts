export type MoviesSeriesForm = {
  genre: number;
  content: string;
  region: string;
  page: number;
  search?: string;
};

export type LikeMovieSeriesForm = {
  id: number;
  content: "movie" | "series";
};

export type MoviesSeries = {
  id: number;
  tmdb_id: number;
  type: "movie" | "series";
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  original_language: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  liked: boolean;
};

export type MoviesSeriesWithResults = {
  results: MoviesSeries[];
  total_pages: number;
  total_results: number;
};
