import { createSlice } from "@reduxjs/toolkit";



const initialState={

    products:[],
    loading:true,
    error:null,
    numOfProducts:0,
    resultPerPage:0

}

const ProductSlice = createSlice({

    name:'ProductSlice',
    initialState,
    reducers:{

        setProducts:(state,action)=>{
            const { products,resultPerPage,numOfProducts } = action.payload


            state.products = products
            // state.numOfProducts = numberOfProducts
            state.resultPerPage = resultPerPage
            state.numOfProducts = numOfProducts
            state.loading = false
            state.error=null

        },

        clearErrors:(state,action)=>{
            state.error = null

        }
    }
})

export default ProductSlice.reducer

export const {setProducts,clearErrors} = ProductSlice.actions