import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weatherReducer";
import citiesReducer from "./cityReducer";
import alertsReducer from "./alertReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  cities: citiesReducer,
  alert: alertsReducer,
});

export default rootReducer;
