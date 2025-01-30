import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Wrapper } from "../utilities/Wrapper.utilities";
import userEvent from "@testing-library/user-event";

describe("Categories page", () => {
  test("Should render categories page and moviesSeriesForm on click", async () => {
    render(<Wrapper initialEntries="/categories" />);

    const moviesSeriesFormButton = screen.getByLabelText("Movies/Series");

    await userEvent.click(moviesSeriesFormButton);

    expect(screen.queryByText("Find a movie or series")).toBeInTheDocument();
    expect(screen.queryByText("Movies / Series")).toBeInTheDocument();
    expect(screen.queryByText("Games")).toBeInTheDocument();
  });

  test("Should render movies/series on form submit", async () => {
    render(<Wrapper initialEntries="/categories" />);

    const moviesSeriesFormButton = screen.getByLabelText("Movies/Series");

    await userEvent.click(moviesSeriesFormButton);

    const moviesSeriesSumbitFormButton = screen.getByRole("button", {
      name: "Let's go!",
    });

    expect(moviesSeriesSumbitFormButton).toBeInTheDocument();

    await userEvent.click(moviesSeriesSumbitFormButton);

    const movieTitle = screen.queryAllByText("Goblin");
    expect(movieTitle.length).toBeGreaterThan(0);
  });

  test("Should render big movie series card on movie series card click", async () => {
    render(<Wrapper initialEntries="/categories" />);

    const moviesSeriesFormButton = screen.getByLabelText("Movies/Series");

    await userEvent.click(moviesSeriesFormButton);

    const moviesSeriesSumbitFormButton = screen.getByRole("button", {
      name: "Let's go!",
    });

    expect(moviesSeriesSumbitFormButton).toBeInTheDocument();

    await userEvent.click(moviesSeriesSumbitFormButton);

    const movieSeriesCardAction = screen.getByLabelText("Goblin Action");

    await userEvent.click(movieSeriesCardAction);

    expect(screen.queryByAltText("Goblin backdrop")).toBeInTheDocument();
  });
});
