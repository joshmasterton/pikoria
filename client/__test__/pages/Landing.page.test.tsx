import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { memoryRouter } from "../../vitest.setup";
import { RouterProvider } from "react-router";

describe("Landing page", () => {
  test("Should render landing page", () => {
    const router = memoryRouter("/");

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("button", { name: "Get started" }));
    expect(
      screen.getByAltText("A graphical representation of data insights")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Explore the World of Data with Statalize")
    ).toBeInTheDocument();
  });
});
