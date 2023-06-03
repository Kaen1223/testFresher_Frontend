
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
 isAuthenticated : false,
 isLoadingRedux : true,
 isLogOut : true,
 password : "",
 user: {
    "email": "",
    "phone": "",
    "fullName": "",
    "role": "",
    "avatar": "",
    "id": "",
  
  }
};



export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doLoginAction: (state,action) => {
    
        state.isAuthenticated = true,
        state.isLoadingRedux = false,
        state.isLogOut = false,
        state.user = action.payload.data
        state.password = action.payload.password
   
    },

    doLogOutAction: (state) => {
    
      state.isAuthenticated = false,
      state.isLogOut = true,
      state.isLoadingRedux = false,
      state.password = "",
      state.user = {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
      }
 
  },

  doUpdateInfo: (state,action) => {
    
    state.user = {   
      ...state.user, 
      "phone": action.payload.phone,
      "fullName": action.payload.fullName,
      "avatar": action.payload.avatar,

    }
},
   
doChangePassword: (state,action) => {
  state.password = action.payload

  }


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

export const { doLoginAction ,doLogOutAction , doUpdateInfo ,doChangePassword} = accountSlice.actions;


export default accountSlice.reducer;
