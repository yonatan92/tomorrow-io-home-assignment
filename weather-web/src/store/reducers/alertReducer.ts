import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Types ---
export type Alert = {
  id: string;
  name: string;
  description: string;
  location: { name: string; lat: number; lon: number };
  parameter: string;
  threshold: { operator: string; value: number };
  userId: string;
  triggered: boolean;
  createdAt: number;
  updatedAt: number;
};

// --- API Base URL from .env ---
const API_BASE_URL =
  process.env.REACT_APP_ALERT_SERVICE_BASE_URL || "http://localhost:3001";

// --- Initial State ---
const initialState = {
  data: [] as Alert[],
  isLoading: false,
  isDeleting: false,
  error: null as string | null,
};

// --- Async Thunks ---
export const fetchAlerts = createAsyncThunk<Alert[]>(
  "alerts/fetchAlerts",
  async () => {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    const data = await response.json();
    return data.map((alert: Alert) => ({
      id: alert.id,
      name: alert.name,
      description: alert.description,
      location: alert.location,
      parameter: alert.parameter,
      threshold: alert.threshold,
      userId: alert.userId,
      triggered: alert.triggered,
      createdAt: alert.createdAt,
      updatedAt: alert.updatedAt,
    }));
  }
);

export const createAlert = createAsyncThunk<
  Alert,
  any,
  { rejectValue: string }
>("alerts/createAlert", async (alertData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alertData),
    });

    if (!response.ok) {
      throw new Error("Failed to create alert");
    }

    return await response.json();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteAlert = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("alerts/deleteAlert", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete alert");
    }
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// --- Slice ---
const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Alerts
      .addCase(fetchAlerts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch alerts";
      })
      // Create Alert
      .addCase(createAlert.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to create alert";
      })
      // Delete Alert
      .addCase(deleteAlert.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.data = state.data.filter((alert) => alert.id !== action.payload);
      })
      .addCase(deleteAlert.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = (action.payload as string) || "Failed to delete alert";
      });
  },
});

// --- Selectors ---
export const selectIsDeletingAlert = (state: { alerts: typeof initialState }) =>
  state.alerts.isDeleting;

// --- Export Reducer ---
export default alertsSlice.reducer;
