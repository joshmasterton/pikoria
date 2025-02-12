import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Wrapper } from "../utilities/Wrapper.utilities";

describe("Categories page", () => {
  test("Should render categories page", async () => {
    render(<Wrapper initialEntries="/categories" />);

    expect(screen.queryByLabelText("tv")).toBeInTheDocument();
    expect(screen.queryByLabelText("games")).toBeInTheDocument();
  });
});
