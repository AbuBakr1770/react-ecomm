import { configureStore,combineReducers } from "@reduxjs/toolkit";
import ProductReducer from './Slices/ProductSlice'
import ProductDetail  from "./Slices/ProductDetailSlice";
import User from "./Slices/UserSlice";


const rootReducer = combineReducers({

    ProductSlice:ProductReducer,
    ProductDetailSlice:ProductDetail,
    UserSlice:User


})

const toolkitStore = configureStore({
    reducer:rootReducer
})


export default toolkitStore