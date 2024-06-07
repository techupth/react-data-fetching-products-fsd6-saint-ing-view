import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");

    setProduct(result.data.data);
    //console.log(result.data.data);
  };

  const handleDelete = async (productId) => {
    //console.log(productId);
    const result = await axios.delete(
      "http://localhost:4001/products/" + productId
    );
    //console.log(result);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {product.map((item) => (
          <div className="product" key={item.id}>
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
              onClick={() => handleDelete(item.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
