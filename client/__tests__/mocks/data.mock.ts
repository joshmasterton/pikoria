import {
  MoviesSeriesRecommendationsTypeAll,
  MoviesSeriesTypeAll,
} from "../../src/types/moviesSeries.type";

export const mockMoviesSeriesRecommendations: MoviesSeriesRecommendationsTypeAll =
  {
    results: [
      {
        adult: false,
        backdrop_path: "/smSbK5cd8T9XHcxEUcems23BDEF.jpg",
        genre_ids: [18, 10765, 35],
        id: 67915,
        origin_country: ["KR"],
        original_language: "ko",
        original_name: "쓸쓸하고 찬란하神-도깨비",
        overview:
          "In his quest for a bride to break his immortal curse, a 939-year-old guardian of souls meets a grim reaper and a sprightly student with a tragic past.",
        popularity: 187.255,
        poster_path: "/t7aUi8jbsIUSCNqA1akAbKjBWjU.jpg",
        first_air_date: "2016-12-02",
        name: "Goblin",
        vote_average: 8.636,
        vote_count: 2835,
        liked: false,
      },
      {
        adult: false,
        backdrop_path: "/smSbK5cd8T9XHcxEUcems23BDE.jpg",
        genre_ids: [18, 10765, 35],
        id: 67919,
        origin_country: ["KR"],
        original_language: "ko",
        original_name: "쓸쓸하고 찬란하神-도",
        overview:
          "In his quest for a bride to break his imml curse, a 939-year-old guardian of souls meets a grim reaper and a sprightly student with a tragic past.",
        popularity: 187.25,
        poster_path: "/t7aUi8jbsIUSCNqA1akAbKjWjU.jpg",
        first_air_date: "2016-12-02",
        name: "Alien",
        vote_average: 8.636,
        vote_count: 2835,
        liked: false,
      },
    ],
    total_pages: 1,
    total_results: 2,
  };

export const mockFavouriteMoviesSeries: MoviesSeriesTypeAll = {
  results: [
    {
      adult: false,
      media_type: "movie",
      backdrop_path: "/sYXLeu5usz6yEz0k00FYvtEdodD.jpg",
      created_by: [
        {
          id: 2000007,
          credit_id: "62d5e468c92c5d004f0d1201",
          name: "Christian Linke",
          original_name: "Christian Linke",
          gender: 2,
          profile_path: "/u1uCJkmVSeLQC1CwSB7UzXAVbqO.jpg",
        },
        {
          id: 3299121,
          credit_id: "62d5e46e72c13e062e7196aa",
          name: "Alex Yee",
          original_name: "Alex Yee",
          gender: 2,
          profile_path: "/kvRKbXZcCnM6d1vcND4917iQ4kp.jpg",
        },
      ],
      episode_run_time: [],
      first_air_date: "2021-11-06",
      genres: [
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 10765,
          name: "Sci-Fi & Fantasy",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10759,
          name: "Action & Adventure",
        },
      ],
      homepage: "https://arcane.com",
      id: 94605,
      in_production: false,
      languages: ["en"],
      last_air_date: "2024-11-23",
      last_episode_to_air: {
        id: 5609651,
        name: "The Dirt Under Your Nails",
        overview:
          "Magic. Science. Power. Revenge. Destinies clash in an epic final chapter, igniting an all-out war.",
        vote_average: 8.2,
        vote_count: 37,
        air_date: "2024-11-23",
        episode_number: 9,
        episode_type: "finale",
        production_code: "",
        runtime: 51,
        season_number: 2,
        show_id: 94605,
        still_path: "/7wYoQZAdbB6e3CFDDYvxQY1sM7.jpg",
      },
      name: "Arcane",
      next_episode_to_air: null,
      networks: [
        {
          id: 213,
          logo_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
          name: "Netflix",
          origin_country: "",
        },
      ],
      number_of_episodes: 18,
      number_of_seasons: 2,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Arcane",
      overview:
        "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      popularity: 260.242,
      poster_path: "/abf8tHznhSvl9BAElD2cQeRr7do.jpg",
      production_companies: [
        {
          id: 99496,
          logo_path: "/6WTCdsmIH6qR2zFVHlqjpIZhD5A.png",
          name: "Fortiche Production",
          origin_country: "FR",
        },
        {
          id: 124172,
          logo_path: "/sBlhznEktXKBqC87Bsfwpo1YbYR.png",
          name: "Riot Games",
          origin_country: "US",
        },
      ],
      production_countries: [
        {
          iso_3166_1: "FR",
          name: "France",
        },
        {
          iso_3166_1: "US",
          name: "United States of America",
        },
      ],
      seasons: [
        {
          air_date: "2024-10-08",
          episode_count: 8,
          id: 427899,
          name: "Specials",
          overview: "",
          poster_path: "/4ZmnQwv6MZH9ahlfzbgcNJPXhuj.jpg",
          season_number: 0,
          vote_average: 0,
        },
        {
          air_date: "2021-11-06",
          episode_count: 9,
          id: 134187,
          name: "Season 1",
          overview:
            "Two sisters. Two cities. One discovery that will change the world forever. In the cities of Piltover and Zaun, unrest stirs as inventors and thieves, politicians and crime lords chafe against the constraints of a society torn asunder.",
          poster_path: "/6FMWx79iAtZx8WHtOrRj0VlM8Tp.jpg",
          season_number: 1,
          vote_average: 8.8,
        },
        {
          air_date: "2024-11-09",
          episode_count: 9,
          id: 351997,
          name: "Season 2",
          overview:
            "Alliances are forged, allegiances are smashed and fresh dangers emerge as the battle between Piltover and Zaun inspires both glory and heartbreak.",
          poster_path: "/oTGEwkp1mPgWNMgVSM53TWfzgSc.jpg",
          season_number: 2,
          vote_average: 8.3,
        },
      ],
      spoken_languages: [
        {
          english_name: "English",
          iso_639_1: "en",
          name: "English",
        },
      ],
      status: "Ended",
      tagline: "The hunt is on.",
      type: "Scripted",
      vote_average: 8.8,
      vote_count: 4846,
      liked: true,
    },
  ],
  total_pages: 0,
  total_results: 1,
};
