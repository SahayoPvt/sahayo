import React, { useEffect, useState } from "react";
import StyleCard from "../../../components/StyleCard.jsx";
import demoStyleImage from "../../../assets/blouse.jpg";
import PriceCard from "../../../components/PriceCard.jsx";
import { useNavigate } from "react-router";
import StylePopUp from "../../../components/StylePopUp.jsx";

const defaultSelectedStyles = {
  neckFront: "",
  neckBack: "",
  sleeve: "",
  padded: "",
  piping: "",
};

const prices = [
  {
    price: 299,
  },
  {
    price: 499,
  },
  {
    price: 399,
  },
];

const styles = [
  {
    styleImage: demoStyleImage,
    styleName: "neckFront",
    styleTitle: "Neck Style (Front)",
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
    styleName: "neckBack",
    styleTitle: "Neck Style (Back)",
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
    ],
  },
  {
    styleImage: demoStyleImage,
    styleName: "sleeve",
    styleTitle: "Sleeve Style",
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
    styleName: "padded",
    styleTitle: "Padded Style",
    types: ["With Padding", "Without Padding"],
  },
  {
    styleImage: demoStyleImage,
    styleName: "piping",
    styleTitle: "Piping Style",
    types: ["With Piping", "Without Piping"],
  },
];

const KurtiCustomDesign = () => {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currModal, setCurrModal] = useState();
  const [selectedStyles, setSelectedStyles] = useState(defaultSelectedStyles);

  const selectedStylesArray = Object.values(selectedStyles).filter(
    (style) => style !== "",
  );

  const navigate = useNavigate();

  const proceedToOrder = (e) => {
    e.preventDefault();

    navigate("/selfMeasurement", { state: { targetItem: "kurti" } });
  };

  return (
    <div className="mx-10 mt-24 flex flex-col gap-5">
      {showModal && (
        <StylePopUp
          setShowModal={setShowModal}
          currModal={currModal}
          styles={styles}
          setSelectedStyles={setSelectedStyles}
          selectedStyles={selectedStyles}
        />
      )}

      <section>
        <h2 className="text-2xl text-shadow-md">Kurti Custom Design</h2>
        <p className="text-sm text-gray-500">
          *Click on these styles categories to customize
        </p>
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

      {showPriceDetails && selectedStylesArray.length === 0 && (
        <p className="ml-2">No style specifications are selected</p>
      )}

      {showPriceDetails &&
        selectedStylesArray.length > 0 &&
        selectedStylesArray.length !== 5 && (
          <p className="ml-2">Please confirm all the style specifications</p>
        )}

      {showPriceDetails && selectedStylesArray.length === 5 && (
        <form onSubmit={proceedToOrder} className="flex flex-col gap-3">
          <h2 className="text-2xl text-shadow-md">Estimateed Price Options</h2>
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
                  <PriceCard
                    key={index}
                    price={price}
                    selectedStyles={selectedStyles}
                  />
                </label>
              </div>
            </div>
          ))}

          {/* <h2 className="text-2xl text-shadow-md">Select Measurement Type</h2>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <input required type="radio" name="measurement" id="readyMade" />
              <label htmlFor="readyMade" className="cursor-pointer">
                Self Measurement
              </label>
            </div>
            <div className="flex gap-2">
              <input
                required
                type="radio"
                disabled
                name="measurement"
                id="custom"
              />
              <label htmlFor="custom" className="cursor-pointer">
                Home Measurement
              </label>
            </div>
            <div className="flex gap-2">
              <input
                required
                type="radio"
                disabled
                name="measurement"
                id="custom"
              />
              <label htmlFor="custom" className="cursor-pointer">
                Reference clothing
              </label>
            </div>
          </div> */}

          <button className="my-2 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]">
            Proceed for Measurement
          </button>
        </form>
      )}
    </div>
  );
};

export default KurtiCustomDesign;
