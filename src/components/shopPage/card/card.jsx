//import the library 
import React from 'react';
import './card.css'
import { useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {  deleteItem , decrementTotal } from '../../../redux/bazarSlice';

//maine componant to export
export const Card = ( { id,imageUrl, title, price ,howMuchToIncrease , typeOfProduct ,changeTheList , isClickMain ,quntatyMain}) => {
  const dispatch = useDispatch();

//init varaible 
  const [quntaty , setQuntaty] = useState(quntatyMain);
  const [isClicked , setIsClicked] = useState(false);
  const [isTrue , setIsTrue] = useState(false);
  const [selectProduct , setSelectProduct] = useState({});

//function done when click to the btn to add the poduct

useEffect(() => {//when the selectProduct is changed we are here

  if(isTrue == false){
    if(isClicked){
      changeTheList(selectProduct , isClicked)
    }else{
      changeTheList(id , isClicked)
    }
  }


},[selectProduct])

useEffect(() => {//when the is clicked changed we are here

  if( isTrue == false ){

    if(isClicked){
      let NewSelectProduct ={
        idProduct: id ,
        nameOfProduct:title , 
        QuantityOfProduct:(quntaty * 100) ,
        PriceProduct:price, 
        totalPrice: (quntaty*price),
        imagePath:imageUrl
      }
      setSelectProduct(NewSelectProduct)
    }else{
      setSelectProduct({})
    }

  }
      
},[isClicked])

  function handleClick(){
    if(quntaty > 0){

      if(isTrue){
        setIsTrue(false)
        dispatch(deleteItem(id)) 
        dispatch(decrementTotal( quntaty * price )) 
      }else{
        setIsClicked(!isClicked)
      }
      
    }
  }

  useEffect(()=>{
    if(isClickMain){
      setIsTrue(true)
    }
  },[])

  return (
    <div className="card">
      <img src={imageUrl} alt="product" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title} </h2>
        <div className='card-qunataty-container'>
          <p className='card-increment' onClick={ ()=> { isClicked || isTrue  ? setQuntaty(quntaty) : setQuntaty((quntaty+1))}}>+</p>
          <h2 className="card-title-quantaty">{quntaty * howMuchToIncrease}</h2>
          <p className='card-decrease' onClick={ ()=> { (quntaty>0 && isClicked===false && isTrue === false ) ? setQuntaty((quntaty-1)) : setQuntaty(quntaty) }}>-</p>
        </div>
        <h2 className="card-title-price">{price} ש"ח ל {howMuchToIncrease} {typeOfProduct}</h2> {/* ₪ */}
        {/* <h3 className='info' >ההוספה וההפכתה היא ב {howMuchToIncrease} </h3> */}
        
        <button className={isClicked || isTrue  ? 'card-btn card-btn-red' : 'card-btn card-btn-green' } onClick={ handleClick }>{ isClicked || isTrue  ? 'הסרה מהסל': 'הוספה לסל' }</button>
      </div>
    </div>
  );
};

