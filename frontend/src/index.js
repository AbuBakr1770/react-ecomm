import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
// import store from './STORE/Store'
import { positions,transitions,Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import toolkitStore from './ReduxToolkitStore/ToolkitStore';


const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
    timeOut:5000,
    transition:transitions.SCALE,
    position:positions.BOTTOM_CENTER
}

root.render(

 <Provider store={toolkitStore} >

        <AlertProvider template={AlertTemplate} {...options}>
             <App />
        </AlertProvider>

    
 </Provider>

);
