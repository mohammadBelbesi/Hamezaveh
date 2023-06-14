import React from 'react';
import { beans, dates, hummus, peas, nuts, rice, walnut, whiteBeans, kajo } from "../../productsPics/ProductsIndex";

const Products = () => {
  const products = [
    { name: ' שעועית', image: beans },
    { name: 'תמרים', image: dates },
    { name: 'חומוס', image: hummus },
    { name: 'אפונה', image: peas },
    { name: 'שקדים', image: nuts },
    { name: 'אורז', image: rice },
    { name: 'אגוז מלך', image: walnut },
    { name: 'שעועית לבנה', image: whiteBeans },
    { name: 'קאגו', image: kajo },
    // Add more products as needed
  ];

  return (
    <div className='py-10 flex justify-center items-center'>
      <div className='productsCards grid grid-cols-3 gap-8'>
        {products.map((product, index) => (
          <div className='productCard ' key={index}>
            <img src={product.image} alt={product.name} className='productImage productsCardsPhone' style={{ width: '1000px', height: '500px', objectFit: 'cover' }}/>
            <p className='productName hebrewTexts text-center'>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default Products;