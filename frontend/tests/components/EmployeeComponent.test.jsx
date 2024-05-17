import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, afterEach } from "vitest";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { getEmployee } from "../../src/services/EmployeeService";
import EmployeeComponent from "../../src/components/EmployeeComponent";

vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
  BrowserRouter: () => vi.fn(),
  useNavigate: () => vi.fn(),
}));

vi.mock("../../src/services/EmployeeService", async () => ({
  getEmployee: vi.fn(),
}));

describe("EmployeeComponent.test", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should render as Edit Employee", async () => {
    useParams.mockReturnValue({ id: "11123" });

    getEmployee.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    await act(async () => render(<EmployeeComponent />));
    screen.debug();
  });

  it("should render form as Add Employee if there is no user ID", async () => {
    useParams.mockReturnValue({});

    await act(async () => render(<EmployeeComponent />));

    screen.debug();

    const titleHeader = screen.getByRole("heading");
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    expect(titleHeader).toHaveTextContent(/Add Employee/i);
    expect(inputFirstName).toHaveValue("");
    expect(inputLastname).toHaveValue("");
    expect(inputEmail).toHaveValue("");
  });
});
