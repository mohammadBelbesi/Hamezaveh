import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/homePage/banner";
import Events from "../components/homePage/Events";
import ClosestEvent from "../components/homePage/ClosestEvent";
import Products from "../components/homePage/Products";
import BeforeMyProducts from "../components/homePage/BeforeMyProducts";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSurpriseSection = () => {
    const surpriseSection = document.getElementById("surpriseSection");
    if (surpriseSection) {
      const sectionTopOffset = surpriseSection.offsetTop;
      window.scrollTo({ top: sectionTopOffset, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header onEventsClick={handleScrollToSurpriseSection} />
      <Banner />
      <div id="surpriseSection">
        {/* <p className="hebrewTexts text-center">שום דבר אינו יכול לעמעם את האור שזורח מבפנים "מאיה אנג'לו"</p> */}
        <br></br>
        <br></br>
        <h1 className="hebrewTexts text-center">הפתעה!!</h1>
      </div>
      <ClosestEvent />
      <br></br>
      <div id="moreEventsSection">
        <h1 className="hebrewTexts text-center ">עוד אירועים קרובים</h1>
        <Events />
      </div>
      <br></br>
      <br></br>
      <div id="productsPics">
        <BeforeMyProducts />
      </div>
      <br></br>
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
