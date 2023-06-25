import React, { useEffect, useState } from 'react';

//import css
import './viewStaticAll.css'
import { BarChart } from './chartJs/BarChart'

// //import icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


export const ViewStaticAll = ( {data,time , isReady} ) => {

    const [listOfProduct ,setListOfProduct ] = useState([])
    const [islistOfProductDone ,setIsListOfProductDone ] = useState(false)
    let totalPayment = 0

    //function to check the date
    const isDatePassed = (date) => {
        const currentDate = new Date();
        const inputDate = new Date(date);
  
        // Calculate the target date by adding the specified number of months to the input date
        const targetDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + time, inputDate.getDate());
  
        // Set hours, minutes, seconds, and milliseconds to 0 for all dates
        currentDate.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
      
        // Compare the target date with the current date
        if (currentDate <= targetDate) {
          // The target date has passed or is the same as the current date
          return true;
        } else {
          // The target date is in the future
          return false;
        }
  
      }


    // avarage of payment
    const getTheAveragePay = () => {
        let average = 0
        let numOfReciept = 0
        data.forEach(element => {

            if(isDatePassed(element['date'])){
                average += element['totalPayment']
                numOfReciept += element['numOfRecipt']
            }
            
        });
        totalPayment = average
        return (average/numOfReciept)
    }

    const getThOrders = () => {
        let order = 0
        data.forEach( (element) => {
            if(isDatePassed(element['date'])){
                order += element['numOfRecipt']
            }
        } )

        return order
    }

    const getThAveragePerCustomer = () => {
        let average = 0
        data.forEach(element => {
            if(isDatePassed(element['date'])){
                average += element['numOfProductPerOneCustomer'] / element['numOfRecipt']
            }
        });

        return (average)
    }

    const bestEvent = () =>{
        let bestEvent = ''
        let payment = 0

        data.forEach(element => {
            if(isDatePassed(element['date'])){
                if(element['totalPayment'] > payment){
                    payment = element['totalPayment']
                    bestEvent = element['date']
                }
            }
        });

        return [bestEvent , payment]
    }

    //function to get the product 
    const getProd = () => {

        data.forEach( (element) => {
            if(isDatePassed(element['date'])){
                element['products'].forEach( (prod) => {

                    let newList = listOfProduct
                    if( newList[ prod['productName'] ] == undefined ){
                        newList[ prod['productName'] ] = { 'productName': prod['productName'], 'quantity': prod['quantity'] }
                    }else{
                        newList[ prod['productName'] ]['quantity'] += prod['quantity']
                    }

                    setListOfProduct(newList)

                } )
            }
            setIsListOfProductDone(true)
        } )
        
    }

    //make the data for the graph
    const [barChartDataEvents , setBarChartDataEvents] = useState({})
    const [barChartDataProducts , setBarChartDataProducts] = useState({})
    const [isReadyData , setIsReadyData] = useState(false)

    useEffect( ()=>{

        if( data.length > 0){
            
            setBarChartDataEvents({
                labels: data.map( (element) => { if(isDatePassed(element['date'])) return element['date']} ) ,
                datasets: [{
                    label: "סכום המכירות",
                    data: data.map( (element) => { if(isDatePassed(element['date'])) return element['totalPayment']} ), 
                    backgroundColor: ['rgba(87, 121, 91, 0.959)']
                }]
            })
            getProd()

        }

    },[data , isReady] )

    useEffect( ()=> {
         
            if( data.length > 0){
                let arr = Object.values(listOfProduct).sort( (a,b) => { return b['quantity'] - a['quantity'] } )
                setBarChartDataProducts({
                    labels: arr.map( (element) => {  return element['productName']} ) ,
                    datasets: [{
                        label: "כמות שהוזמנה בתוקף",
                        data: arr.map( (element) => { return (element['quantity']/1000)} ), 
                        backgroundColor: ['rgba(87, 121, 91, 0.959)']
                    }]
                })
                setIsReadyData(true)
            }
    },[islistOfProductDone , isReady] )

return<>

    {isReady && islistOfProductDone ?  <div className="bodyStatic">

        <div className='containerMain'>

            <div className="mainStatic">
                <h2>כללי:</h2>
                <h3> <ChevronLeftIcon/> ממוצע קניות: {getTheAveragePay()} ₪  </h3>
                <h3> <ChevronLeftIcon/> בממוצע מספר המוצריים שלקוח קונה: {getThAveragePerCustomer()} {getThAveragePerCustomer() > 1 ? 'מוצריים' : 'מוצר'}  </h3>
                <h3> <ChevronLeftIcon/> מספר ההזמנות: {getThOrders()} {getThOrders() > 1 ? 'הזמנות' : 'הזמנה'} </h3>
                <h3> <ChevronLeftIcon/> סכום המכירות לתוקפה הנבחרה: {totalPayment} ₪ </h3>
            </div>

            <div className="eventStatic">
                <h2>אירועים:</h2>
                <h3> <ChevronLeftIcon/> האירוע הכי טוב: {bestEvent()[0]} </h3>
                <h3> <ChevronLeftIcon/> סכום המכירות: {bestEvent()[1]} ₪  </h3>
                <div className='graph'>
                    {
                         isReadyData === true ? <BarChart chartData={barChartDataEvents} /> : 'טוען..'
                    }                    
                </div>
            </div>

        </div>



        <div className="productStatic">
            <h2>מוצריים:</h2>
            <h3> <ChevronLeftIcon/>  כמיות המוצריים שהוזמנו  </h3>

            <div className='graph'>
            {
                isReadyData === true ? <BarChart chartData={barChartDataProducts} /> : 'טוען..'
            }   
            </div>

        </div>


        </div> : 'טוען...' }

   


</>

}