import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestWrapper } from "../utilities/TestWrapper";

describe("Auth page", () => {
  test("Should render login page", () => {
    render(<TestWrapper initialEntries="/auth/login" />);
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  test("Should render signup page", () => {
    render(<TestWrapper initialEntries="/auth/signup" />);
    expect(screen.getByRole("heading", { name: "Signup" })).toBeInTheDocument();
  });

  test("Should render reset password page", () => {
    render(<TestWrapper initialEntries="/auth/resetPassword" />);
    expect(
      screen.getByRole("heading", { name: "Reset password" })
    ).toBeInTheDocument();
  });
});
