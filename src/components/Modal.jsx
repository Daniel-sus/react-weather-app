import axios from "axios";
import React from "react";
import Card from "./Card";

const Modal = ({ cities, setCities, setDraggingItem, draggingItem }) => {
  const [btnFlag, setBtnFlag] = React.useState(false);

  const handleClick = () => {
    setBtnFlag(true);
    navigator.geolocation.getCurrentPosition(async (location) => {
      try {
        const { data } = await axios.get(
          `https://fcc-weather-api.glitch.me/api/current?lon=${location.coords.longitude}&lat=${location.coords.latitude}`
        );
        setCities((prev) => [
          ...prev,
          {
            id: cities.length > 0 ? cities[cities.length - 1].id + 1 : 0,
            cityName: data.name,
            weather: data.weather[0].main,
            temp: Math.floor(data.main.temp),
            icon: data.weather[0].icon,
          },
        ]);
      } catch (error) {
        alert(
          "Мы не смогли получить данные о погоде в вашем регионе, повторите попытку"
        );
      }
      setBtnFlag(false);
    });
  };

  return (
    <div className="modalWrapper">
      <div className="topWrapper">
        <div className="weather">Weather</div>
        <button disabled={btnFlag} className="btn" onClick={handleClick}>
          Current city forecast
        </button>
      </div>
      <div className="bottomWrapper">
        {cities.map((city) => (
          <Card
            {...city}
            key={city.id}
            city={city}
            cities={cities}
            setCities={setCities}
            setDraggingItem={setDraggingItem}
            draggingItem={draggingItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Modal;
