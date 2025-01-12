import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../utilities/TestWrapper";

describe("Landing page", () => {
  test("Should render landing page", () => {
    render(<TestWrapper initialEntries="/" />);

    expect(screen.getByRole("button", { name: "Get started" }));
    expect(
      screen.getByText("Dive Into Your Next Obsession with Pikoria")
    ).toBeInTheDocument();
  });
});
