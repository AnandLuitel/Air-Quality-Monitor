const OPENAQ_URL = "https://api.openaq.org";

export const getMeasurementsForLocation = async () => {
  const locationId = 1601;
  const response = await fetch(
    `${OPENAQ_URL}/v2/measurements?location_id=${locationId}`
  );
  const data =  await response.json();
  return data;
};
