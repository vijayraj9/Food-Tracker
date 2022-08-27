import "./App.css";

function App() {
  const list = [
    {
      name: "Dell latitude i5",
      image: "https://i.imgur.com/ILEU18M.jpg",
      ram: "8GB",
      ssd: "256GB",
      price: "299",
    },
    {
      name: "Lenovo Altitude i7",
      image: "https://i.imgur.com/2kePJmX.jpg",
      ram: "4GB",
      ssd: "128GB",
      price: "199",
    },
    {
      name: "Microsoft Surface Pro",
      image: "https://i.imgur.com/ILEU18M.jpg",
      ram: "16GB",
      ssd: "512GB",
      price: "499",
    },
    {
      name: "Dell Xtreame 5",
      image: "https://i.imgur.com/2kePJmX.jpg",
      ram: "8GB",
      ssd: "256GB",
      price: "299",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="card">
          <ul className="product-list">
            {list.map((content) => (
              <li>
                <div className="product">
                  <div className="product-image">
                    <img src={content.image} />
                  </div>
                  <div className="product-imformation">
                    <h4>{content.name}</h4>
                    <div className="specification">
                      <span>{content.ram} RAM</span>
                      <small className="line"></small>
                      <span>{content.ssd} SSD</span>
                    </div>
                    <span>${content.price}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
