import { http, HttpResponse } from "msw";
import { API_URL } from "../../src/config/api.config";
import { mockTMDBMoviesSeries } from "./data.mock";
import { setupServer } from "msw/node";

export const handlers = [
  http.post(`${API_URL}/movies-series/recommend`, () => {
    return HttpResponse.json(mockTMDBMoviesSeries);
  }),
];

export const server = setupServer(...handlers);
