import supertest from "supertest";
import { describe, test } from "vitest";
import { app } from "../../src/app";

describe("POST /movies-series/recommend", () => {
  test("Should return movies-series recommendation", async () => {
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

    console.log(moviesSeriesResponse.body);
  });
});
