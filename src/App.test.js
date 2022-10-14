import locationData from "./__mocks__/location-data";
import App from "./App";
import { render, waitFor } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

describe("App page", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  test("renders app page with measurements", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: locationData,
          }),
      })
    );
    let element;
    await waitFor(() => {
      element = render(<App />);
    });
    const { findAllByText, findByTestId } = element;
    // Showing the correct title
    expect(await findAllByText("Showing data for: Madison (US)")).toBeTruthy();
    // Showing the cards container
    expect(await findByTestId("cards-container")).toBeInTheDocument();
  });
});
