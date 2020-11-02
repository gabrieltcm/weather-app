import React, { useContext } from "react";
import styles from "../styles/WeatherData.module.scss";

import Context from "../Context";

const WeatherData = () => {
  //access the props from Context provider stated in Main.js
  const { array_of_weather } = useContext(Context);

  //loop through the array, and output the element
  return array_of_weather.map((element, index) => {
    return (
      <div key={index} className={styles.column}>
        <div className={styles.card}>
          <h3>{element.city}</h3>
          <i className={`wi ${element.weatherIcon} display-1`}></i>
          <h3>{Math.trunc(element.temp.temp)}&deg; celcius</h3>
          <p>{element.description}</p>
        </div>
      </div>
    );
  });
};

export default WeatherData;
