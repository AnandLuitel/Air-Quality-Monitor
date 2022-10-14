import { render } from "@testing-library/react";
import LocationDetails from "./";

const location = {
  city: "CITY",
  country: "COUNTRY",
};

describe("Test cases for LocationDetails component", () => {
  test("renders location details correctly", () => {
    const sut = render(<LocationDetails location={location} />);
    const { findByText } = sut;
    expect(findByText(location.city)).toBeTruthy();
    expect(findByText(location.country)).toBeTruthy();
  });

  test("renders location details with require format", () => {
    const sut = render(<LocationDetails location={location} />);
    const { findByText } = sut;
    expect(
      findByText(`Showing data for: ${location.city} (${location.country})`)
    ).toBeTruthy();
  });
});
