import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import NotFound from "../../../src/components/error/NotFound"

describe("NotFound.test", () => {
  it("should render Not found view", () => {
    render(<NotFound />);
    screen.debug();

    const item = screen.getByText(/404/i);
    expect(item).not.toBeNull();
  });
});
