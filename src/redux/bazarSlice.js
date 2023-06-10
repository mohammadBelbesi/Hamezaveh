import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    productData: [],
    total: 0,
    isMember: false,
    email: "", // Add the email state
    isLogin: false,
    selectEvent: {},
    userInfo: null,
};

export const bazarSlice = createSlice({
    name: "bazar",
    initialState,
    reducers: {
    //   addToCart: (state, action) => {
    //     state.productData.push(action.payload);
    //     // state.total.push(action.payload);
    //     // state.isMember.push(action.payload);
    //     // state.userInfo.push(action.payload);
    //   },
        addToCart: (state, action) => {
        const item = state.productData.find(
          (item) => item.idProduct === action.payload.idProduct
        );
        if (item) {
            item.QuantityOfProduct += action.payload.QuantityOfProduct;
          } else {
            state.productData.push(action.payload);
          }
        },
        increamentQuantity: (state, action) => {
            const item = state.productData.find(
              (item) => item.idProduct === action.payload.idProduct
            );
            if (item) {
              item.QuantityOfProduct += 100;
            }
          },
          decrementQuantity: (state, action) => {
            const item = state.productData.find(
              (item) => item.idProduct === action.payload.idProduct
            );
            if (item && item.QuantityOfProduct) {
              if (item.QuantityOfProduct === 100) {
                item.QuantityOfProduct = 100;
              } else {
                item.QuantityOfProduct -= 100;
              }
            }
          },
          deleteItem: (state, action) => {
            state.productData = state.productData.filter(
              (item) => item.idProduct !== action.payload
            );
          },
          resetCart: (state) => {
            state.productData = [];
            state.total = 0
          },
          setMember:(state , action)=>{
            state.isMember = action.payload
          },
          setLogin:(state , action) => {
            state.isLogin = action.payload
          },
          setSelectEvent:(state , action)=>{
            state.selectEvent = action.payload
          },
          setEmailf: (state, action) => { // Add the setEmail reducer
            state.email = action.payload;
          },
          setPrice:(state, action) => {
            state.total = action.payload
          },
          decrementTotal:(state, action) => {
            state.total -= action.payload
          }
    },
  });

  export const {
    addToCart,
    deleteItem,
    resetCart,
    increamentQuantity,
    decrementQuantity,
    setMember,
    setEmailf,
    setLogin,
    setSelectEvent,
    setPrice,
    decrementTotal,
    //addUser,
    //removeUser,
  } = bazarSlice.actions;
  
  export default bazarSlice.reducer ;
// export const {addToCart} = bazarSlice.actions;
// export default bazarSlice.reducer;


