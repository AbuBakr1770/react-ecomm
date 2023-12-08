import './App.css';
import React, {useEffect} from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import webfont from 'webfontloader'
import Home from './components/home/Home.js'
import Root from "./components/layout/Root";
import ProductDetail from './components/product-detail/ProductDetail';
import Products from './components/products/Products.js'
import Search from './components/search/Search.js'
import { useDispatch } from 'react-redux';
import LoginSignup from './components/user/LoginSignup.js';
import { getLoadedUserSliceFun } from './ReduxToolkitStore/Slices/UserSlice.js';
import Cookies from 'js-cookie';
// import Loading from './components/layout/Loader/Loading';



function App() {

    const dispatch = useDispatch()
   
    useEffect(() => {
        webfont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        })
                
        const loginToken = Cookies.get('isLoggedIn')
        console.log(loginToken);

            if(loginToken !== false){
                getLoadedUserSliceFun(dispatch)
            }
        
        
    }, [dispatch])



    const Router123 = createBrowserRouter([
        {
            path:"/",
            element:<Root/>,
            errorElement:<h1>this is error</h1>,
            children:[
                {
                    path:'/',
                    element: <Home/>,
                    errorElement:<h1>wrong error</h1>
                },
                {
                    path:`/product/:id`,
                    element: <ProductDetail/>,
                    errorElement:<h1>wrong error</h1>
                },
                {
                    path:'/products',
                    element:<Products/>,
                    errorElement:<h1>Products page not found</h1>

                },

                {
                    path:'/products/:keyword',
                    element:<Products/>,
                    errorElement:<h1>Product page not found</h1>

                },
                {
                    path:'/search',
                    element:<Search/>,
                    errorElement:<h1>Search page not found</h1>
                },
                {
                    path:'/login',
                    element:<LoginSignup/>,
                    errorElement:<h1>Login page error</h1>
                },
                {
                    path:'/account',
                    element:<h1>This is Account Page</h1>,
                    errorElement:<h1>Account page error</h1>
                }
            
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={Router123}/>
        </>
    );
}

export default App;
