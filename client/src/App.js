import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";

const App = () => {
  const [list, setList] = useState([]);
  const [notification, setNotification] = useState([]);
  const [showFront, setShowFront] = useState(true);
  const [currentFile, setCurrentFile] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const notificationCheckTime = 1800000;
  const uploadData = [
    {
      name: "Banana",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
      expiryDate: "August 30, 2022 12:28:30",
      additionalInfo: "Knock knock, banana",
    },
    {
      name: "Apple",
      image:
        "https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg",
      expiryDate: "August 28, 2022 10:46:30",
      additionalInfo: "Apple doesnt infact keep the doctor away",
    },
    {
      name: "Milk",
      image:
        "https://images.squarespace-cdn.com/content/v1/60271465598ca61a670b27b0/1613185767567-V8ES6QEAM94EJ8JUL3RM/Camperdown+Fresh+Low+Fat+Milk+2L.png",
      expiryDate: "August 28, 2024 09:50:00",
      additionalInfo: "Milk will get frothy when spoilt",
    },
    {
      name: "Carrot",
      image:
        "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/carrots_commodity-page.png",
      expiryDate: "August 30, 2023 03:24:00",
      additionalInfo: "Carrot is good for eyes",
    },
  ];
  useEffect(() => {
    if (showLoading) {
      setTimeout(() => {
        setShowLoading(false);
        setShowFront(false);
      }, 1000);
    }
  }, [showLoading]);

  const getNotification = () => {
    fetch("http://localhost:5001/notification/3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setNotification(data);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getNotification();
    }, 10000);
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

  const addToList = () => {
    fetch("http://localhost:5001/food", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    }).then(() => {
      setShowLoading(true);

      fetchList();
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
          <h4
            className="go-back"
            onClick={() => {
              setCurrentFile(null);
              setShowFront(true);
            }}
          >
            Go back
          </h4>
        </ul>
      </>
    );
  }, [deleteItem, list, showLoading]);

  const handleSubmit = (e) => {
    if (currentFile) {
      addToList();
    } else {
      fetchList();
    }
    setShowFront(false);
  };
  return (
    <div className="container">
      <script src="path/to/qr-scanner.umd.min.js"></script>
      <div className="alert-container">
        {notification.map((n) => (
          <div className="alert">
            <div
              className="delete-item"
              onClick={() => {
                setNotification((prev) => prev.filter((p) => p.id !== n.id));
              }}
            >
              x
            </div>
            <h5>
              {n.time > 0
                ? `Item Expiring in ${n.time} day(s)`
                : "Warning: An item has expired"}{" "}
            </h5>
            <div className="innerText">
              {" "}
              {n.time > 0
                ? `Dont forget to consume the ${n.name}`
                : `Please discard the ${n.name} immediately`}
            </div>
          </div>
        ))}
      </div>

      {!showFront ? (
        renderView()
      ) : (
        <div className=" box-view">
          <label>Select Qr Code: </label>
          <input
            id="browse"
            type="file"
            onChange={(e) => {
              if (e.target.files?.length) {
                setCurrentFile(e.target.files);
              }
            }}
          />
          <input
            className="btn"
            type="button"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      )}
      <div className="lined"></div>
      <div className="circle-parent">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default hot(App);
