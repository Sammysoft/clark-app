/* eslint-disable */
import React from "react";
import ProductList from "../../Components/Products/ProductList";


const ProductPage = ({ route, setRoute }) => {
  return (
    <>
      <div>
        <ProductList route={route} setRoute={setRoute} />
      </div>
    </>
  );
};

export default ProductPage;
