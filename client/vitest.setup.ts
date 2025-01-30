import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vitest } from "vitest";
import { server } from "./__tests__/mocks/msw.mock";

// Intialize mock service worker server for intercepting requests
beforeAll(() => {
  server.listen();

  // Mock scroll into view
  Element.prototype.scrollIntoView = vitest.fn();

  // Mock scroll to
  Element.prototype.scrollTo = vitest.fn();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
