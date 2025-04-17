import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersList from "./index";
import StoreProvider from "@/lib/StoreProvider";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Page", () => {
  it("renders a heading", () => {
    // Mock the router implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    });

    render(
      <StoreProvider>
        <UsersList />
      </StoreProvider>
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
