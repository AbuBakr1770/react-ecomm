import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Cookies from 'js-cookie';
// import { loginUserFun } from "../UTILS/APIutils";
// import { useDispatch } from "react-redux";

const initialState = {
    isAuthenticated:false,
    loading:true,
    user:{},
    
}

const userSlice = createSlice({

    name:'UserSlice',
    initialState,
    reducers:{

        setUser: (state,action)=>{

            const {user,isAuthenticated,loading} = action.payload

            state.user = user
            console.log(action.payload.user);

            state.loading = loading
            state.isAuthenticated = isAuthenticated
        }

    }
})

export const {setUser} = userSlice.actions

export const loginUserSliceFun =async (email,password,dispatch) =>{

    // loginUserFun(email,password).then((data)=>{
    //     dispatch(setUser({user:data}))
    // })

    const config = {Headers : {'Content-Type':'application/json'}}

    const {data} = await axios.post(`/api/v1/login`,{email,password},config)
  
    // console.log(`logged in data is `,data.user);
    if(data){
        Cookies.set('isLoggedIn',true)
    }
  
    const loggedUser = data.user
  
    dispatch(setUser({user:loggedUser,isAuthenticated:true,loading:false}))
}

export const getLoadedUserSliceFun = async (dispatch) =>{

    const {data} = await axios.get(`/api/v1/me`)
  
    // console.log(`logged in data is `,data.user);
  
    const loggedUser = data.user
  
    dispatch(setUser({user:loggedUser,isAuthenticated:true,loading:false}))
}

export const LogOutUser = async (dispatch,navigate) =>{

     await axios.post(`/api/v1/logout`)
     dispatch(setUser({user:{},isAuthenticated:false,loading:false}))
     console.log(`logged out successfully `);
     Cookies.set('isLoggedIn',false)

     navigate('/login')
}


export const registerUserSliceFun =async (userData,dispatch) =>{

    // loginUserFun(email,password).then((data)=>{
    //     dispatch(setUser({user:data}))
    // })

    const config = {Headers : {'Content-Type':'multipart/form-data'}}

    const {data} = await axios.post(`/api/v1/register`,userData,config)
  
    // console.log(`logged in data is `,data.user);
  
    const loggedUser = data.user
  
    dispatch(setUser({user:loggedUser}))
}



export default userSlice.reducer