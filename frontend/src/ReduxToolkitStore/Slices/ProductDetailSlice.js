import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ProductDetails:{},
    loading:true,
    error:null
}


const ProductDetailSlice = createSlice({
    name:'ProductDetailSlice',
    initialState,
    reducers:{
        setProductDetail:(state,action)=>{
                state.ProductDetails = action.payload
                
                            
            },

            setProductDetailLoading:(state,action)=>{
                state.loading = action.payload
            }

    }
})


export default ProductDetailSlice.reducer

export const {setProductDetail,setProductDetailLoading} = ProductDetailSlice.actions