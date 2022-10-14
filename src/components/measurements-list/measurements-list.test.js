import { render } from "@testing-library/react";
import Measurement from "./";
import locationData from "../../__mocks__/location-data";
import { getFormattedDate } from "../../utils";

describe("App page", () => {
  test("renders app page with measurements", () => {
    const sut = render(<Measurement data={locationData} />);
    const { getByTestId, findByText } = sut;
    const formattedDate = getFormattedDate(locationData[0].date.local);
    // First element should be present
    const element = getByTestId("card-0");
    expect(element).toBeTruthy();
    // Date should be preset!
    expect(findByText(formattedDate)).toBeTruthy();
  });

  test("renders all measurements", () => {
    const sut = render(<Measurement data={locationData} />);
    const { getByTestId } = sut;
    const element = getByTestId("cards-container");
    expect(element.children.length).toBe(locationData.length);
  });

  test("Not render anything if no location data", () => {
    const sut = render(<Measurement data={[]} />);
    const { getByTestId } = sut;
    const element = getByTestId("cards-container");
    expect(element.children.length).toBe(0);
  });
});
