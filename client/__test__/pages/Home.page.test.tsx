import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TestWrapper } from "../utilities/TestWrapper";
import React from "react";

describe("Home page", () => {
  test("Should render home page with movies/series", () => {
    render(<TestWrapper initialEntries="/home" />);

    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
  });
});
