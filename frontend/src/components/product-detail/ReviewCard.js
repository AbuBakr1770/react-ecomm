import React from 'react'
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Profile from '../../images/Profile.png'
import './productDetail.css'

const ReviewCard = (props) => {

     const {review} = props


  const options = {
    edit: false,
    activeColor: "yellow",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

   

  return (
    <div className='reviewCard'>
        <img src={Profile} alt='User' />
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
        
    </div>
  )
}

export default ReviewCard