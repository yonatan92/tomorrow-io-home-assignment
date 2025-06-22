# Scheduled Alert Evaluator

A Node.js/TypeScript service that evaluates weather-based alerts for users, using MongoDB and scheduled jobs.  
Runs as a scheduled script (e.g., via GitHub Actions) and updates alert statuses based on live weather data.

---

## Features

- **Weather Alert Evaluation:** Checks weather data for user-defined locations and triggers alerts based on thresholds.
- **MongoDB Integration:** Stores alerts and their statuses.
- **Scheduled Execution:** Designed to run on a schedule (e.g., every 5 minutes) using GitHub Actions or similar.
- **Modular Codebase:** Organized into services, providers, and utilities.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Weather API provider (Tomorrow.io, OpenWeather, etc.)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yonatan92/tomorrow-io-home-assignment
   cd scheduled-alert-evaluator
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your values.

4. **Build the project:**

   ```sh
   npm run build
   ```

5. **Run the service (one-time evaluation):**
   ```sh
   npm start
   ```

---

## Project Structure

```
scheduled-alert-evaluator/
  src/
    models/           # Mongoose models (Alert, Weather)
    services/         # Business logic (alert evaluation, weather fetching)
    providers/        # External API/database providers
    utils/            # Utility functions
    cron/             # (Optional) Cron job entry point
    types/            # TypeScript types
  .github/workflows/  # GitHub Actions workflow files
  .env.example        # Example environment variables
  .gitignore
  package.json
  README.md
```

---

## Usage

- **Alerts** are stored in MongoDB and grouped by location.
- On each run, the service fetches weather data for each location and evaluates all alerts for that location.
- If an alert's threshold is crossed, its `triggered` status is updated in the database.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

```
MONGODB_URI=your-mongodb-connection-string
WEATHER_API_BASE_URL=https://your-weather-api.com
```

---

## GitHub Actions

A workflow file is provided at `.github/workflows/scheduled-alert-evaluator.yml` to run the evaluator on a schedule (every 5 minutes by default).

- Add your secrets (`MONGODB_URI`, `WEATHER_API_BASE_URL`) in your GitHub repository settings under **Settings > Secrets and variables > Actions**.

---

## Scripts

- `npm run build` — Compile TypeScript to JavaScript.
- `npm start` — Run the compiled evaluator (single run).
- `npm run dev` — Start in development mode with hot-reloading.

---

## License

ISC

---
