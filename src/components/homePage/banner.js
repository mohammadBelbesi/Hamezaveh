import React, { useState, useEffect } from "react";
import { pic1, pic2, pic3, pic4, pic5, pic6, pic7, legumes, organic } from "../../bannerImages/bannerIndex";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const data = [
    [
      { src: legumes, alt: 'legumes' },
      { src: pic2, alt: 'pic2' },
    ],
    [
      { src: pic3, alt: 'pic3' },
      { src: pic1, alt: 'pic1' },
    ],
    [
      { src: pic5, alt: 'pic5' },
      { src: pic6, alt: 'pic6' },
    ],
    [
      { src: pic7, alt: 'pic7' },
      { src: pic4, alt: 'pic4' },
      { src: organic, alt: 'organic' },
    ]
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // Automatically change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-screen relative h-[650px]">
        <div className="bannerImages object-cover flex flex-shrink-0 mx-auto overflow-x-hidden">
          {/* transition-transform duration-1000 */}
          {data[currentSlide].map((item, index) => (
            <img key={index} 
              src={item.src} 
              alt={item.alt} 
              loading="priority" 
            />
          ))}
        </div>
        <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 flex justify-between">
          
          <div
            onClick={nextSlide}
            className="w-14 h-14 rounded-full hover:cursor-pointer bg-white bg-opacity-50 flex items-center justify-center hover:bg-opacity-100 my-bg-color hover:text-white"
          >
            <FaChevronRight className="text-3xl" />
          </div>
          <div
            onClick={prevSlide}
            className="w-14 h-14 rounded-full hover:cursor-pointer bg-white bg-opacity-50 flex items-center justify-center hover:bg-opacity-100  my-bg-color hover:text-white"
          >
            <FaChevronLeft className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;