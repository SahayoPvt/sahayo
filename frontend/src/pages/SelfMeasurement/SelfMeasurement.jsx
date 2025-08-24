import React from "react";
import MeasurementForm from "./MeasurementForm";
import { useLocation } from "react-router";

const SelfMeasurement = () => {
  const location = useLocation();

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
        {targetItem} Self Measurement
      </h2>

      {targetItem === "blouse" && (
        <MeasurementForm
          blouseMeasurementItems={blouseMeasurementItems}
          targetItem={targetItem}
        />
      )}
      {targetItem === "kurti" && (
        <MeasurementForm
          kurtiMeasurementItems={kurtiMeasurementItems}
          targetItem={targetItem}
        />
      )}
      {targetItem === "kurtiSet" && (
        <MeasurementForm
          kurtiSetMeasurementItems={kurtiSetMeasurementItems}
          targetItem={targetItem}
        />
      )}
      {targetItem === "bottom" && (
        <MeasurementForm
          bottomMeasurementItems={bottomMeasurementItems}
          targetItem={targetItem}
        />
      )}
    </div>
  );
};

export default SelfMeasurement;
