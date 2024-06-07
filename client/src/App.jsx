import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resultGetData = await axios.get("http://localhost:4001/products");
    setProducts(resultGetData.data.data);
  };
  const deleteData = async (productID) => {
    const resultDeleteData = await axios.delete(
      "http://localhost:4001/products/" + productID
    );
  };

  const handleDeleteClick = (productIndex) => {
    const newProducts = [...products];
    newProducts.splice(productIndex, 1);
    setProducts(newProducts);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {products.map((item, index) => {
        return (
          <div className="product-list" key={index}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteData(item.id);
                  handleDeleteClick(index);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
