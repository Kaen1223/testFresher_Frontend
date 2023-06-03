import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    listBookShow : [],
    totalBook : 0,
    currentPaniganate : 1

};



export const bookContentSlice = createSlice({
  name: 'book_content',
  initialState,
  reducers: {
   
    doChangeListBook: (state,action) => {
        console.log('action',action.payload)
      state.listBookShow = action.payload.listBook,
      state.totalBook = action.payload.total
      state.currentPaniganate = action.payload.page
 
        },

  },


});

export const { doChangeListBook } = bookContentSlice.actions;


export default bookContentSlice.reducer;
