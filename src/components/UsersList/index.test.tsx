import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import UsersList from "./index";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";

const mockStore = configureStore({
  reducer: {
    users: () => ({
      users: [
        { id: "1", firstName: "John", lastName: "Doe", gender: "male" },
        { id: "2", firstName: "Jane", lastName: "Smith", gender: "female" },
      ],
      loading: false,
      error: null,
    }),
  },
});

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UsersList Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    });
  });

  it("renders a heading", async () => {
    render(
      <Provider store={mockStore}>
        <UsersList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(3);
    });

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent("Users List");
  });
});
