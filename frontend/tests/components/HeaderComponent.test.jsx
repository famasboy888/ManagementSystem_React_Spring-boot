import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import HeaderComponent from "../../src/components/HeaderComponent";

describe("HeaderComponent.test", () => {
  it("should render Footer component", () => {
    render(<HeaderComponent/>);
    screen.debug();

    const item = screen.getByText(/Employee Management System/i);
    expect(item).not.toBeNull();
  });
});
