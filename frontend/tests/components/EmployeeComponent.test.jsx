import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../../src/services/EmployeeService";
import EmployeeComponent from "../../src/components/EmployeeComponent";

vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
  BrowserRouter: () => vi.fn(),
  useNavigate: () => vi.fn(),
}));

vi.mock("../../src/services/EmployeeService", async () => ({
  getEmployee: vi.fn(),
  addEmployee: vi.fn(),
  updateEmployee: vi.fn(),
}));

describe("EmployeeComponent.test", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should render form as Add Employee if there is no user ID", async () => {
    useParams.mockReturnValue({});

    await act(async () => render(<EmployeeComponent />));

    screen.debug();

    //Header
    const titleHeader = screen.getByRole("heading");
    expect(titleHeader).toHaveTextContent(/Add Employee/i);

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);
    expect(inputFirstName).toHaveValue("");
    expect(inputLastname).toHaveValue("");
    expect(inputEmail).toHaveValue("");
  });

  it("should show errors on required fields on Add Employee View when input fields are empty", async () => {
    useParams.mockReturnValue({});

    await act(async () => render(<EmployeeComponent />));

    const buttonItem = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();

    await act(async () => user.click(buttonItem));

    screen.debug();

    const titleHeader = screen.getByRole("heading");
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    expect(titleHeader).toHaveTextContent(/Add Employee/i);

    expect(inputFirstName).toHaveValue("");

    expect(inputFirstName).toHaveClass(/is-invalid/i);
    expect(inputFirstName).toHaveClass(/is-invalid/i);
    const invalidFirstNameText = screen.getByText(/First name is required/i);
    expect(invalidFirstNameText).toBeInTheDocument();

    expect(inputLastname).toHaveValue("");
    expect(inputLastname).toHaveClass(/is-invalid/i);
    const invalidLastNameText = screen.getByText(/Last name is required/i);
    expect(invalidLastNameText).toBeInTheDocument();

    expect(inputEmail).toHaveValue("");
    expect(inputEmail).toHaveClass(/is-invalid/i);
    const invalidEmailText = screen.getByText(/Email is required/i);
    expect(invalidEmailText).toBeInTheDocument();
  });

  it("should Not show errors on input fields when input has values and proceed", async () => {
    useParams.mockReturnValue({});

    //mock
    addEmployee.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    await act(async () => render(<EmployeeComponent />));

    const buttonItem = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();

    //Header
    const titleHeader = screen.getByRole("heading");
    expect(titleHeader).toHaveTextContent(/Add Employee/i);

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    fireEvent.change(inputFirstName, { target: { value: "John" } });
    fireEvent.change(inputLastname, { target: { value: "Doe" } });
    fireEvent.change(inputEmail, { target: { value: "john@doe.com" } });

    await act(async () => user.click(buttonItem));

    screen.debug();
  });

  it("should Handle catch error on Add", async () => {
    useParams.mockReturnValue({});

    addEmployee.mockRejectedValueOnce();

    await act(async () => render(<EmployeeComponent />));

    const buttonItem = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();

    //Header
    const titleHeader = screen.getByRole("heading");
    expect(titleHeader).toHaveTextContent(/Add Employee/i);

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    fireEvent.change(inputFirstName, { target: { value: "John" } });
    fireEvent.change(inputLastname, { target: { value: "Doe" } });
    fireEvent.change(inputEmail, { target: { value: "john@doe.com" } });

    await act(async () => user.click(buttonItem));

    screen.debug();
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

    //Header
    const titleHeader = screen.getByRole("heading");
    expect(titleHeader).toHaveTextContent(/Update Employee/i);

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);
    expect(inputFirstName).toHaveValue("John");
    expect(inputLastname).toHaveValue("Doe");
    expect(inputEmail).toHaveValue("john.doe@example.com");

    screen.debug();
  });

  it("should Handle catch error when employee ID is not found", async () => {
    useParams.mockReturnValue({ id: "11123" });

    getEmployee.mockRejectedValueOnce();

    await act(async () => render(<EmployeeComponent />));

    screen.debug();
  });

  it("should show no input errors when Submitting Edit employee", async () => {
    useParams.mockReturnValue({ id: "11123" });

    getEmployee.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    updateEmployee.mockResolvedValue({
      data: {
        firstName: "Mary",
        lastName: "Jane",
        email: "mary@jane.com",
      },
    });

    await act(async () => render(<EmployeeComponent />));

    //Submit button
    const buttonItem = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    fireEvent.change(inputFirstName, { target: { value: "Mary" } });
    fireEvent.change(inputLastname, { target: { value: "Jane" } });
    fireEvent.change(inputEmail, { target: { value: "mary@jane.com" } });

    await act(async () => user.click(buttonItem));
    screen.debug();
  });

  it("should handle update catch error", async () => {
    useParams.mockReturnValue({ id: "11123" });

    getEmployee.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    updateEmployee.mockRejectedValueOnce();

    await act(async () => render(<EmployeeComponent />));

    //Submit button
    const buttonItem = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();

    //Input
    const inputFirstName = screen.getByTestId(`form-field-firstname`);
    const inputLastname = screen.getByTestId(`form-field-lastname`);
    const inputEmail = screen.getByTestId(`form-field-email`);

    fireEvent.change(inputFirstName, { target: { value: "Mary" } });
    fireEvent.change(inputLastname, { target: { value: "Jane" } });
    fireEvent.change(inputEmail, { target: { value: "mary@jane.com" } });

    await act(async () => user.click(buttonItem));
    screen.debug();
  });
});
