import { http, HttpResponse } from "msw";
import { API_URL } from "../../src/config/api.config";
import { setupServer } from "msw/node";
import { mockMoviesSeriesRecommendations } from "./data.mock";

export const handlers = [
  http.post(`${API_URL}/movies-series/recommend`, async () => {
    return HttpResponse.json(mockMoviesSeriesRecommendations);
  }),
];

export const server = setupServer(...handlers);
