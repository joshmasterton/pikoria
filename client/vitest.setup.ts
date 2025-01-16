import { createMemoryRouter } from "react-router";
import { routes } from "./src/App";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./__test__/utilities/msw";
import "@testing-library/jest-dom";

export const memoryRouter = (initialEntries: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntries],
  });

  return router;
};

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
