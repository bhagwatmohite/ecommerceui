/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import CategoryNav from "./CategoryNav";
import ProductList from "./ProductList";
import Slider from "./Slider";

const Home = ({ childProp }) => {


  return (
    <>
      <CategoryNav />
      <Slider />
      <ProductList searchQuery={childProp} />
    </>
  )
}

export default Home