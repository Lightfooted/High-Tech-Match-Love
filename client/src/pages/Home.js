import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import SelectUserImage from "../components/SelectUserImage";

const Home = () => {
  const [currentCategory, setCategory] = useState("");

  return (
    <div className="container">
      <CategoryMenu setCategory={setCategory} />
      <SelectUserImage setCategory={setCategory} />
      <ProductList currentCategory={currentCategory} />
    </div>
  );
};

export default Home;
