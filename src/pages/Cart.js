import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  // console.log(productData);
  return (
    <div>Cart</div>
  )
}

export default Cart