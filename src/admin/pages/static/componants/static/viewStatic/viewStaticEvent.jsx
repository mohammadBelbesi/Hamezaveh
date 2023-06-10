import React , {useEffect, useState} from 'react';
import './viewStaticEvent.css'
import { BarChart } from './chartJs/BarChart'

// //import icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const ViewStaticEvent = ( {data , selectedEvent} ) => {

    //make the data to the graph
    const [barChartDataProducts , setBarChartDataProducts] = useState({})
    const [isReadyData , setIsReadyData] = useState(false)


    useEffect( ()=>{

        setTimeout(() => {
            
            if( Object.keys(data).length  > 0 && data[selectedEvent['date']] !== undefined ){

                setBarChartDataProducts({
                    labels: data[selectedEvent['date']]['products'].map( (element) => { return element['productName']} ) ,
                    datasets: [{
                        label: "סכום המכירות",
                        data: data[selectedEvent['date']]['products'].map( (element) => { return (element['quantity']/1000) } ), 
                        backgroundColor: ['rgba(87, 121, 91, 0.959)']
                    }]
                })

                setIsReadyData(true)
            }

        }, 500);

        
    },[data , selectedEvent])

    //init the varible
    const [numberOfOrders , setNumberOfOrders] = useState(0)
    const [averagePayOrder , setAveragePayOrder] = useState(0)
    const [avaragePay , setAvaragePay] = useState(0)
    const [totalPayment , setTotalPayment] = useState(0)
    const [bestProduct , setBestProduct] = useState('')

    //init the page 
    useEffect( ()=>{
        const initFunction = () => {

            if(data[selectedEvent['date']] !== undefined){

                setNumberOfOrders( data[selectedEvent['date']]['numOfRecipt'] )
                setAveragePayOrder( (data[selectedEvent['date']]['numOfProductPerOneCustomer'] / data[selectedEvent['date']]['numOfRecipt']) )
                setAvaragePay( (data[selectedEvent['date']]['totalPayment'] / data[selectedEvent['date']]['numOfRecipt']) )
                setTotalPayment( data[selectedEvent['date']]['totalPayment'] )
                setBestProduct( data[selectedEvent['date']]['products'][0]['productName'] )

                // setIsReadyData(true)
            }else{
                setNumberOfOrders( 0)
                setAveragePayOrder( 0 )
                setAvaragePay( 0 )
                setTotalPayment( 0 )
                setBestProduct( '' )
                // setIsReadyData(false)

            }
        } 
        
    initFunction()
    },[selectedEvent] )


return<>

    {Object.keys(data).length === 0 ? 'טוען..' :
        <div className="bodyStatic">

        <div className='containerMain'>

            <div className="orders">
                <h2>כללי:</h2>
                <h3> <ChevronLeftIcon/> מספר ההזמנות: { numberOfOrders } { numberOfOrders > 1 ? 'הזמנות' : 'הזמנה'}   </h3>
                <h3> <ChevronLeftIcon/> ממוצע המוצריים שלקוח קנה: { averagePayOrder } מוצריים  </h3>
                <h3> <ChevronLeftIcon/> ממוצע קניות: { avaragePay } ₪  </h3>

            </div>

            <div className="orders">
                <h2></h2>
                <h3> <ChevronLeftIcon/> סכום המכירות: { totalPayment } ₪  </h3>
                <h3> <ChevronLeftIcon/> המוצר המוזמן הכי הרבה: { bestProduct } </h3>
            </div>

        </div>

        <div className="productStatic">
            <h2>מוצריים:</h2>
            <div className="containerProduct">

                {/* list of product and quantity */}

                { data[selectedEvent['date']] !== undefined  && isReadyData ? data[selectedEvent['date']]['products'].map( (product , index) => (
                    <h3 key={index} className='productDisplay'> <ChevronLeftIcon /> {product['productName']}: <p> {product['quantity'] > 1000 ? (product['quantity']/1000) : product['quantity'] } {product['quantity'] > 1000 ? 'קילו גרם' : 'גרם'} </p> </h3>
                ) ) : ''}

            </div>

            <div className='graph'>

            {
               data[selectedEvent['date']] !== undefined  &&  isReadyData === true ? <BarChart chartData={barChartDataProducts} /> : 'טוען..'
            }   
            </div>

        </div>

    </div>
    
    }



</>

}