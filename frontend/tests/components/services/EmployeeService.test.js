import React from "react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi} from "vitest";
import axios from "axios";
import {
  addEmployee,
  deleteEmployyee,
  getEmployee,
  listEmployees,
  updateEmployee,
} from "../../../src/services/EmployeeService";

vi.mock("axios");

describe("EmployeeService.test", () => {
  it("should return a listEmployees", async () => {
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
    const response = await listEmployees();
    console.log(response.data);

    expect(response.data).toEqual(employees);
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_REST_API_BASE_URL}/api/employees`
    );
  });

  it("should return a listEmployees", async () => {
    const newEmployee = { id: 2, name: "Jane Smith" };

    axios.post.mockResolvedValue({ data: newEmployee });

    const response = await addEmployee();
    console.log(response.data);

    expect(response.data).toEqual(newEmployee);
    console.log(response);
  });

  it("should return an Employee", async () => {
    const employee = { id: 2, name: "Jane Smith" };

    axios.get.mockResolvedValue({ data: employee });

    const response = await getEmployee();
    console.log(response.data);

    expect(response.data).toEqual(employee);
    console.log(response);
  });

  it("should update Employee", async () => {
    const employee = { id: 2, name: "Jane Smith" };

    axios.put.mockResolvedValue({ data: employee });

    const response = await updateEmployee();
    console.log(response.data);

    expect(response.data).toEqual(employee);
    console.log(response);
  });

  it("should update Employee", async () => {
    const employeeId = 2;

    axios.delete.mockResolvedValue({ data: employeeId });

    const response = await deleteEmployyee();
    console.log(response.data);

    expect(response.data).toEqual(employeeId);
    console.log(response);
  });
});
