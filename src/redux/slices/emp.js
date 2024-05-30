import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "../store";
const initialState = {
  isLoading: false,
  error: null,
  postData: [],
  empData: [],
  deletePostData: [],
};

const slice = createSlice({
  name: "emp",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.postData.push(action.payload);
    },

    getEmpSuccess(state, action) {
      state.isLoading = false;
      state.empData = action.payload;
    },

    getDeleteData(state, action) {
      console.log(state.deletePostData,"kkkkkkkkkkkkkkkkkkkkkkkks");
      state.deletePostData = state.deletePostData.filter(
        (ele) => ele.id !== action.payload
      );
    },
  },
});

export default slice.reducer;



export function getEmp() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(slice.actions.getEmpSuccess(response.data));
      console.log(response.data, "iuryei");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//-----------------------------------------------------------------------------



export function deleteUsers(id) {
  console.log(id,"idd");
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      console.log('ugdsahgsajsajkfsahnks')
   
      dispatch(slice.actions.getDeleteData(id).then((res)=>{
        console.log(res,"tttt");
      })
      )
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
