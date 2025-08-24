import React, { useState } from "react";
import StyleCard from "./StyleCard";
import demoStyleImage from "../../../assets/blouse.jpg";
import PriceCard from "./PriceCard";
import { useNavigate } from "react-router";
import StylePopUp from "./StylePopUp";

const BlouseCustomDesign = () => {
  const prices = [
    {
      styles: ["Basic Blouse Stitching", "No lining", "No padding"],
      price: 299,
    },
    {
      styles: ["Bridal Blouse Stitching", "Lining", "Padding"],
      price: 499,
    },
    {
      styles: ["Basic Blouse Stitching", "Lining", "Padding"],
      price: 399,
    },
  ];
  
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currModal, setCurrModal] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  const navigate = useNavigate();

  const styles = [
    {
      styleImage: demoStyleImage,
      styleName: "Neck Style (Front)",
      types: [
        "Collar Neck",
        "Keyhole Neck",
        "Off Shoulder Neck",
        "Round Neck",
        "Square Neck",
        "V-Neck",
      ],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Neck Style (Back)",
      types: [
        "Deep U Back",
        "Round Back",
        "Square Back",
        "V-Back",
        "Backless",
        "Buttoned Back",
        "Tie-Up Back",
        "Hook Closure Back",
        "Sheer Net Back",
        "Sheer Net Back",
      ],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Sleeve Style",
      types: [
        "Cap Sleeve",
        "Elbow Sleeve",
        "Full Sleeve",
        "Half Sleeve",
        "Puff Sleeve",
        "Sleeveless",
      ],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Opening Style",
      types: ["Front Opening", "Back Opening", "Side Opening", "No Opening"],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Padded Style",
      types: ["With Padding", "Without Padding"],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Fastening Style",
      types: ["Hook & Eye", "Zipper", "Buttons", "Tie-Up"],
    },
    {
      styleImage: demoStyleImage,
      styleName: "Piping Style",
      types: ["With Piping", "Without Piping"],
    },
  ];

  const proceedToOrder = (e) => {
    e.preventDefault();

    navigate("/selfMeasurement", { state: { targetItem: "blouse" } });
  };

  return (
    <div className="mx-10 mt-24 flex flex-col gap-5">
      {showModal && (
        <StylePopUp
          setShowModal={setShowModal}
          currModal={currModal}
          styles={styles}
        />
      )}

      <section>
        <h2 className="text-2xl text-shadow-md">Blouse Custom Design</h2>
        <h3 className="text-sm text-gray-500">*Click on styles to customize</h3>
      </section>
      <section className="flex flex-wrap gap-5">
        {styles.map((style, index) => (
          <StyleCard
            key={index}
            style={style}
            setShowModal={setShowModal}
            setCurrModal={setCurrModal}
          />
        ))}
      </section>

      <button
        onClick={() => setShowPriceDetails(!showPriceDetails)}
        className="w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
      >
        Show Estimated Price
      </button>

      {showPriceDetails && (
        <h2 className="text-2xl text-shadow-md">Estimateed Price</h2>
      )}

      {showPriceDetails && (
        <form onSubmit={proceedToOrder} className="flex flex-col gap-3">
          {prices.map((price, index) => (
            <div className="flex flex-col justify-center rounded">
              <div className="flex gap-5">
                <input
                  required
                  type="radio"
                  name="price"
                  id={"price" + (index + 1)}
                />
                <label
                  htmlFor={"price" + (index + 1)}
                  className="w-full cursor-pointer"
                >
                  <PriceCard key={index} price={price} />
                </label>
              </div>
            </div>
          ))}

          <h2 className="text-2xl text-shadow-md">Select Measurement Type</h2>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <input required type="radio" name="measurement" id="readyMade" />
              <label htmlFor="readyMade" className="cursor-pointer">
                Self Measurement
              </label>
            </div>
            <div className="flex gap-2">
              <input required type="radio" name="measurement" id="custom" />
              <label htmlFor="custom" className="cursor-pointer">
                Home Measurement
              </label>
            </div>
          </div>

          <button className="my-2 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]">
            Proceed to Order
          </button>
        </form>
      )}
    </div>
  );
};

export default BlouseCustomDesign;
