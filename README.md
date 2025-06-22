# Tomorrow.io Home Assignment

This repository contains a multi-service weather alert system, designed as a home assignment for Tomorrow.io. The system is composed of four main projects:

- **alert_api**: Handles alert creation, management, and delivery.
- **scheduled-alert-evaluator**: Periodically evaluates weather conditions and triggers alerts based on predefined rules.
- **weather_api**: Provides weather data and integrates with external weather services.
- **weather-web**: A React frontend for users to view weather data and manage alerts.

## Project Overview

This project is focused on **capital cities only**.

- In the web interface, you can select a capital city from a dropdown menu.
- The app retrieves and displays real-time weather data for the selected capital.
- In the "Alerts" section, you can create, read, update, and delete (CRUD) weather alerts for your chosen city.

## Features

- **Weather Data Aggregation:** Collects and serves weather data for capital cities from external APIs.
- **Alert Management:** Allows users to create, update, and delete weather alerts for selected capitals.
- **Scheduled Evaluation:** Automatically checks weather conditions and triggers alerts as needed.
- **User Interface:** Web dashboard for selecting capitals, viewing weather, and managing alerts.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yonatan92/tomorrow-io-home-assignment.git
   cd tomorrow-io-home-assignment
   ```

2. **Install dependencies for all projects:**

   ```sh
   cd alert_api
   npm install
   cd ../scheduled-alert-evaluator
   npm install
   cd ../weather_api
   npm install
   cd ../weather-web
   npm install
   cd ..
   ```

3. **Set environment variables:**
   - Create `.env` files in each project folder as needed.
   - Example:
     ```
     PORT=3001
     WEATHER_API_KEY=your_api_key_here
     ```

## Building the Backend Services

Before running the backend services, you must compile the TypeScript code:

```sh
npm run build --prefix alert_api
npm run build --prefix scheduled-alert-evaluator
npm run build --prefix weather_api
```

## Running the Services

> **Note:**  
> We no longer use `concurrently` to run all services at once.  
> **You must run each service in a separate terminal window.**

1. **Start each backend service:**

   Open a new terminal window for each service and run:

   ```sh
   cd alert_api
   npm start
   ```

   ```sh
   cd scheduled-alert-evaluator
   npm start
   ```

   ```sh
   cd weather_api
   npm start
   ```

2. **Start the frontend:**

   In a separate terminal window:

   ```sh
   cd weather-web
   npm start
   ```

---

**If you make changes to the backend TypeScript code, re-run the build commands before starting the services again.**
