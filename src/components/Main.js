import React, { useState } from "react";
import axios from "axios";

//Weather Icons
import "weather-icons/css/weather-icons.css";

import Context from "../Context";

import Header from "./Header";
import Form from "./Form";
import WeatherData from "./WeatherData";
import Error from "./Error";

const Main = () => {
  // useState
  // weatherArray is our state
  // and setweatherArray is the function for us to update the weatherArray state (acts like a setState in the class based component)
  const [weatherArray, setweatherArray] = useState([]);
  const [error, setError] = useState();

  //Assigning the weather id from OpenWeather API to their specific icons
  const get_weatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        return "wi-thunderstorm";
      case rangeId >= 300 && rangeId <= 321:
        return "wi-sleet";
      case rangeId >= 500 && rangeId <= 531:
        return "wi-storm-showers";
      case rangeId >= 600 && rangeId <= 622:
        return "wi-snow";
      case rangeId >= 701 && rangeId <= 781:
        return "wi-fog";
      case rangeId === 800:
        return "wi-day-sunny";
      case rangeId >= 801 && rangeId <= 804:
        return "wi-day-fog";
      default:
        return "wi-day-fog";
    }
  };
  //The async await combination make sure that the api_call method does not go any further until axios has successfully made the request,
  // and received the data from the API.
  // Axios being a PROMISE based request, we also need to give Axios something back. So the best way to handle a PROMISE is to use ASYNC AWAIT.
  const api_call = async (e) => {
    e.preventDefault(); //prevents the page from refreshing when a form gets submitted, cause by default it refreshes
    const city = e.target.elements.city.value; //assignining the user input from the City Name... input placeholder
    if (!city)
      // eslint-disable-next-line no-sequences
      return setError("Please enter the name of the city.");

    setError(null);
    const API_KEY = "53de08b7a7ff9dbc9df4ea3a801b1bd2";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const request = axios.get(url); //do a http call with axios
    const response = await request; //all the data received from the API will be stored inside this reponse const

    // an object containing all the necessary data i want from the Openweather api
    // storing data in to a key (city,weatherIcon,temp,description)
    const weatherInfo = {
      city: response.data.name,
      weatherIcon: get_weatherIcon(response.data.weather[0].id),
      temp: response.data.main,
      description: response.data.weather[0].description,
    };

    //to check if the there is more than 3 cards, if yes return ERROR
    if (weatherArray.length >= 3)
      return setError("Only can insert 3 weather cities :(");
    // the ...(spread operator), means insterting weatherInfo in to weatherArray
    // eg:
    // const array = ["1","2","3"]
    // setArray(...array, "6")
    // OUTPUT: 1,2,3,6
    setweatherArray([...weatherArray, weatherInfo]); //assign all the data gathered from the API in to an ARRAY
  };

  return (
    <div>
      <Header />
      {/* Using the provider from context API to pass props(stated in the "value" to all components wrapped in the <Context></Context> */}
      <Context.Provider
        // assign the state and function in to a prop
        value={{
          call_the_api: api_call,
          error: error,
          array_of_weather: weatherArray,
        }}
      >
        <Form />
        <WeatherData />
        <Error />
      </Context.Provider>
    </div>
  );
};

export default Main;
