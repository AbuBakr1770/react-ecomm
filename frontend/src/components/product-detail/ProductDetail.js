import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import { getProductDetail } from "../../ReduxToolkitStore/UTILS/APIutils";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetail,setProductDetailLoading } from "../../ReduxToolkitStore/Slices/ProductDetailSlice";
import "./productDetail.css";
import MetaData from "../layout/metadata";
import ReviewCard from './ReviewCard.js'
import ReactStars from "react-rating-stars-component/dist/react-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import 'bootstrap/dist/css/bootstrap.min.css' 
import "swiper/css/bundle";
import Loading from "../layout/Loader/Loading";
import { useAlert } from "react-alert";


const ProductDetail = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const { id } = params;

  const { ProductDetails,loading,error } = useSelector((state) => state.ProductDetailSlice);

  const alert = useAlert()

  useEffect(() => {
    if(error){
      return alert.error(error)
  }


    getProductDetail(id).then((data) => {
      dispatch(setProductDetail(data));

      dispatch(setProductDetailLoading(false))
    });
  }, [alert, dispatch, error, id]);

  const options = {
    edit: false,
    activeColor: "yellow",
    value: ProductDetails.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <>
    {loading ? <Loading/> : (
         <>

         <MetaData title={`${ProductDetails.name} -- ECOMMERCE`} />
   
         
         <div className="ProductDetails" >
   
   
           <div className="col-md-6">
             {/* <Carousel sx={{width:'100%'}}>
                   {ProductDetails.images &&
                     ProductDetails.images.map((item, i) => (
                       <img
                         className="CarouselImage"
                         key={i}
                         src={item.url}
                         alt={`${i} Slide`}
                       />
                     ))}
                 </Carousel> */}
             <Swiper
               modules={[Navigation, Pagination, Scrollbar, A11y]}
               spaceBetween={50}
               slidesPerView={1}
               // navigation
               pagination={{ clickable: true ,type:'bullets'}}
               // scrollbar={{ draggable: true }}
             >
                               
                   {ProductDetails.images &&
                     ProductDetails.images.map((item, i) => (
                       <SwiperSlide key={i}> 
                           <img
                         className="CarouselImage"
                         
                         src={item.url}
                         alt={`${i} Slide`}
                       />
                       </SwiperSlide>
                       
                     ))}
             
             </Swiper>
           </div>
   
            <div className="col-md-6">
             <div className="detailsBlock-1">
               <h2>{ProductDetails.name}</h2>
               <p>Product # {ProductDetails._id}</p>
             </div>
             <div className="detailsBlock-2">
               <ReactStars {...options} />
               <span className="detailsBlock-2-span" style={{display:'flex'}}>
                   ({ProductDetails.noOfReviews} {ProductDetails.noOfReviews === 1 ? 'Review':'Reviews'})
               </span>
             </div>
             <div className="detailsBlock-3">
               <h1>{`Rs${ProductDetails.price}`}</h1>
               <div className="detailsBlock-3-1">
                 <div className="detailsBlock-3-1-1">
                   <button>-</button>
                   <input readOnly type="number" />
                   <button>+</button>
                 </div>
                 <button
                   disabled={ProductDetails.Stock < 1 ? true : false}
                   // onClick={addToCartHandler}
                 >
                   Add to Cart
                 </button>
               </div>
   
               <p>
                 Status:
                 <b
                   className={ProductDetails.Stock < 1 ? "redColor" : "greenColor"}
                 >
                   {ProductDetails.Stock < 1 ? "OutOfStock" : "InStock"}
                 </b>
               </p>
             </div>
   
             <div className="detailsBlock-4">
               Description : <p>{ProductDetails.description}</p>
             </div>
   
             <button className="submitReview">Submit Review</button>
           </div>  
         </div>
   
         <h3 className="reviewsHeading">Reviews</h3>
   
         {ProductDetails.reviews && ProductDetails.reviews[0] ? (
           <div className="reviews">
               {ProductDetails.reviews && ProductDetails.reviews.map((item,i)=> (<ReviewCard review={item}/>))}
   
           </div>
         ):  <p className="numOfReviews">No Reviews Yet</p> }
       </>
      

    )}
    </>
   
  );
};

export default ProductDetail;
