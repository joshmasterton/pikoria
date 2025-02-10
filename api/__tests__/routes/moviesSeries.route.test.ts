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
        content: "series",
        region: "all",
        page: 0,
      });

    expect(moviesSeriesResponse.body.results).toBeInstanceOf(Array);
    expect(typeof moviesSeriesResponse.body.total_pages).toBe("number");
    expect(typeof moviesSeriesResponse.body.total_results).toBe("number");
  });

  test("Should return movies-series recommendation on success with search term", async () => {
    const moviesSeriesResponse = await supertest(app)
      .post("/movies-series/recommend")
      .send({
        genre: 16,
        content: "series",
        region: "all",
        page: 0,
        search: "attack on",
      });

    expect(moviesSeriesResponse.body.results).toBeInstanceOf(Array);
    expect(typeof moviesSeriesResponse.body.total_pages).toBe("number");
    expect(typeof moviesSeriesResponse.body.total_results).toBe("number");
  });
});

describe("POST /movies-series/like", () => {
  test("Should like a movie and add it to favourites", async () => {
    const likeMovieSeries = await supertest(app)
      .post("/movies-series/like")
      .send({
        id: 1,
        content: "series",
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(likeMovieSeries.body.id).toBeDefined();
    expect(likeMovieSeries.body.liked).toBeTruthy();
  });

  test("Should remove a movie if its already in favourites", async () => {
    const firstLike = await supertest(app)
      .post("/movies-series/like")
      .send({
        id: 1,
        content: "series",
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    const likeMovieSeries = await supertest(app)
      .post("/movies-series/like")
      .send({
        id: 1,
        content: "series",
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(likeMovieSeries.body.id).toBeDefined();
    expect(likeMovieSeries.body.liked).toBeFalsy();
  });
});

describe("GET /movies-series/favourites", () => {
  test("Should return favourite movies_series", async () => {
    await supertest(app)
      .post("/movies-series/like")
      .send({
        id: 1,
        content: "series",
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    await supertest(app)
      .post("/movies-series/like")
      .send({
        id: 2,
        content: "movie",
      })
      .set("Authorization", `Bearer ${fakeToken}`);

    const favouriteMoviesSeries = await supertest(app)
      .get("/movies-series/favouriteMoviesSeries")
      .query({ page: 0 })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(favouriteMoviesSeries.body.results).toBeInstanceOf(Array);
    expect(typeof favouriteMoviesSeries.body.total_pages).toBe("number");
    expect(typeof favouriteMoviesSeries.body.total_results).toBe("number");
  });
});

describe("GET /movies-series/:id/get?content", () => {
  test("Should return movie_series", async () => {
    const getMovieSeries = await supertest(app).get(
      `/movies-series/${1}/get?content=series`
    );

    expect(getMovieSeries.body.id).toBeDefined();
  });
});
