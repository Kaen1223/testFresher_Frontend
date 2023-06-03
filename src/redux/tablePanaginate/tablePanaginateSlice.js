
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    current : 1 ,
    pageSize : 10 
};



export const tablePanaginate = createSlice({
  name: 'panaginate',
  initialState,
  reducers: {
    doChangePanaginate: (state,action) => {
        state.current = action.payload.current,
        state.pageSize = action.payload.pageSize

    },

 

  },

//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
});

export const { doChangePanaginate } = tablePanaginate.actions;


export default tablePanaginate.reducer;
