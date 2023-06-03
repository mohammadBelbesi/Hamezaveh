import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartCover } from '../assets/assetsindex';
import CartItem from '../components/CartItem';
import AddingToCart from '../components/addingToCart';

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    productData.forEach((item) => {
      totalPrice += (item.totalPrice * item.QuantityOfProduct)/100;
    });
    setTotalAmt(totalPrice);
  }, [productData]);

  return (
    <div>
      <img className='w-screen h-cartPage object-cover' src={cartCover} alt='cartCover' />
      <div>
        <AddingToCart />
      </div>
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem />
        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
          <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
            <h2 className='text-2xl font-medium'>סכום העגלה</h2>
            <p className='flex items-center gap-4 text-base'>
              סכום{' '}
              <span className='font-titleFont font-bold text-lg'>
                {totalAmt} ₪
              </span>
            </p>
          </div>
          <p className='font-titleFont font-semibold flex justify-between mt-6'>
            הסכום הסופי
            <span className='text-xl font-bold'>{totalAmt} ₪</span>
          </p>
          <button className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'>
            עבור לתשלום
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
