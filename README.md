
# Sri Lanka Destination Explorer 🇱🇰

A full-stack web application for discovering popular tourist destinations in Sri Lanka.

## Project Overview

Sri Lanka Destination Explorer helps visitors explore tourist attractions, search for destinations, and view detailed information about places they want to visit.

The application uses Next.js for the frontend, NestJS for the backend, and MongoDB Atlas for storing destination information.

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- Node.js
- TypeScript
- REST API
- Mongoose

### Database
- MongoDB Atlas

### Version Control
- Git
- GitHub

## Features

- Display tourist destinations from MongoDB Atlas
- Search destinations by name, district, or category
- Display destination photographs
- View individual destination details
- Responsive interface using Tailwind CSS
- REST API for managing destinations

## Example Destinations

- Sigiriya — Matale District
- Ella — Badulla District
- Galle Fort — Galle District

## Project Structure

```text
sri-lanka-destination-explorer/
├── backend/       # NestJS REST API
├── frontend/      # Next.js web application
└── README.md
```

## Running the Project Locally

### Requirements

- Node.js and npm
- MongoDB Atlas account
- Git

### Backend

1. Open a terminal inside the backend folder.
2. Install dependencies:

   `npm install`

3. Create a `.env` file inside `backend` and configure the MongoDB connection string using the environment variable expected by the application.
4. Start the backend:

   `npm run start:dev`

Backend URL: http://localhost:3000

### Frontend

1. Open a separate terminal inside the frontend folder.
2. Install dependencies:

   `npm install`

3. Start the frontend on port 3001:

   `npm run dev -- -p 3001`

Frontend URL: http://localhost:3001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /destinations | Get all destinations |
| GET | /destinations/:id | Get one destination |
| POST | /destinations | Create a destination |
| PATCH | /destinations/:id | Update a destination |
| DELETE | /destinations/:id | Delete a destination |

## Security

Database credentials are stored in a local `.env` file and should never be committed to GitHub.

## Future Improvements

- Add more tourist destinations
- Add category filters
- Add user accounts and authentication
- Add maps and location information
- Deploy the application online

## Author

Developed as a full-stack web development assessment project.
