/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Advertisement from "./Advertisement";
import AutoCursor from "./AutoCursor";
import CategoryNav from "./CategoryNav";
import ProductList from "./ProductList";
import Slider from "./Slider";

const Home = ({ childProp }) => {


  return (
    <>
      <CategoryNav />
      <Slider />

      <Advertisement />
      <ProductList searchQuery={childProp} />
      <AutoCursor></AutoCursor>

    </>
  )
}

export default Home