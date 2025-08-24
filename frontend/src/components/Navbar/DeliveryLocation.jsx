import React from "react";
import { MapPin } from "lucide-react";

const DeliveryLocation = () => {
  return (
    <div className="hidden cursor-pointer rounded border px-2 py-1 shadow-md lg:flex lg:items-center lg:gap-1">
      <MapPin size={20} />
      Deliver to Indore
    </div>
  );
};

export default DeliveryLocation;
