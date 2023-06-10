//css import
import './ShoopingPage.css'

//import function 
import {Dropdown} from '../../components/shopPage/dropDownMenue/Dropdown'
import {Card} from '../../components/shopPage/card/card'
import {Footer} from '../../components/shopPage/footer/footer'
import { useEffect, useState ,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart , deleteItem , resetCart , setSelectEvent , setPrice } from '../../redux/bazarSlice';
import Header from "../../components/homePage/Header";
import HomeFooter from "../../components/homePage/Footer";

//import from Firebase
import { database ,storage } from '../../firebase'
import { getDoc ,getDocs, collection  } from 'firebase/firestore'
import { async } from '@firebase/util'
import { ref , listAll ,getDownloadURL } from 'firebase/storage'


//export the component
export function ShoppingPage(){
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.bazar.isLogin); // Access isLogin from the bazar slice
  const dataFetchedRef = useRef(false);

  let bazarProduct = useSelector((state) => state.bazar.productData)
  let bazarTotal = useSelector((state) => state.bazar.total)

  //init useState 
  const [totalPrice , setTotalPrice ] = useState(0)
  const [listOfProduct , setListOfProduct] = useState([])
  const [products , setProducts] = useState([])
  const [productsForSelectionEvent , setProductsForSelectionEvent] = useState([])
  const [eventDate , setEventDate] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({});
  const [listOfImg, setListOfImg] = useState([]);

  //collection reference 
  const eventsCollectionRef = collection(database , "events")
  const productsCollectionRef = collection(database , "products")
  const imgRefrence = ref(storage , "productImages/")

  //function to put the product of selected item 
  const getTheProduct = () => {

    if(eventDate.length > 0){
      let ourProducts = []
      eventDate[selectedEvent['index']]['products'].forEach(function(element){
        products.forEach(function(elem){

          // element == elem['id'] ? ourProducts = [...ourProducts , elem] : ''
          if(element === elem['id']){
            ourProducts = [...ourProducts , elem]
          }
        })
      })
      setProductsForSelectionEvent(ourProducts)
    }
  }  

  //update the product when the eventDateChange
  useEffect( () => {
    getTheProduct()
  },[selectedEvent])


  let bazarSelectEvent = useSelector((state) => state.bazar.selectEvent)

  //function to check if the date valid or not :)
  const isDateInPresent = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    // Compare the dates
    if (inputDate < currentDate) {
      // The input date has passed
      return false;
    } else if (inputDate > currentDate) {
      // The input date is in the future
      return true;
    } else {
      // The input date is the same as the current date
      return true;
    }
  }

  //get the data from the firestore
  useEffect( () => {
    //get from the firbase the relevent data only on the first rendering the page
    const getEventList = async () => {
        
      try{
        //get the events from the firebase
        const events = await getDocs(eventsCollectionRef)
        const filterEvents = events.docs.map( (doc) =>  { if(isDateInPresent(doc.data()['date'])){return {...doc.data() ,id: doc.id}}} ).filter((obj) => obj !== undefined);
        //sort the events
        filterEvents.sort( (a , b) =>  new Date(a['date'].split('T')[0]) - new Date(b['date'].split('T')[0])  )

        //get the products from the firebase
        const products = await getDocs(productsCollectionRef)
        const filterProducts = products.docs.map( (doc) => { return ({...doc.data() ,id: doc.id}  )} )
        
        setProducts(filterProducts)
        
        //send to the componant dropDown the Events
        let listOfEvents = filterEvents.map( (obj) => { return{ 'date': obj.date.split('T')[0], 'id': obj.id } }  )

        if (Object.keys(bazarSelectEvent).length === 0) {
          setSelectedEvent({ 'date' :listOfEvents[0]['date'] , 'id':listOfEvents[0]['id'] ,'index':0})
          dispatch(setSelectEvent({ 'date' :listOfEvents[0]['date'] , 'id':listOfEvents[0]['id'] ,'index':0}))
        } else {
          setSelectedEvent(bazarSelectEvent)
        }

        setEventDate(filterEvents)

        //get the images from the dataBase
        listAll(imgRefrence).then((response) => {
          response.items.forEach((img) => {
            getDownloadURL(img).then((url) =>{
              setListOfImg( (prev) => [...prev , {'img':url , 'path': img['_location']['path_'] } ] )
            })
          })
        })

        //check if the total is zero or not 
        console.log(bazarTotal)
        if(bazarTotal != 0){
          console.log('if(bazarTotal != 0){')
          setTotalPrice(bazarTotal)
        }
        
      }catch(err){
        console.error(err)
      }

    }

    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    getEventList()
  } ,[])

  //function to add to the list the product that we choise and update the totalPrice
  const addToListOfProduct = (selectProduct , addProduct) => {

    //if the situation is to add 
    if(addProduct){
      setTotalPrice( totalPrice + selectProduct.totalPrice)
      dispatch(setPrice(totalPrice + selectProduct.totalPrice))

      setListOfProduct( (addListOfProduct) => {
        return [...addListOfProduct , selectProduct]
      } )

      dispatch(addToCart(selectProduct))

    }else{//the situation is to unselect the product 
      let index = listOfProduct.findIndex( (element)=> element.idProduct === selectProduct )

      if(index !== -1){//if the id in the listOfProduct then remove it 

        setTotalPrice( totalPrice - listOfProduct[index].totalPrice)
        dispatch(setPrice(totalPrice - listOfProduct[index].totalPrice))

        setListOfProduct( (addListOfProduct) => {
          return addListOfProduct.filter( obj => obj.idProduct !== selectProduct)
        } )

        dispatch(deleteItem(selectProduct))
      }
    }

  }

  const func = ( product ) => {
    for(let i = 0 ; i < listOfImg.length ; i++){
      if ( ( 'productImages/' + product['id'] ) === listOfImg[i]['path'] ){
        return listOfImg[i]['img']
      }
    }
  }

  //Choice The enent
  const selectEvent = (event) =>{
    setSelectedEvent(event)
    dispatch(resetCart())
    dispatch(setSelectEvent(event))
  }

  
  return (
    <>
      <Header />
      {isLogin ? (
        <>
          <Dropdown
            events={eventDate.map((obj) => {
              return { date: obj.date.split('T')[0], id: obj.id };
            })}
            setSelectedOption={selectEvent}
            selectedOption={selectedEvent}
          />
          <div className='ContainerOfCard'>
            {productsForSelectionEvent.map((product, index) => {
              let isTrue = false;
              let quantity = 0;
              if (bazarProduct.length > 0){
                let check = bazarProduct.findIndex((item) => item.idProduct === product['id']);
                if (check !== -1){
                  isTrue = true;
                  quantity = bazarProduct[check]['QuantityOfProduct'] / 100;
                }
              }
              return (
                <Card
                  id={product['id']}
                  key={product['id']}
                  imageUrl={func(product)}
                  title={product['name']}
                  price={product['price']}
                  howMuchToIncrease={100}
                  typeOfProduct='גרם'
                  changeTheList={addToListOfProduct}
                  isClickMain={isTrue}
                  quntatyMain={quantity}
                />
              );
            })}
          </div>
          <Footer getPrice={totalPrice} />
        </>
      ) : (
        <>
        <div className='flex flex-col items-center mx-auto' style={{ border: 'none', outline: 'none', width: '100%', minHeight: '200px', marginBottom: '141px' }}>
          <p className='text-3xl mt-4 font-medium text-red-900'>אתה צריך להיכנס לחשבונך</p>
        </div>
        <HomeFooter />
        </>
      )}
    </>
  );}  