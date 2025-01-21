import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../utilities/Wrapper.utilities";
import userEvent from "@testing-library/user-event";

describe("Signup page", () => {
  // Should render all signup components
  test("Should render Signup component", () => {
    render(<Wrapper initialEntries="/auth/signup" />);
    expect(
      screen.queryByRole("heading", { name: "Sign up" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign up" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Sign in with Google")).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).toBeInTheDocument();
  });

  test("Should show validation error if invalid email type", async () => {
    render(<Wrapper initialEntries="/auth/signup" />);

    // Get all textfields
    const emailTextfield = screen.getByLabelText("Email");
    const passwordTextfield = screen.getByLabelText("Password");
    const confirmPasswordTextfield = screen.getByLabelText("Confirm Password");

    // Simulate user typing in inputs
    await userEvent.click(emailTextfield);
    await userEvent.keyboard("incorrect email type");
    await userEvent.tab();

    await userEvent.click(passwordTextfield);
    await userEvent.tab();

    await userEvent.click(confirmPasswordTextfield);
    await userEvent.keyboard("non matching password");
    await userEvent.tab();

    // Expect validation errors to render on page
    expect(
      screen.queryByText("Email must be a valid email type")
    ).toBeInTheDocument();
    expect(screen.queryByText("Password is required")).toBeInTheDocument();
    expect(screen.queryByText("Passwords must match")).toBeInTheDocument();
  });
});
