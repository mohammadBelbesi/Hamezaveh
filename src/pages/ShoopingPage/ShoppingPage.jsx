//css import
import myStyle from './ShoopingPage.css'

//import function 
import {Dropdown} from '../../components/shopPage/dropDownMenue/Dropdown'
import {Card} from '../../components/shopPage/card/card'
import {Footer} from '../../components/shopPage/footer/footer'
import { useEffect, useState ,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart , deleteItem , resetCart } from '../../redux/bazarSlice';
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

  //init useState 
  const [totalPrice , setTotalPrice ] = useState(0)
  const [isMember , setIsMember] = useState(false)
  const [listOfProduct , setListOfProduct] = useState([])
  const [products , setProducts] = useState([])
  const [productsForSelectionEvent , setProductsForSelectionEvent] = useState([])
  const [eventDate , setEventDate] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({});
  const [listOfImg, setListOfImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  let bazarIsMember = useSelector((state) => state.bazar.isMember)


  //get the data from the firestore
  useEffect( () => {
    //get from the firbase the relevent data only on the first rendering the page
    const getEventList = async () => {
        
      try{
        //get the events from the firebase
        const events = await getDocs(eventsCollectionRef)
        const filterEvents = events.docs.map( (doc) => ( {...doc.data() ,id: doc.id} ))

        //sort the events
        filterEvents.sort( (a , b) =>  new Date(a['date'].split('T')[0]) - new Date(b['date'].split('T')[0])  )

        //get the products from the firebase
        const products = await getDocs(productsCollectionRef)
        const filterProducts = products.docs.map( (doc) => ( {...doc.data() ,id: doc.id} ))
        
        setProducts(filterProducts)
        
        //send to the componant dropDown the Events
        let listOfEvents = filterEvents.map( (obj) => { return{ 'date': obj.date.split('T')[0], 'id': obj.id } }  )
        setSelectedEvent({ 'date' :listOfEvents[0]['date'] , 'id':listOfEvents[0]['id'] ,'index':0})
        setEventDate(filterEvents)

        //get the images from the dataBase
        listAll(imgRefrence).then((response) => {
          response.items.forEach((img) => {
            getDownloadURL(img).then((url) =>{
              setListOfImg( (prev) => [...prev , {'img':url , 'path': img['_location']['path_'] } ] )
            })
          })
        })


        
      }catch(err){
        console.error(err)
      }

    }

    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    
    setIsMember(bazarIsMember)
    getEventList()
  } ,[])

  //function to add to the list the product that we choise and update the totalPrice
  const addToListOfProduct = (selectProduct , addProduct) => {

    //if the situation is to add 
    if(addProduct){
      setTotalPrice( totalPrice + selectProduct.totalPrice)

      setListOfProduct( (addListOfProduct) => {
        return [...addListOfProduct , selectProduct]
      } )

      dispatch(addToCart(selectProduct))


    }else{//the situation is to unselect the product 
      let index = listOfProduct.findIndex( (element)=> element.idProduct === selectProduct )

      if(index !== -1){//if the id in the listOfProduct then remove it 

        setTotalPrice( totalPrice - listOfProduct[index].totalPrice)
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
  }

  const selectFromTheMain = (mainProduct , mainPrice) => {
    setListOfProduct((prev) => [ ...prev , mainProduct])

    setTotalPrice((prev) => prev +mainPrice )
  }
  
  return (
    <>
      {/* <div className='loadingPage'>
        <img src="../../shopPage/components/_images/loadingPage.gif" alt="GIF Image" />
      </div> */}
      <Header className={myStyle.pageContainer} />
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
              if (bazarProduct.length > 0) {
                let check = bazarProduct.findIndex((item) => item.idProduct === product['id']);
                if (check !== -1) {
                  isTrue = true;
                  quantity = bazarProduct[check]['QuantityOfProduct'] / 100;
                  // selectFromTheMain (bazarProduct[check] , ( quantity * product['price'] ))
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