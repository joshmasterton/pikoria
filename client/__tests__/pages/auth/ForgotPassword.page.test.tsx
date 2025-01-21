import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../utilities/Wrapper.utilities";
import userEvent from "@testing-library/user-event";

describe("Signin page", () => {
  // Should render all forgotPassword components
  test("Should render Signin component", () => {
    render(<Wrapper initialEntries="/auth/forgotPassword" />);
    expect(
      screen.queryByRole("heading", { name: "Reset password" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Send reset password link" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Sign in with Google")).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).toBeInTheDocument();
  });

  test("Should show validation error if invalid email type", async () => {
    render(<Wrapper initialEntries="/auth/forgotPassword" />);

    // Get all textfields
    const emailTextfield = screen.getByLabelText("Email");

    // Simulate user typing in inputs
    await userEvent.click(emailTextfield);
    await userEvent.keyboard("incorrect email type");
    await userEvent.tab();

    // Expect validation errors to render on page
    expect(
      screen.queryByText("Email must be a valid email type")
    ).toBeInTheDocument();
  });
});
