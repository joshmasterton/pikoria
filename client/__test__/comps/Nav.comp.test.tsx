import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { memoryRouter } from "../../vitest.setup";
import { RouterProvider } from "react-router";

describe("Nav comp", () => {
  test("Should render nav comp", () => {
    const router = memoryRouter("/");

    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText("menu")).toBeInTheDocument();
    expect(screen.getByLabelText("theme button")).toBeInTheDocument();
  });
});
