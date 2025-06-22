# Alert API

A Node.js RESTful API for managing weather or environmental alerts, built with TypeScript, Express, and MongoDB (Mongoose).

---

## Features

- Create, update, delete, and retrieve alerts
- MongoDB/Mongoose for data storage
- Input validation and error handling
- Modular service/controller architecture
- CORS enabled for frontend integration

---

## Endpoints

### Create Alert

`POST /alerts`

**Body:**

```json
{
  "name": "Tel Aviv Heat Alert",
  "description": "Alert if temperature > 30°C",
  "location": { "name": "Tel Aviv", "lat": 32.0853, "lon": 34.7818 },
  "parameter": "temperature",
  "threshold": { "operator": "gt", "value": 30 },
  "userId": "user1"
}
```

---

### Get All Alerts

`GET /alerts`

---

### Get Alert by ID

`GET /alerts/:id`

---

### Update Alert

`PUT /alerts/:id`

**Body:** (same as create)

---

### Delete Alert

`DELETE /alerts/:id`

---

## Setup

1. **Clone the repo**

   ```sh
   git clone <repo-url>
   cd alert_api
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment**

   Create a `.env` file in the root directory.  
   Here is an example:

   ```env
   MONGO_URI=mongodb+srv://yourMongoUsername:yourMongoPassword@cluster0.mongodb.net/?retryWrites=true&w=majority
   MONGO_DB=alert_db
   PORT=3001
   ```

4. **Build the project**

   ```sh
   npm run build
   ```

5. **Run the server**
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:3001`.

---

## Project Structure

```
src/
  controllers/    # Express route controllers
  models/         # Mongoose schemas and models
  services/       # Business logic and DB services
  types/          # TypeScript types/interfaces
  utils/          # Utility functions (e.g., db connection)
```

---

## Development

- Uses [nodemon](https://nodemon.io/) for auto-reloading in development.
- Linting and formatting recommended via ESLint and Prettier.

---

## Testing

Add your tests in the `tests/` directory and run with:

```sh
npm test
```

---

## Deployment (Render.com)

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- Set your environment variables in the Render dashboard.

---

## License

MIT
