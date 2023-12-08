import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productReducer,productDetailReducer} from "./Reducers/productReducer";

const reducer = combineReducers(
    {
        productsSTATE:productReducer,
        productDetail:productDetailReducer
    }

)

let initialState = {}

let middleWare = [thunk]

const store =
    createStore(reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleWare)))

export default store