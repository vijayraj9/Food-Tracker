import "./App.css";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
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
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5001/food/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((_data) => {
        fetchList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <ul className="product-list">
            {list.map((content, key) => (
              <li key={key}>
                <button onClick={() => deleteItem(content.id)}>DELETE</button>
                <div className="product">
                  <div className="product-image">
                    <img src={content.image} alt={content.name} />
                  </div>
                  <div className="product-imformation">
                    <h4>{content.name}</h4>
                    <div className="specification">
                      <span>{content.additionalInfo}</span>
                      <small className="line"></small>
                      <span>{content.expiryDate} </span>
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

export default hot(App);
