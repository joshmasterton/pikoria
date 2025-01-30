import supertest from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "../../src/app";
import { fakeToken } from "../mocks/user.mock";

describe("POST /movies-series/recommend", () => {
  test("Should return movies-series recommendation on success", async () => {
    const moviesSeriesResponse = await supertest(app)
      .post("/movies-series/recommend")
      .send({
        genre: 16,
        content: "movies",
        release: [2020, 2025],
        runtime: [90, 180],
        region: "US",
        page: 1,
      });

    expect(moviesSeriesResponse.body).toBeInstanceOf(Array);
    expect(moviesSeriesResponse.body).toHaveLength(20);
  });

  test("Should return empty if on movies/series to retrun", async () => {
    const moviesSeriesResponse = await supertest(app)
      .post("/movies-series/recommend")
      .send({
        genre: 16,
        content: "movies",
        release: [2020, 2025],
        runtime: [90, 180],
        region: "US",
        page: 100,
      });

    expect(moviesSeriesResponse.body).toBeInstanceOf(Array);
    expect(moviesSeriesResponse.body).toHaveLength(0);
  });
});

describe("POST /movies-series/like", () => {
  test("Should like a movie and add it to favourites", async () => {
    const likeMovieSeries = await supertest(app)
      .post("/movies-series/like")
      .send({
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
      })
      .set("Authorization", `Bearer ${fakeToken}`);
  });

  test("Should remove a movie if its already in favourites", async () => {
    const likeMoviesSeries = await supertest(app)
      .post("/movies-series/like")
      .send({
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
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    const removeLikeMovieSeries = await supertest(app)
      .post("/movies-series/like")
      .send({
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
      })
      .set("Authorization", `Bearer ${fakeToken}`);
  });
});

describe("GET /movies-series/favourites", () => {
  test("Should return favourite movies_series", async () => {
    await supertest(app)
      .post("/movies-series/like")
      .send({
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
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    const favouriteMoviesSeries = await supertest(app)
      .get("/movies-series/favourites")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(favouriteMoviesSeries.body).toBeInstanceOf(Array);
    expect(favouriteMoviesSeries.body).toHaveLength(1);
  });
});

describe("GET /movies-series/:id/get?content", () => {
  test("Should return movie_series", async () => {
    const getMovieSeries = await supertest(app).get(
      `/movies-series/${67915}/get?content=series`
    );

    // expect(getMovieSeries.body.created_by).toBeDefined();
    // console.log(getMovieSeries.body.created_by);
  });
});
