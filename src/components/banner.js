import React, { useState } from "react";
import { pic1, pic2, pic3, pic4, pic5, pic6, pic7, legumes, organic } from "../bannerImages/bannerIndex";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

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

  return (
    <div>
      <div className="w-screen relative h-[650px]">
        <div className="bannerImages object-cover flex flex-shrink-0 mx-auto overflow-x-hidden">
        {/* transition-transform duration-1000 */}
          {data[currentSlide].map((item, index) => (
            <img key={index} 
            src={item.src} 
            alt={item.alt} 
            loading="priority" />
          ))}
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-10 bottom-44">
          <div
            onClick={prevSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-green-600 hover:text-white"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-green-600 hover:text-white"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
