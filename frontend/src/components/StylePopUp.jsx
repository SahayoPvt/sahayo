import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const StylePopUp = ({
  setShowModal,
  styles,
  currModal,
  setSelectedStyles,
  selectedStyles,
}) => {
  const [currentStyle, setCurrentStyle] = useState(
    styles.filter((style) => style.styleName === currModal)[0],
  );

  const [selectedOption, setSelectedOption] = useState();

  // console.log("Current Style:", currModal);

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm select-none"
      ref={modalRef}
    >
      <div className="relative flex w-fit flex-col items-center gap-3 rounded-xl bg-[#FFF2EB] p-7">
        <IoClose
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-white/80"
        />
        <h2 className="text-2xl text-shadow-md">
          Select {currentStyle.styleTitle}
        </h2>
        <div className="flex max-h-80 max-w-130 flex-wrap items-center justify-center gap-3 overflow-auto py-2 2xl:max-h-95 2xl:max-w-160">
          {currentStyle.types.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedOption(style)}
              className="flex flex-col justify-around gap-1 rounded-lg border border-gray-300 bg-white p-2 text-center text-sm font-medium shadow-md hover:bg-gray-100 focus:bg-[#ffd1d1]"
            >
              <img
                src={currentStyle.styleImage}
                className="h-25 object-cover 2xl:h-32"
                alt="styleImage"
              />
              {style}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedStyles({
              ...selectedStyles,
              [currModal]: selectedOption,
            });
            setShowModal(false);
          }}
          className="w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StylePopUp;
