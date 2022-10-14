import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import { getMeasurementsForLocation } from "./services/data-fetcher";
import { useEffect } from "react/cjs/react.development";
import {
  Segment,
  Container,
  Message,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
import LocationDetails from "./components/location-details";
import Measurements from "./components/measurements-list";
import Filters from "./components/filters";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [location, setLocationInfo] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [parameters, setParameters] = useState(null);
  // Used for displaying the info on UI
  const [filteredMeasurements, setFilteredMeasurements] = useState(null);

  const onParameterSelect = (parameter) => {
    if (!parameter) {
      setFilteredMeasurements(measurements);
    } else {
      setFilteredMeasurements(
        measurements.filter((item) => item.parameter === parameter)
      );
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getMeasurementsForLocation();
        // Fetching location to display from first item
        setLocationInfo({
          city: data.results[0].city,
          country: data.results[0].country,
        });
        setMeasurements(data.results);
        setFilteredMeasurements(data.results);
        const parameters = new Set();
        data.results.map((item) => parameters.add(item.parameter));
        setParameters(
          [...parameters].map((item) => ({
            key: item,
            value: item,
            text: item,
          }))
        );
      } catch (_) {
        setError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  const onDateOrder = (order) => {
    setFilteredMeasurements(
      [...filteredMeasurements].sort((a, b) => {
        const aDate = new Date(a.date.local);
        const bDate = new Date(b.date.local);
        let result = aDate.getTime() - bDate.getTime();
        if (order === "descending") {
          result = result * -1;
        }
        return result;
      })
    );
  };

  return (
    <Container>
      {error && (
        <Message negative>
          <Message.Header>
            We weren't able to fetch the required info at this moment.
          </Message.Header>
          <p>Please try refreshing the page!</p>
        </Message>
      )}
      {isLoading && (
        <Segment>
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )}
      {location && <LocationDetails location={location} />}
      {parameters && (
        <Filters
          parameters={parameters}
          onParameterSelect={onParameterSelect}
          onDateOrder={onDateOrder}
        />
      )}
      {filteredMeasurements && <Measurements data={filteredMeasurements} />}
    </Container>
  );
}

export default App;
