import React from "react"
import Header from "../components/Header";
import MyGallery from "../components/Slideshow";
import ProductList from "../data/ProductList";

const Home = () => {
  return (
    <div>
      <Header />
      <MyGallery />
    </div>
  );
};

export default Home;
