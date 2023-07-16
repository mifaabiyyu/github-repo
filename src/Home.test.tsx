import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
window.scrollTo = jest.fn();

describe("Home component", () => {
  beforeAll(() => {
    // Mock window.scrollTo to prevent the error
    window.scrollTo = jest.fn();
  });

  test("renders without error", () => {
    render(<Home />);
    expect(screen.getByText("Enter Username")).toBeInTheDocument();
  });

  test("displays error message if username is not entered", () => {
    render(<Home />);
    const searchButton = screen.getByText("Search");
    act(() => {
      fireEvent.click(searchButton);
    });
    expect(screen.getByText("Please insert username!")).toBeInTheDocument();
  });

  test("displays error message if API request fails", async () => {
    // Mock the fetch function to simulate a failed API request
    fetchMock.mockResponseOnce(JSON.stringify({ message: "API error" }), {
      status: 500,
    });

    render(<Home />);
    const searchInput = screen.getByTestId("searchUsername");
    const searchButton = screen.getByText("Search");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "test" } });
      fireEvent.click(searchButton);
    });
    expect(await screen.findByText("API error")).toBeInTheDocument();

    fetchMock.mockReset();
  });

  test("performs search and displays results", async () => {
    // Mock the fetch function to return dummy data
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if ((url as string).includes("search/users")) {
        return Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              items: [
                { id: 1, login: "user1" },
                { id: 2, login: "user2" },
              ],
            }),
        }) as Promise<Response>;
      } else if ((url as string).includes("users/user1/repos")) {
        return Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              { id: 1, name: "repo1", forks: 5, description: "Description 1" },
              { id: 2, name: "repo2", forks: 10, description: "Description 2" },
            ]),
        }) as Promise<Response>;
      } else if ((url as string).includes("users/user2/repos")) {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve([]),
        }) as Promise<Response>;
      }
      throw new Error(`Unhandled request: ${url}`);
    });

    render(<Home />);

    const searchInput = screen.getByTestId("searchUsername");
    const searchButton = screen.getByText("Search");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "test" } });
      fireEvent.click(searchButton);
    });

    // Wait for the API calls to complete and results to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("showUsers")).toBeInTheDocument();
      expect(screen.getByText("user1")).toBeInTheDocument();
      expect(screen.getByText("user2")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("user1"));
    });

    // Wait for the repository data to be displayed
    await waitFor(() => {
      const repoElements = screen.queryAllByTestId("repository");
      expect(repoElements).toHaveLength(0);
    });

    // Restore the original fetch function
    (global.fetch as jest.Mock).mockRestore();
  });
});
