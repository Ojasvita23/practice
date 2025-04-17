import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersList from "./index";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../hooks/useFetchData", () => ({
  __esModule: true,
  default: () => ({
    data: [
      { id: "1", firstName: "John", lastName: "Doe", gender: "male" },
      { id: "2", firstName: "Jane", lastName: "Smith", gender: "female" },
    ],
    loading: false,
    error: null,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    users: () => ({}),
  },
});

describe("UsersList Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    });
  });

  it("renders a heading", () => {
    render(
      <Provider store={mockStore}>
        <UsersList />
      </Provider>
    );

    const heading = screen.getByText("Users List");
    expect(heading).toBeInTheDocument();
  });
});
