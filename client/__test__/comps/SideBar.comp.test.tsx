import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { TestWrapper } from "../utilities/TestWrapper";

describe("SideBar comp", () => {
  test("Should render sidebar", () => {
    render(<TestWrapper initialEntries="/home" />);
  });
});
