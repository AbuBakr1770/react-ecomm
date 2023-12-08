import {Link} from 'react-router-dom'
import ReactStars from "react-rating-stars-component/dist/react-stars";
import './product.css'

const ProductCard = (props) =>{

    const {product} = props

    const options = {
        edit:false,
        activeColor:'yellow',
        value:product.ratings,
        isHalf:true,
        size: window.innerWidth < 600 ? 20 : 25,
    }

    return (
        <>
        <Link className={`productCard`} to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>

            <div className="">
                <ReactStars {...options}/>
                
                 <span>({product.noOfReviews})</span>
            </div>

            <span>{`Rs ${product.price}`}</span>
        </Link>


        </>
    )

}

export default ProductCard