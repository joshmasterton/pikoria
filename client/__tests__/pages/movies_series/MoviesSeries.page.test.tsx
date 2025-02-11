import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Wrapper } from "../../utilities/Wrapper.utilities";

describe("MoviesSeries page", () => {
  test("Should render MoviesSeries page", async () => {
    render(<Wrapper initialEntries="/categories/movies-series" />);

    await waitFor(() => {
      expect(screen.queryByLabelText("movies-series")).toBeInTheDocument();
    });

    expect(screen.queryByLabelText("Moana 2")).toBeInTheDocument();
  });
});
