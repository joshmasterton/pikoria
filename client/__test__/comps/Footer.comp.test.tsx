import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import React from "react";
import { TestWrapper } from "../utilities/TestWrapper";

describe("Footer comp", () => {
  test("Should render footer comp", () => {
    render(<TestWrapper initialEntries="/" />);

    expect(
      screen.getByText(
        `${new Date().getFullYear()} Pikoria. All rights reserved`
      )
    ).toBeInTheDocument();
  });
});
