import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/bazarSlice';

const AddingToCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

const products = [
    {
      idProduct: 'phyasdasd12312312sada',
      nameOfProduct: 'חומוס',
      QuantityOfProduct: 100,
      PriceProduct: 200,
      totalPrice: 200,
      imagePath:
        'https://geneticliteracyproject.org/wp-content/uploads/2018/02/chickpeas-in-a-bowl.jpg'
    },
    {
      idProduct: 'phyasdasd12312312sa77',
      nameOfProduct: 'שקדים',
      QuantityOfProduct: 100,
      PriceProduct: 150,
      totalPrice: 150,
      imagePath:
        'https://www.eatingwell.com/thmb/WHQTHrHyDSDmA6_IqewIcFvgO8g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-happens-to-your-body-when-you-eat-nuts-every-day-090a0325cc0641159c2728496a489a4f.jpg',
    },
    {
      idProduct: 'phyasdasd12312312sa99',
      nameOfProduct: 'תמרים',
      QuantityOfProduct: 100,
      PriceProduct: 100,
      totalPrice: 100,
      imagePath:
        'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/medjool-dates-1296x728-header-1296x728.jpg?w=1155&h=1528',
    },
  ];

  return (
    <div style={{ display: "flex" }}>
  {/* Your component UI */}
  {products.map((product) => (
    <div key={product.idProduct} style={{ marginRight: "10px" }}>
      <h3>{product.nameOfProduct}</h3>
      <img className="h-20 w-20" src={product.imagePath} alt={product.nameOfProduct} />
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  ))}
</div>

  );
};

export default AddingToCart;
