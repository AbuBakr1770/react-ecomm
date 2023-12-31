import axios from 'axios'

import {ALL_PRODUCT_REQUEST,
     ALL_PRODUCT_FAIL,
      ALL_PRODUCT_SUCCESS,
      PRODUCT_DETAIL_REQUEST,
       CLEAR_ERRORS,
       PRODUCT_DETAIL_SUCCESS,
       PRODUCT_DETAIL_FAIL} from '../Constants/productContants'

export const getProduct = () => async (dispatch) =>{

    try {
        dispatch({type:ALL_PRODUCT_REQUEST})

        const {data} = await axios.get(`/api/v1/products`)

        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})



    } catch (err){
        dispatch({type:ALL_PRODUCT_FAIL,payload:err.response.data.message})
    }
}

export const getProductDetail = (id) => async (dispatch) =>{

    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data})



    } catch (err){
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:err.response.data.message})
    }
}

export const clearErrors = () => async (dispatch) => {
    try{
        dispatch({type:CLEAR_ERRORS})
    }catch (err){

    }
}