import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   cart : []
};



export const orderItem = createSlice({
  name: 'order',
  initialState,
  reducers: {
    doAddItemToCart: (state,action) => {
        console.log(action.payload)
        let isRecur = false

        state.cart.map(item => {
            if(item.id == action.payload.id) {
                isRecur = true
                let currentQuantity = parseInt(item.quantity)
                item.quantity = currentQuantity + action.payload.quantity
                return
            }
        })

        if(isRecur == false) {
            state.cart = [...state.cart , {
                quantity : action.payload.quantity,
                id : action.payload.id,
                detail : {
                    img : action.payload.detail.thumbnail,
                    mainText : action.payload.detail.mainText,
                    price : action.payload.detail.price,
                    total : action.payload.detail.total
                }
            }]
        }
       

    },

    doChangeQuantity: (state ,action) => {
        state.cart.map(item => {
            if(item.id == action.payload.id) {     
                         
                item.quantity = +action.payload.quantity
                item.detail.total = item.quantity * item.detail.price
                return
            }
        })
    },

    doRemoveItem: (state ,action) => {
        state.cart.splice(action.payload , 1)
    },


    doOrderSuccess: (state) => {
        state.cart = []
    }

    

 

  },


});

export const { doAddItemToCart ,doChangeQuantity , doRemoveItem , doOrderSuccess} = orderItem.actions;


export default orderItem.reducer;