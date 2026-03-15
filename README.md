# Garden Planner

An interactive planner to manage your vegetable or kitchen-garden beds by month. Create beds, define plants, set growing and harvest months, and generate tasks automatically. This is a small vibe-coded project—both for practice and because this planner was needed.

## Features

- **Visual bed planning** — Place and edit plants on your beds
- **Plant data** — Growing and harvest months, space requirements, care notes
- **Automatic tasks** — Sowing, care, and harvest based on growth data
- **Export** — Calendar (.ics) export
- **Browser-based** — No install required; use in any modern browser

## Installation

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Run with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Garden_planner.git
   cd Garden_planner
   ```

2. Start the app:
   ```bash
   docker compose up -d
   ```
   (On older setups you may need `docker-compose up -d`.)

3. Open in your browser: **http://localhost:8080**

To stop: `docker compose down`

### Run without Docker (development)

1. Install [Node.js](https://nodejs.org/) (v18 or newer).
2. In the project folder, run:
   ```bash
   node server.js
   ```
3. Open **http://localhost:3000**

Data is stored in `./data/gartenplaner.json`. Create a `data` folder if it does not exist; the server will create the file on first use.

## Architecture

- **Frontend:** Single HTML/JS page (`gartenplaner.html`) for the UI
- **Backend:** Node.js server (`server.js`) — API and file-based storage
- **Persistence:** JSON file in the `data` directory (`/app/data` inside the container when using Docker)

## API Endpoints

| Method | Path      | Description                    |
|--------|-----------|--------------------------------|
| GET    | `/api/data` | Returns current garden state   |
| POST   | `/api/data` | Saves new garden data (JSON body) |

## Development & Contributing

Contributions are welcome.

1. Fork the repo  
2. Create a feature branch  
3. Open a Pull Request  

Please open an issue for bugs or feature requests.
