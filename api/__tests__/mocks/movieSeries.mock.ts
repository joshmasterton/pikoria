import { MoviesSeriesWithResults } from "../../src/types/moviesSeries.type";

export const mockMoviesSeriesRecommendations: MoviesSeriesWithResults = {
  results: [
    {
      backdrop_path: "/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg",
      genre_ids: [1, 2],
      tmdb_id: 2000,
      type: "movie",
      id: 1,
      original_language: "en",
      original_title: "Moana 2",
      overview:
        "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
      popularity: 1831.321,
      poster_path: "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
      release_date: "2024-11-21",
      title: "Moana 2",
      vote_average: 7.193,
      vote_count: 1259,
      liked: false,
    },
    {
      backdrop_path: "/t1UcT2XiyvJK3tVAb416PBM2LDE.jpg",
      genre_ids: [1, 2],
      id: 2,
      tmdb_id: 89012,
      type: "series",
      original_language: "en",
      original_name: "The Midnight Gospel",
      overview:
        "Traversing trippy worlds inside his universe simulator, Clancy the space caster explores existential questions about life, death and everything in between.",
      popularity: 24.883,
      poster_path: "/me3kxfiFRkdto6SmDQv0nczjfmP.jpg",
      first_air_date: "2020-04-20",
      name: "The Midnight Gospel",
      vote_average: 8.252,
      vote_count: 833,
      liked: false,
    },
  ],
  total_pages: 5,
  total_results: 80,
};
