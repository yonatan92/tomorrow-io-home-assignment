import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Types ---
type City = {
  city: string;
  country: string;
  lat: string;
  lng: string;
  isDefault?: boolean;
};

type WeatherData = {
  temperature: any;
  condition: any;
  location: any;
  humidity: any;
  precipitationProbability: any;
  uvIndex: any;
  weatherCode: any;
  windSpeed: any;
} | null;

// --- API Base URL ---
const WEATHER_API_BASE_URL =
  process.env.REACT_APP_WEATHER_API_BASE_URL || "http://localhost:3003";

// --- Async Thunks ---
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (cityObj: City) => {
    const { lat, lng, city } = cityObj;
    const url = `${WEATHER_API_BASE_URL}/weather-data?lat=${lat}&lng=${lng}&city=${city}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      temperature: data.temperature,
      condition: data.condition,
      location: data.location,
      humidity: data.humidity,
      precipitationProbability: data.precipitationProbability,
      uvIndex: data.uvIndex,
      weatherCode: data.weatherCode,
      windSpeed: data.windSpeed,
    };
  }
);

// --- Initial State ---
const initialState = {
  selectedCityWeather: null as WeatherData,
  isLoading: false,
  error: null as string | null,
};

// --- Slice ---
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.selectedCityWeather = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCityWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch weather";
      });
  },
});

// --- Exports ---
export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
