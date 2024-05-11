import React from "react";
import "../styles/style.css";

const Test = () => {
  const list = [
    {
      id: 1,
      name: "Men",
      path: "/product?category=Man",
    },
    {
      id: 2,
      name: "Women",
      path: "/product?category=Women",
    },
    {
      id: 3,
      name: "Clothes",
      path: "/product?subcategory=Clothes",
    },
    {
      id: 4,
      name: "Pants",
      path: "product?subcategory=Pants",
    },
    {
      id: 5,
      name: "Shoes",
      path: "product?subcategory=Shoes",
    },
    {
      id: 6,
      name: "Accessories",
      path: "product?subcategory=Accessories",
    },
  ];

  return (
    <div className="navbar">
      {list.map((item, index) => (
        <a
          href={item.path}
          key={item.id}
          className={`hover-trigger-${
            index + 1
          } inline-block text-center font-semibold uppercase`}
        >
          {item.name}
        </a>
      ))}
      <div className="animation rounded-medium bg-default"></div>
    </div>
  );
};

export default Test;
