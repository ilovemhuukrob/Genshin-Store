import React from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { accessories, apparel, collectibles } from "../data/menuItems";
import PopUp from "./PopUp";
import SearchProduct from "./SearchProduct";
import {
  tops,
  bottoms,
  sales,
  badges,
  pins,
  standees,
  plush,
  mugs,
  figures,
  keychains,
  mousepads,
} from "../data/ProductList";
import Product from "./Product";
import Search from "../pages/Search";
import { Link } from "react-router-dom";

// แถบ Navigator ด้านบนที่จะอยู่ในทุกๆหน้าและจะแสดง Catagories ทุกๆชนิด

export const Tabs = (props) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className="tabs">
      <a href={props.url} onMouseOver={handleMouseOut}>
        <div className="menu-items">{props.title}</div>
      </a>
    </div>
  );
};

const TabsExpends = (props) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const Expends = (props) => {
    return (
      <div className="expends">
        <div className="expends_item">
          <a href={props.url}>Shop All</a>
        </div>
        <div className="expends_item">
          {props.menu.map((menu, index) => {
            return <a href={menu.url}>{menu.title}</a>;
          })}
        </div>
        {props.menu.slice(props.menu.length - 2).map((data) => (
          <a href={data.url} className="expends_item_img">
            <img src={data.pic} />
            <p>{data.pictitle}</p>
          </a>
        ))}
      </div>
    );
  };
  return (
    <div>
      <a
        href={props.url}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="menu-items">
          {props.title}
          <RiArrowDropDownFill style={{ color: "#444444", fontSize: "2vw" }} />
        </div>
      </a>
      {isHovering ? (
        <div
          className="dropdown"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Expends menu={props.menu} url={props.url} />
        </div>
      ) : null}
    </div>
  );
};

const Navbar = () => {
  var Products = tops.concat(
    bottoms,
    sales,
    badges,
    pins,
    standees,
    plush,
    mugs,
    figures,
    keychains,
    mousepads
  );
  const [searchProduct, setSearchProduct] = React.useState("");
  const filteredProduct = Products.filter((product) => {
    return product.name.toLowerCase().includes(searchProduct.toLowerCase());
  });
  const productElementsSearch = filteredProduct
    .slice(0, 4)
    .map((list, index) => {
      return (
        <div>
          <Product key={index} list={list} />
        </div>
      );
    });
    return (
    <nav>
      <div className="tab-wrapper">
        <TabsExpends url="/apparel" title="APPAREL" menu={apparel} />
        <TabsExpends
          url="/collectibles"
          title="COLLECTIBLES"
          menu={collectibles}
        />
        <TabsExpends
          url="/accessories"
          title="ACCESSORIES"
          menu={accessories}
        />
        <Tabs url="/sale" title="SALE" link="/Sale" />
      </div>

      <div className="action-wrapper">
        <SearchProduct value={searchProduct} onValueChange={setSearchProduct} />
        {filteredProduct.length == 0 ? (
          <div
            className="search-content-wrapper"
            style={{ color: "white", height: "20vh", zIndex: "2" }}
          >
            No Result
          </div>
        ) : null}
        {searchProduct == "" ? null : (
          <div className="search-content-wrapper" style={{ zIndex: "1" }}>
            <div className="search-content">{productElementsSearch}</div>
            <div style={{width:"20%"}}><a href={"/search/"+searchProduct} className="var">View All Results ({filteredProduct.length})</a></div>
          </div>
        )}
        <a id="cart-wrapper" href="/cart">
          <TiShoppingCart style={{ color: "#ffffff", fontSize: "1.5vw" }} />
        </a>
        <PopUp />
      </div>
    </nav>
  );
};

export default Navbar;
