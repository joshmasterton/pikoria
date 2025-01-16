import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../../utilities/variables.utilities";
import { mockedMoviesSeriesResponse } from "../mocks/moviesSeries.mock";

export const server = setupServer(
  http.get(`${API_URL}/movies-series/get`, () => {
    return HttpResponse.json(mockedMoviesSeriesResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  })
);
