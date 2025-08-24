import React from "react";
import { useNavigate } from "react-router";
const CategoryCard = ({ categoryName, categoryImage, categoryPath }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(categoryPath)}
      className="flex cursor-pointer flex-col items-center gap-1"
    >
      <div className="flex h-60 w-45 items-center justify-center rounded-lg shadow-md">
        <img
          src={categoryImage}
          alt="CategoryPicture"
          className="h-full w-full rounded-lg object-cover object-top"
        />
      </div>
      <span className="text-shadow-md">{categoryName}</span>
    </div>
  );
};

export default CategoryCard;
