import React from "react";
import Banner from "../components/banner";
import Events from "../components/Events";
import ClosestEvent from "../components/ClosestEvent";
import Products from "../components/Products";
import BeforeMyProducts from "../components/BeforeMyProducts";

const Home = () => {
  return (
    <div>
        <h1 className="hebrewTexts text-center">!!הפתעה</h1>
        <ClosestEvent/>
        <br></br>
        <Banner />
        <h1 className="hebrewTexts text-center">עוד אירועים קרובים</h1>
        <Events />
        <br></br>
        <BeforeMyProducts />
        <br></br>
        <Products />
    </div>
  )
};

export default Home;