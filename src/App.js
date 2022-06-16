import React from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [cities, setCities] = React.useState([]);

  const [bin, setBin] = React.useState([]);

  const [over, setOver] = React.useState(false);

  const [draggingItem, setDraggingItem] = React.useState({});

  React.useEffect(() => {
    const savedBin = JSON.parse(localStorage.getItem("bin")) || ["Toronto"];
    const savedCities = JSON.parse(localStorage.getItem("cities")) || [
      {
        id: 0,
        cityName: "London",
        weather: "Light rain",
        temp: 20,
        icon: "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10d.png?1499366021284",
      },
      {
        id: 1,
        cityName: "Dubai",
        weather: "Clear",
        temp: 35,
        icon: "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01d.png?1499366022009",
      },
    ];
    setBin([...bin, ...savedBin]);
    setCities([...cities, ...savedCities]);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("bin", JSON.stringify(bin));
  }, [bin]);

  React.useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const onDragLeaveHandler = (event) => {
    event.preventDefault();
    setOver(false);
  };

  const onDragOverHandler = (event) => {
    event.preventDefault();
    setOver(true);
  };

  const onDropHandler = () => {
    setCities([...cities.filter((item) => item.id !== draggingItem.id)]);
    setBin([...bin, draggingItem.cityName]);
    setOver(false);
  };

  const deleteCities = () => {
    localStorage.removeItem("bin");
    setBin([]);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="App">
      <Modal
        cities={cities}
        setCities={setCities}
        draggingItem={draggingItem}
        setDraggingItem={setDraggingItem}
      />
      {over ? (
        <div
          onDragLeave={(e) => onDragLeaveHandler(e)}
          onDragOver={(e) => onDragOverHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          className="binover"
        >
          отпустите город
        </div>
      ) : (
        <div
          onDragLeave={(e) => onDragLeaveHandler(e)}
          onDragOver={(e) => onDragOverHandler(e)}
          className="bin"
        >
          перетащите город чтоб удалить
        </div>
      )}
      <div
        style={{
          marginTop: 10,
        }}
      >
        Удалить все города
        <button
          style={{ marginLeft: 10 }}
          disabled={bin.length <= 0}
          onClick={deleteCities}
        >
          X
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        Очистить localStorage
        <button style={{ marginLeft: 10 }} onClick={clearLocalStorage}>
          X
        </button>
      </div>
      <ul>
        {bin.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
