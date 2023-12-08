import React, {useEffect, useState} from "react";
import {getData} from "../../ReduxToolkitStore/UTILS/APIutils";
import {setProducts} from "../../ReduxToolkitStore/Slices/ProductSlice";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../layout/Loader/Loading";
import ProductCard from "../product/ProductCard";
import "./Products.css";
import {useParams} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {Slider, Typography} from "@mui/material";
import MetaData from '../layout/metadata'

const catagories = [
    "Laptop",
    "footWare",
    "Bottom",
    "top",
    "attire",
    "camra",
    "smartPhones",
];


const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {keyword} = params;

    const {products, numOfProducts, loading, resultPerPage} = useSelector(
        (state) => state.ProductSlice
    );

    const numberOfPages = Math.ceil(numOfProducts / resultPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);

    const priceChangeHandler = (event, value) => {
        setPrice(value);
    };

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
        console.log(`currentPage is ${currentPage}`);
    };

    useEffect(() => {
        getData(currentPage, resultPerPage, price, category, keyword, ratings).then(
            (data) => {
                dispatch(
                    setProducts({
                        products: data.products,
                        resultPerPage: data.resultPerPage,
                        numOfProducts: data.numberOfProducts,
                    })
                );

                console.log(data.product);
            }
        );
    }, [category, currentPage, dispatch, keyword, price, ratings, resultPerPage]);

    console.log(products);
    return (
        <>

            <MetaData title='Products'/>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <h1 className="productsHeading">Products</h1>

                    {products.length === 0 && (
                        <h1 className="productsHeading">There are no such products</h1>
                    )}

                    <div className="products">
                        {products &&
                            products.map((item) => (
                                <ProductCard key={item._id} product={item}/>
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceChangeHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>

                        <ul className="categoryBox">
                            {catagories.map((catagory) => (
                                <li
                                    className="category-link"
                                    key={catagory}
                                    onClick={() => setCategory(catagory)}
                                >
                                    {catagory}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography>By Ratings</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, value) => {
                                    setRatings(value);
                                }}
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                                aria-labelledby="continous-slider"
                            />
                        </fieldset>
                    </div>

                    <div className="paginationBox">
                        <Pagination count={numberOfPages} onChange={setCurrentPageNo}/>
                    </div>
                </>
            )}
        </>
    );
};

export default Products;
