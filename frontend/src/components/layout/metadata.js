import React from 'react'
import {Helmet} from "react-helmet";

const MetaData = (props) => {
    let {title} = props

    return (
        <>
         <Helmet>
             <title>
                 {title}
             </title>
         </Helmet>
        </>
    )
}

export default MetaData