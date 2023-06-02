import React from 'react'
import { useSelector } from 'react-redux'
import { cartCover } from "../assets/assetsindex";
import CartItem from '../components/CartItem';

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  // console.log(productData);
  return (
    <div>
    <img className='w-screen h-cartPage object-cover' src={cartCover} alt='cartCover'/>
    <div>
      <CartItem />
    </div>
    </div>
  )
}

export default Cart