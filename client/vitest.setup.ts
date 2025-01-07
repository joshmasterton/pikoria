import { createMemoryRouter } from "react-router";
import { routes } from "./src/App";

import "@testing-library/jest-dom";

export const memoryRouter = (initialEntries: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntries],
  });

  return router;
};
