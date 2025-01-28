import supertest from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "../../src/app";

describe("POST /movies-series/recommend", () => {
  test("Should return movies-series recommendation successful", async () => {
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
  });
});
