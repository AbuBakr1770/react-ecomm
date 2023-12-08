import React, { useEffect } from "react";
import { GiMouse } from "react-icons/gi";
import "./Home.css";
import Product from "../product/ProductCard";
import Metadata from "../layout/metadata";
import { useDispatch, useSelector } from "react-redux";
// import {getProduct} from "../../STORE/Actions/productActions";
import Loading from "../layout/Loader/Loading";
import { useAlert } from "react-alert";
import { getData } from "../../ReduxToolkitStore/UTILS/APIutils";
import { setProducts } from "../../ReduxToolkitStore/Slices/ProductSlice";

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.ProductSlice
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    getData().then((data) => {
      dispatch(
        setProducts({
          products: data.products,
          numOfProducts: data.numberOfProducts,
        })
      );
    });
  }, [dispatch, alert, error]);

  console.log(products);

  return (
    <>
      <Metadata title={"HOME | Ecomm"} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="banner">
            <h1>Welcome to Ecommerce</h1>
            <p>Find Products here</p>

            <a href="#container">
              <button>
                scroll <GiMouse />
              </button>
            </a>
          </div>

          <h2 className={"homeHeading"}>Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((item) => <Product key={item._id} product={item} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
