import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
const App = () => {
  const [list, setList] = useState([]);
  const [notification, setNotification] = useState([]);
  const [showFront, setShowFront] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const notificationCheckTime = 50000;
  useEffect(() => {
    if (showLoading) {
      setTimeout(() => {
        setShowLoading(false);
        setShowFront(false);
      }, 1000);
    }
  }, [showLoading]);

  useEffect(() => {
    fetchList();
  }, []);

  const getNotification = () => {
    fetch("http://localhost:5001/notification/1800", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNotification(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getNotification();
    const interval = setInterval(() => {
      getNotification();
    }, notificationCheckTime);

    return () => clearInterval(interval);
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

  const deleteItem = useCallback((id) => {
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
  }, []);

  const renderView = useCallback(() => {
    return (
      <>
        <h2 className="header">Products Purchased</h2>

        <ul className="product-list">
          {!showLoading ? (
            list.map((content, key) => (
              <li key={key}>
                <div
                  className="delete-item"
                  onClick={() => deleteItem(content.id)}
                >
                  x
                </div>
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
            ))
          ) : (
            <div className="loading">Loading...</div>
          )}
        </ul>
      </>
    );
  }, [deleteItem, list, showLoading]);

  return (
    <div className="container">
      <div className="alert-container">
        {notification.map((n) => (
          <div class="alert">
            <div
              className="delete-item"
              onClick={() => {
                setNotification((prev) => prev.filter((p) => p.id !== n.id));
              }}
            >
              x
            </div>
            <h5>{`Item Expiring in ${n.time} seconds`} </h5>
            <div className="innerText">
              {" "}
              {`Dont forget to consume the ${n.name}`}
            </div>
          </div>
        ))}
      </div>

      {!showFront ? (
        renderView()
      ) : (
        <div className=" box-view">
          <label>Select Qr Code: </label>
          <input id="browse" type="file" />
          <input
            class="btn"
            type="button"
            value="Submit"
            onClick={() => {
              setShowLoading(true);
              setShowFront(false);
            }}
          />
        </div>
      )}
      <div className="lined"></div>
      <div className="circle-parent">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  );
};

export default hot(App);
