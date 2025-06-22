# Weather Web

A modern React + TypeScript web application for monitoring weather data and managing weather alerts.

---

## Features

- 🌦️ View real-time weather data for cities worldwide
- 🚨 Create, view, and delete custom weather alerts
- 🔎 Search and select cities from a dropdown
- 📊 Interactive, sortable alerts table
- ⚡ Fast & responsive UI with Styled Components
- 🛡️ 100% TypeScript for type safety

---

## Data Sources

- **Cities List:**  
  The list of cities is fetched from a CSV file (`world_capitals_with_coordinates.csv`).  
  The CSV file is parsed on the client using [PapaParse](https://www.papaparse.com/).

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yonatan92/tomorrow-io-home-assignment.git
cd weather-web
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory.  
You can use `.env.example` as a template:

```env
REACT_APP_ALERT_SERVICE_BASE_URL=http://localhost:3001
REACT_APP_CITIES_CSV_URL=http://localhost:3000/assets/world_capitals_with_coordinates.csv
REACT_APP_WEATHER_API_BASE_URL=http://localhost:3003
```

**Note:**

- Do **not** commit your real `.env` file.
- Only commit `.env.example` with placeholder values.

### 4. Start the development server

```bash
npm start
# or
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts

- `npm start` — Run the app in development mode
- `npm run build` — Build for production
- `npm test` — Run tests (if available)
- `npm run lint` — Lint the codebase (if configured)

---

## Project Structure

```
src/
  components/
    alerts/
      Alerts.tsx
      CreateAlertForm.tsx
  sharedComponents/
    ActionButton.tsx
    DropDown.tsx
  store/
    reducers/
      alertReducer.ts
      cityReducer.ts
      weatherReducer.ts
    index.ts
  utils/
    consts/
      index.ts
  types/
    types.ts
  App.tsx
  index.tsx
```

---

## Deployment

You can deploy this app to [Render](https://render.com), Netlify, Vercel, or any static hosting provider.  
For Render:

- Set the **Root Directory** to your React app folder (if in a monorepo)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
- Add your environment variables in the Render dashboard

---

## License

[MIT](LICENSE)

---

## Notes

- Make sure your backend/API services are running and accessible at the URLs specified in your `.env`.
- For any issues, please open an issue on GitHub.

---

**Good luck with your review! 🚀**
