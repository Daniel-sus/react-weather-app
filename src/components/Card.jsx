import React from "react";

const Card = ({ city, cityName, icon, weather, temp, setDraggingItem }) => {
  const onDragStartHandler = () => {
    setDraggingItem(city);
  };

  return (
    <div
      className="cardWrapper"
      draggable={true}
      onDragStart={(e) => onDragStartHandler()}
    >
      <div className="cardWrapper__cityName">{cityName}</div>
      <img className="cardWrapper__icon" src={icon} alt="icon" />
      <div className="cardWrapper__weather">{weather}</div>
      <div className="cardWrapper__temp">{temp} ℃</div>
    </div>
  );
};

export default Card;
