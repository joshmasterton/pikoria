import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { memoryRouter } from "../../vitest.setup";
import { RouterProvider } from "react-router";

describe("Footer comp", () => {
  test("Should render footer comp", () => {
    const router = memoryRouter("/");

    render(<RouterProvider router={router} />);

    expect(
      screen.getByText(
        `${new Date().getFullYear()} Statalize. All rights reserved`
      )
    ).toBeInTheDocument();
  });
});
