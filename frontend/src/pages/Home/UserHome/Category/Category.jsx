import React from "react";
import CategoryCard from "./CategoryCard";
import blouse from "../../../../assets/blouse.jpg";
import Kurti from "../../../../assets/Kurti.jpg";
import KurtiSet from "../../../../assets/KurtiSet.jpg";
import plazo from "../../../../assets/plazo.jpg";

const Category = () => {
  const categories = [
    {
      categoryName: "Designer Blouse",
      categoryPath: "/blouse",
      categoryImage: blouse,
    },
    {
      categoryName: "Kurti",
      categoryPath: "/kurti",
      categoryImage: Kurti,
    },
    {
      categoryName: "Bottom",
      categoryPath: "/bottom",
      categoryImage: plazo,
    },
    {
      categoryName: "Kurti Set",
      categoryPath: "/kurti-set",
      categoryImage: KurtiSet,
    },
  ];

  return (
    <section id="category" className="mx-8 flex flex-col gap-3 sm:mx-20">
      <h2 className="text-2xl text-shadow-md">CATEGORY</h2>
      <section className="flex gap-5 overflow-auto">
        {categories.map((cat) => (
          <CategoryCard
            categoryName={cat.categoryName}
            categoryImage={cat.categoryImage}
            categoryPath={cat.categoryPath}
          />
        ))}
      </section>
    </section>
  );
};

export default Category;
