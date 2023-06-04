import React from "react";
import Banner from "../components/homePage/banner";
import Events from "../components/homePage/Events";
import ClosestEvent from "../components/homePage/ClosestEvent";
import Products from "../components/homePage/Products";
import BeforeMyProducts from "../components/homePage/BeforeMyProducts";

const Home = () => {
  return (
    <div>
        <Banner />
        <h1 className="hebrewTexts text-center">הפתעה!!</h1>
        <ClosestEvent/>
        <br></br>
        <h1 className="hebrewTexts text-center">עוד אירועים קרובים</h1>
        <Events />
        <br></br>
        <BeforeMyProducts />
        <br></br>
        <Products />
        <br></br>
    </div>
  )
};

export default Home;