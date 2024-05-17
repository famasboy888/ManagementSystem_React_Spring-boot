import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import FooterComponent from "../../src/components/FooterComponent";

describe("FooterComponent.test", () => {
  it("should render Footer component", () => {
    render(<FooterComponent />);
    screen.debug();

    const item = screen.getByText(/Powered by React/i);
    expect(item).not.toBeNull();
  });
});
