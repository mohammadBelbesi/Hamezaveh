import React from "react";
import Banner from "../components/homePage/banner";
import Events from "../components/homePage/Events";
import ClosestEvent from "../components/homePage/ClosestEvent";
import Products from "../components/homePage/Products";
import BeforeMyProducts from "../components/homePage/BeforeMyProducts";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";

const Home = () => {
  return (
    <div>
        <Header />
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
        <Footer />
    </div>
  )
};

export default Home;