import "./App.css";
import React, { useEffect, useState } from "react";
const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/food", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="card">
          <ul className="product-list">
            {list.map((content, key) => (
              <li key={key}>
                <div className="product">
                  <div className="product-image">
                    <img src={content.image} />
                  </div>
                  <div className="product-imformation">
                    <h4>{content.name}</h4>
                    <div className="specification">
                      <span>{content.additionalInfo}</span>
                      <small className="line"></small>
                      <span>{content.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
