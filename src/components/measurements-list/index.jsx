import React, { useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import { getFormattedDate } from "../../utils";

const MeasurementsList = ({ data }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Card.Group data-testid="cards-container">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              onClick={() => setSelected(item)}
              data-testid={"card-" + index}
            >
              <Card.Content>
                <Card.Header>{getFormattedDate(item.date.local)}</Card.Header>
                <Card.Meta>Parameter: {item.parameter}</Card.Meta>
                <Card.Meta>
                  Value: {item.value} {item.unit}
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          open={Boolean(selected)}
          trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>Measurement details</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>Location: {selected.location}</p>
              <p>Entity: {selected.entity}</p>
              <p>Sensor: {selected.sensorType}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Close!"
              onClick={() => setSelected(null)}
              positive
            />
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default MeasurementsList;
