import supertest from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "../../src/app";

describe("POST /movies-series/recommend", () => {
  test("Should return movies-series recommendation successful", async () => {
    const moviesSeriesResponse = await supertest(app)
      .post("/movies-series/recommend")
      .send({
        genre: [16],
        content: "movies",
        rating: 8,
        release: [2024, 2025],
        runtime: [90, 180],
        region: "US",
      });
    expect(moviesSeriesResponse.body).toEqual({
      message: "Movies/series processed successfully",
    });
  });
});

describe("GET /movies-series/get", () => {
  test("Should return movies-series successfully", async () => {
    const moviesSeriesResponseRecommendation = await supertest(app)
      .post("/movies-series/recommend")
      .send({
        genre: [16],
        content: "movies",
        rating: 8,
        release: [2024, 2025],
        runtime: [90, 180],
        region: "US",
      });

    const moviesSeriesResponse = await supertest(app).get(
      "/movies-series/recommend"
    );

    expect(moviesSeriesResponseRecommendation.body).toEqual({
      message: "Movies/series processed successfully",
    });

    console.log(moviesSeriesResponse.body);
  });
});
