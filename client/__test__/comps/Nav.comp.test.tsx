import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../utilities/TestWrapper";

describe("Nav comp", () => {
  test("Should render nav comp", () => {
    render(<TestWrapper initialEntries="/" />);

    expect(screen.getByLabelText("menu")).toBeInTheDocument();
    expect(screen.getByLabelText("theme button")).toBeInTheDocument();
  });
});
