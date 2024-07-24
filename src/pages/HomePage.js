import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/HomePage.css"; // Optional if not used

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  // Styles
  const bannerImgStyle = {
    marginTop: "60px",
  };

  const homePageTitleStyle = {
    color: "gray",
    fontFamily: `"Playfair Display", serif`,
  };

  const homePageStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const cardStyle = {
    backgroundColor: "rgba(128, 128, 128, 0.097)",
    width: "18rem",
  };

  const cardNamePriceStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const cardPriceStyle = {
    color: "green",
    fontWeight: "bold",
  };

  const buttonStyle = {
    borderRadius: "0",
    width: "100%",
    borderTopLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const cardTextStyle = {
    color: "rgb(90, 89, 89)",
  };

  const imgStyle = {
    height: "300px",
    transition: "transform 0.2s ease-in-out",
  };

  const filtersTitleStyle = {
    marginTop: "100px",
    color: "gray",
    borderBottom: "1px solid rgba(128, 128, 128, 0.337)",
  };

  const filterCategoryTitleStyle = {
    marginTop: "40px",
    color: "gray",
    borderBottom: "1px solid rgba(128, 128, 128, 0.337)",
    paddingBottom: "10px",
  };

  const resetButtonStyle = {
    backgroundColor: "black",
    width: "100%",
    border: "none",
    borderRadius: "0",
    marginTop: "20px",
  };

  const loadMoreStyle = {
    color: "green",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const buttonSpacingStyle = {
    marginRight: "10px", // Adds space between buttons
  };

  // Fetch functions and handlers
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center" style={filterCategoryTitleStyle}>
            Filter By Category
          </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4" style={filtersTitleStyle}>
            Filter By Price
          </h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              style={resetButtonStyle}
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="text-center" style={homePageTitleStyle}>
            All Products
          </h1>
          <div className="d-flex flex-wrap" style={homePageStyle}>
            {products?.map((p) => (
              <div className="card m-2" style={cardStyle} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={imgStyle}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.9)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text" style={cardTextStyle}>
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={cardPriceStyle}>
                    $ {p.price}
                  </p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary"
                      style={{ ...buttonStyle, marginRight: "10px" }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={buttonStyle}
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added to cart');
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                style={loadMoreStyle}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
