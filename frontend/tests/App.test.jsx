import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi, afterEach } from "vitest";
import App from "../src/App";
import axios from "axios";

vi.mock("axios");

const renderWithRouter = async (route) => {
  window.history.pushState({}, "Test page", route);
  await act(async () => render(<App />));
};

describe("App.test", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should render Home page", async () => {
    const employees = [
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

    axios.get.mockResolvedValue({ data: employees });
    await act(async () => renderWithRouter("/"));
    expect(screen.getByText(/List of Employees/i)).toBeInTheDocument();
  });
  it("should render Employee List", async () => {
    const employees = [
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

    axios.get.mockResolvedValue({ data: employees });
    await act(async () => renderWithRouter("/employees"));
    expect(screen.getByText(/List of Employees/i)).toBeInTheDocument();
  });
  it("should render Add Employee Page", async () => {
    await act(async () => renderWithRouter("/add-employee"));
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
    screen.debug();
  });
  it("should render Edit Employee Page", async () => {
    const employees = [
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

    axios.get.mockResolvedValue({ data: employees });

    await act(async () => renderWithRouter("/edit-employee/1"));
    await act(async () =>
      expect(screen.getByText(/Update Employee/i)).toBeInTheDocument()
    );
    screen.debug();
  });
  it("should render Error Page", async () => {
    await act(async () => renderWithRouter("/random"));
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    screen.debug();
  });
});
