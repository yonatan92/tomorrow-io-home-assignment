import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../../types/types";
import Papa from "papaparse";

// --- Async Thunks ---
export const fetchCities = createAsyncThunk<City[]>(
  "cities/fetchCities",
  async () => {
    const CITIES_CSV_URL =
      process.env.REACT_APP_CITIES_CSV_URL ||
      "http://localhost:3000/assets/world_capitals_with_coordinates.csv";

    if (!CITIES_CSV_URL) {
      throw new Error("CITIES_CSV_URL is not defined in environment variables");
    }

    const response = await fetch(CITIES_CSV_URL);
    const csvText = await response.text();
    const { data } = Papa.parse(csvText, { header: true });

    return data as City[];
  }
);

// --- Initial State ---
type CitiesState = {
  data: City[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CitiesState = {
  data: [],
  isLoading: false,
  error: null,
};

// --- Slice ---
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to load cities";
      });
  },
});

// --- Export Reducer ---
export default citiesSlice.reducer;
