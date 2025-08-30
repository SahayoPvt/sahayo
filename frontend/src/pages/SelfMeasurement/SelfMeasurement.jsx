import React, { useState } from "react";
import MeasurementForm from "./MeasurementForm";
import { useLocation, useNavigate } from "react-router";

const SelfMeasurement = () => {
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState();
  const location = useLocation();

  const navigate = useNavigate();

  const blouseMeasurementItems = [
    "Shoulder",
    "Shoulder length",
    "Front Neck Depth",
    "Chest",
    "Waist",
    "Back Neck Depth",
    "Blouse Length",
    "Sleeve Length",
    "Sleeve(around)",
    "Armhole",
  ];
  const kurtiMeasurementItems = [
    "Shoulder",
    "Shoulder length",
    "Front Neck Depth",
    "Chest",
    "Waist",
    "Back Neck Depth",
    "Kurta Length",
    "Sleeve Length",
    "Sleeve(around)",
    "Armhole",
  ];
  const kurtiSetMeasurementItems = [
    "Shoulder",
    "Shoulder length",
    "Front Neck Depth",
    "Chest",
    "Waist",
    "Back Neck Depth",
    "Kurta Length",
    "Sleeve Length",
    "Sleeve(around)",
    "Armhole",
    "Bottom Length",
    "Bottom Waist",
    "Bottom Hip",
    "Bottom Mori",
  ];
  const bottomMeasurementItems = ["Bottom Length", "Waist", "Hip", "Mori"];

  const { targetItem } = location.state || {};

  return (
    <div className="mx-8 mt-24">
      <h2 className="text-2xl uppercase text-shadow-md">
        {targetItem} Measurement
      </h2>

      <div className="my-5 flex gap-5">
        <div className="flex gap-2">
          <input
            required
            type="radio"
            name="measurement"
            id="selfMeasurement"
            value="selfMeasurement"
            onChange={(e) => setSelectedMeasurement(e.target.value)}
            checked={selectedMeasurement === "selfMeasurement"}
          />
          <label htmlFor="selfMeasurement" className="cursor-pointer">
            Self Measurement
          </label>
        </div>
        <div className="flex gap-2">
          <input
            required
            type="radio"
            // disabled
            name="measurement"
            id="homeMeasurement"
            value="homeMeasurement"
            onChange={(e) => setSelectedMeasurement(e.target.value)}
            checked={selectedMeasurement === "homeMeasurement"}
          />
          <label htmlFor="homeMeasurement" className="cursor-pointer">
            Home Measurement
          </label>
        </div>
        <div className="flex gap-2">
          <input
            required
            type="radio"
            // disabled
            name="measurement"
            id="referenceCloth"
            value="referenceCloth"
            onChange={(e) => setSelectedMeasurement(e.target.value)}
            checked={selectedMeasurement === "referenceCloth"}
          />
          <label htmlFor="referenceCloth" className="cursor-pointer">
            Reference clothing
          </label>
        </div>
      </div>

      {selectedMeasurement === "selfMeasurement" && targetItem === "blouse" && (
        <MeasurementForm
          blouseMeasurementItems={blouseMeasurementItems}
          targetItem={targetItem}
        />
      )}
      {selectedMeasurement === "selfMeasurement" && targetItem === "kurti" && (
        <MeasurementForm
          kurtiMeasurementItems={kurtiMeasurementItems}
          targetItem={targetItem}
        />
      )}
      {selectedMeasurement === "selfMeasurement" &&
        targetItem === "kurtiSet" && (
          <MeasurementForm
            kurtiSetMeasurementItems={kurtiSetMeasurementItems}
            targetItem={targetItem}
          />
        )}
      {selectedMeasurement === "selfMeasurement" && targetItem === "bottom" && (
        <MeasurementForm
          bottomMeasurementItems={bottomMeasurementItems}
          targetItem={targetItem}
        />
      )}

      {selectedMeasurement === "homeMeasurement" && (
        <button
          onClick={() => navigate("/payment")}
          className="mt-5 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Proceed To Order
        </button>
      )}
      {selectedMeasurement === "referenceCloth" && (
        <button
          onClick={() => navigate("/payment")}
          className="mt-5 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Proceed To Order
        </button>
      )}
    </div>
  );
};

export default SelfMeasurement;
