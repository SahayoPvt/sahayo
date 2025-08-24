import React from "react";

const StyleCard = ({ style, setShowModal, setCurrModal }) => {
  return (
    <div
      onClick={() => {
        setShowModal(true);
        setCurrModal(style.styleName);
      }}
      className="flex cursor-pointer flex-col items-center rounded-lg hover:bg-[#ffe5d7] hover:shadow-md"
    >
      <img
        className="w-50 rounded object-cover object-top"
        src={style.styleImage}
        alt="style image"
      />
      <span className="py-1 text-shadow-md">{style.styleName}</span>
    </div>
  );
};

export default StyleCard;
