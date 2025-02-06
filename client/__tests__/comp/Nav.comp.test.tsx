import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Wrapper } from "../utilities/Wrapper.utilities";

describe("Nav comp", () => {
  test("Should render nav page", () => {
    render(<Wrapper initialEntries="/categories" />);

    expect(screen.queryByLabelText("User settings")).toBeInTheDocument();
    expect(screen.queryByLabelText("Menu")).toBeInTheDocument();
  });
});
