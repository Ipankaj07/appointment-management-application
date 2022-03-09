import React from "react";
import "./allCategory.css";
import MidSection from "./Category";
import { v4 as uuidv4 } from "uuid";

import Swiper from "../Swiper/Swiper";

let arrOfSpeciality = [
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Urogynaecologist",
  "Obstetrician & Gynecologist",
];

const AllCategory = () => {
  return (
    <>
      <Swiper />
      <div className="all_category_container">
        {arrOfSpeciality.map((item) => (
          <MidSection key={uuidv4()} caterogy={item} />
        ))}
      </div>
    </>
  );
};

export default AllCategory;
