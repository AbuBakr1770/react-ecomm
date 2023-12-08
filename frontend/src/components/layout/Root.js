

import React from 'react'
import Header from "./header/header";
import {Outlet} from "react-router-dom";
import Footer from "./footer/footer";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import  UserOptions from '../layout/header/UserOptions.js'


const Root = () =>{
    const {isAuthenticated,user} = useSelector((state)=>
        state.UserSlice
    )
    return (
        <>
            <Header/>
            {isAuthenticated && <UserOptions user={user}/>}
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Root