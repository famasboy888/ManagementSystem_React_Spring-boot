import React from "react";
import { render, screen, act, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  deleteEmployyee,
  listEmployees,
} from "../../src/services/EmployeeService";
import ListEmployeeComponent from "../../src/components/ListEmployeeComponent";

vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  BrowserRouter: () => vi.fn(),
  useNavigate: () => vi.fn(),
}));

vi.mock("../../src/services/EmployeeService", async () => ({
  listEmployees: vi.fn(),
  deleteEmployyee: vi.fn(),
}));



describe("ListEmployeeComponent.test", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should display No records found when record is less than 0", async () => {
    //mock
    listEmployees.mockResolvedValue({});

    await act(async () => render(<ListEmployeeComponent />));

    const text = screen.getByText(/No data found/i);
    expect(text).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Add Employee/i });
    expect(button).toBeInTheDocument();
    screen.debug();
  });

  it("should display All Records", async () => {
    const data = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Mary",
        email: "jane.mary@example.com",
      },
      {
        id: 3,
        firstName: "Peter",
        lastName: "Parker",
        email: "peter.parker@example.com",
      },
    ];

    //mock
    listEmployees.mockResolvedValue({
      data,
    });

    await act(async () => render(<ListEmployeeComponent />));

    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows).toHaveLength(3);

    const checkRowContents = (row, idx) => {
      const columns = within(row).getAllByRole("cell");
      expect(columns[0]).toHaveTextContent(data[idx].firstName);
      expect(columns[1]).toHaveTextContent(data[idx].lastName);
      expect(columns[2]).toHaveTextContent(`${data[idx].email}`);
    };

    rows.forEach((row, idx) => {
      checkRowContents(row, idx);
    });

    screen.debug();
  });

  it("should Handle catch error when initial load", async () => {
    //mock
    listEmployees.mockRejectedValueOnce();

    await act(async () => render(<ListEmployeeComponent />));

    const text = screen.getByText(/No data found/i);
    expect(text).toBeInTheDocument();
    screen.debug();
  });

  it("should navigate to Add Employee", async () => {
    listEmployees.mockResolvedValue({});
    await act(async () => render(<ListEmployeeComponent />));

    const button = screen.getByRole("button", { name: /Add Employee/i });
    const user = userEvent.setup();

    await act(async () => user.click(button));

    screen.debug();
  });

  it("should Navigate to Edit Employee", async () => {
    const data = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Mary",
        email: "jane.mary@example.com",
      },
      {
        id: 3,
        firstName: "Peter",
        lastName: "Parker",
        email: "peter.parker@example.com",
      },
    ];

    //mock
    listEmployees.mockResolvedValue({
      data,
    });

    await act(async () => render(<ListEmployeeComponent />));

    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    const updateButton = within(rows[0]).getByRole("button", {
      name: /Update/i,
    });
    const user = userEvent.setup();

    await act(async () => user.click(updateButton));

    expect(rows).toHaveLength(3);

    // screen.debug()
  });

  it("should delete Employee Record", async () => {
    const data = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Mary",
        email: "jane.mary@example.com",
      },
      {
        id: 3,
        firstName: "Peter",
        lastName: "Parker",
        email: "peter.parker@example.com",
      },
    ];

    //mock
    listEmployees.mockResolvedValue({
      data,
    });

    deleteEmployyee.mockResolvedValue({
      data: 1,
    });

    await act(async () => render(<ListEmployeeComponent />));

    let table = screen.getByRole("table");
    let tbody = within(table).getAllByRole("rowgroup")[1];
    let rows = within(tbody).getAllByRole("row");

    const deleteButton = within(rows[0]).getByRole("button", {
      name: /Delete/i,
    });
    const user = userEvent.setup();

    await act(async () => user.click(deleteButton));
    rows = await act(async () => within(tbody).getAllByRole("row"));

    expect(rows).toHaveLength(2);
    screen.debug();
  });

  it("should handle catch error for Delete Employee", async () => {
    const data = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Mary",
        email: "jane.mary@example.com",
      },
      {
        id: 3,
        firstName: "Peter",
        lastName: "Parker",
        email: "peter.parker@example.com",
      },
    ];

    //mock
    listEmployees.mockResolvedValue({
      data,
    });

    deleteEmployyee.mockRejectedValueOnce();

    await act(async () => render(<ListEmployeeComponent />));

    let table = screen.getByRole("table");
    let tbody = within(table).getAllByRole("rowgroup")[1];
    let rows = within(tbody).getAllByRole("row");

    const deleteButton = within(rows[0]).getByRole("button", {
      name: /Delete/i,
    });
    const user = userEvent.setup();

    await act(async () => user.click(deleteButton));
  
    screen.debug();
  });
});
