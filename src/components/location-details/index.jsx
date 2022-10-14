import { Container, Segment } from "semantic-ui-react";

// Component to show the location details
// Fetched from the first element of the response array
const LocationDetails = ({ location }) => {
  return (
    <Container>
      <Segment vertical>
        Showing data for: {location.city} ({location.country})
      </Segment>
    </Container>
  );
};

export default LocationDetails;
