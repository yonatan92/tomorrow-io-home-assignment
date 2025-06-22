# Weather API

A Node.js + TypeScript REST API for retrieving real-time weather data using the Tomorrow.io API.

## Features

- Get current weather data by city or coordinates
- Modular structure: controllers, services, providers, models
- TypeScript for type safety
- Uses Express.js and Axios
- Environment variable support
- Ready for deployment on Render.com

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/your-username/weather_api.git
cd weather_api
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
TOMORROW_API_KEY=your_tomorrow_api_key
TOMORROW_API_BASE_URL=https://api.tomorrow.io/v4/weather/realtime
PORT=3003
```

### 4. Run the project locally in development mode

```sh
npm run dev
```

The API will be available at `http://localhost:3003`.

## API Endpoints

### Get Weather Data

**GET** `/weather-data?city=CityName`  
**GET** `/weather-data?lat=LAT&lon=LON`

**Query Parameters:**

- `city` (optional): City name (e.g., `London`)
- `lat` and `lon` (optional): Latitude and longitude

**Example:**

```
GET http://localhost:3003/weather-data?city=London
```

## Deployment (Render.com)

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- Set environment variables in the Render dashboard.

## License

MIT
