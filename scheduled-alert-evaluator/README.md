# Scheduled Alert Evaluator

A Node.js/TypeScript service for evaluating weather-based alerts for users, using MongoDB and Mongoose.

---

## Features

- **Weather Alert Evaluation:** Periodically checks weather data for user-defined locations and triggers alerts based on thresholds.
- **MongoDB Integration:** Stores alerts and their statuses.
- **Cron Scheduling:** Uses `node-cron` to run evaluations every 5 minutes.
- **Modular Codebase:** Organized into services, providers, and utilities.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd scheduled-alert-evaluator
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your values (MongoDB URI, weather API base URL, etc.).

4. **Start the service:**
   ```sh
   npm run dev
   ```

---

## Project Structure

```
src/
  models/           # Mongoose models (Alert, Weather)
  services/         # Business logic (alert evaluation, weather fetching)
  providers/        # External API/database providers
  utils/            # Utility functions
  cron/             # Cron job entry point
  types/            # TypeScript types
.env.example        # Example environment variables
.gitignore
package.json
README.md
```

---

## Usage

- **Alerts** are stored in MongoDB and grouped by location.
- Every 5 minutes, the service fetches weather data for each location and evaluates all alerts for that location.
- If an alert's threshold is crossed, its `triggered` status is updated.

---

## Scripts

- `npm run dev` — Start the service in development mode with hot-reloading.
- `npm test` — (Placeholder) Add your tests here.

---

## Environment Variables

Create a `.env` file in the root directory. Example:

```
MONGODB_URI=mongodb://localhost:27017/alerts
WEATHER_API_BASE_URL=https://your-weather-api.com
```

---

## Assignment Suggestions (if sending as a home assignment)

- Add support for new weather parameters (e.g., humidity, wind speed).
- Implement REST API endpoints for managing alerts.
- Add unit and integration tests.
- Improve error handling and logging.

---

## Dependencies

- [mongoose](https://www.npmjs.com/package/mongoose) `8.3.4`
- [express](https://www.npmjs.com/package/express)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [axios](https://www.npmjs.com/package/axios)
- TypeScript, ts-node, nodemon (for development)

---

## License

ISC

---

## Author

Your Name Here
