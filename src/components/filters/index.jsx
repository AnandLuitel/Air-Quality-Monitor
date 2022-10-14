import React, { useState } from "react";
import { Select } from "semantic-ui-react";
import "./filters.scss";

const dateOrders = [
  {
    key: "ascending",
    value: "ascending",
    text: "Ascending",
  },
  {
    key: "descending",
    value: "descending",
    text: "Descending",
  },
];

const Filters = ({ parameters, onParameterSelect, onDateOrder }) => {
  const [parameter, setSelectedParameter] = useState(null);
  const [dateOrder, setDateOrder] = useState(null);
  const paramChangeHandler = (_, { value }) => {
    setSelectedParameter(value);
    onParameterSelect(value);
  };
  const dateOrderChangeHandler = (_, { value }) => {
    setDateOrder(value);
    onDateOrder(value);
  };
  return (
    <>
      <Select
        onChange={paramChangeHandler}
        clearable
        placeholder="Filter by parameter"
        options={parameters}
        className="parameter-filter"
        value={parameter}
      />
      <Select
        onChange={dateOrderChangeHandler}
        placeholder="Sort by date"
        options={dateOrders}
        className="date-order"
        value={dateOrder}
      />
    </>
  );
};

export default Filters;
