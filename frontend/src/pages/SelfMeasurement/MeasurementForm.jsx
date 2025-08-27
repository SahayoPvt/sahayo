import React, { useState } from "react";

const MeasurementForm = ({
  blouseMeasurementItems,
  kurtiMeasurementItems,
  kurtiSetMeasurementItems,
  bottomMeasurementItems,
  targetItem,
}) => {
  const [measurementItems, setMeasurementItems] = useState(
    targetItem === "blouse"
      ? blouseMeasurementItems
      : targetItem === "kurti"
        ? kurtiMeasurementItems
        : targetItem === "kurtiSet"
          ? kurtiSetMeasurementItems
          : bottomMeasurementItems,
  );

  const [measurements, setMeasurements] = useState(
    measurementItems.reduce((acc, item) => {
      acc[item] = "";
      return acc;
    }, {}),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const proceedToPay = (e) => {
    e.preventDefault();

    console.log(measurements);
  };

  return (
    <form onSubmit={proceedToPay} className="mx-5 mt-5">
      <ol className="flex list-decimal flex-col gap-4">
        {measurementItems.map((item) => (
          <li key={item} className="grid w-fit grid-cols-2 items-center gap-3">
            <label htmlFor={item} className="text-lg font-medium capitalize">
              {item}
            </label>
            <input
              type="text"
              name={item}
              id={item}
              className="rounded-md border bg-[#ffebe1] p-2"
              value={measurements[item]}
              onChange={handleChange}
            />
          </li>
        ))}
      </ol>

      <button className="mt-5 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]">
        Proceed To Order
      </button>
    </form>
  );
};

export default MeasurementForm;
