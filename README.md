# CEYLON 🇱🇰
### Sri Lanka Destination Explorer

A full-stack tourism web application for discovering beautiful destinations across Sri Lanka.

Built as a full-stack web development internship assessment using **Next.js, NestJS, TypeScript, and MongoDB Atlas**.

## 🌐 Live Website

**Website:** https://ceylon-frontend-production.up.railway.app

**Backend API:** https://sri-lanka-destination-explorer-production.up.railway.app

## 📖 Project Overview

CEYLON helps users discover tourist destinations in Sri Lanka, search for places to visit, view destination information and photographs, and check weather information.

The application also includes a protected admin dashboard for managing destinations.

## ✨ Features

### Visitor Features
- Browse tourist destinations in Sri Lanka
- Search destinations by name, district, or category
- View destination photographs and descriptions
- Open individual destination detail pages
- View weather information for destinations
- Responsive interface for desktop and mobile

### Admin Features
- Admin login with JWT authentication
- Protected admin dashboard
- Add new destinations
- Edit existing destinations
- Delete destinations
- Manage destination details and image URLs

## 🛠️ Technologies Used

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | NestJS, Node.js, TypeScript |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT |
| Weather | Open-Meteo API |
| Deployment | Railway |
| Version Control | Git, GitHub |

## 📁 Project Structure

```text
sri-lanka-destination-explorer/
├── backend/        # NestJS REST API
├── frontend/       # Next.js application
└── README.md
```

## 💻 Running the Project Locally

### Requirements

- Node.js and npm
- MongoDB Atlas connection
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/mrsamahi/sri-lanka-destination-explorer.git
cd sri-lanka-destination-explorer
```

**Note:** Repository access is required while the GitHub repository is private.

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend` with the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_secure_jwt_secret
```

Start the backend:

```bash
npm run start:dev
```

Backend runs at:

`http://localhost:3000`

## Initial Data Setup

The application requires one test administrator and three sample
destinations: Colombo, Kandy, and Galle.

### Sample Destinations

The backend includes a seed script at `backend/scripts/seed.js`
that inserts Colombo, Kandy, and Galle into MongoDB.

To insert the sample destinations:

1. Configure `backend/.env` with the MongoDB connection string.
2. Open a terminal in the `backend` directory.
3. Run:

   ```bash
   npm run seed
   ```

The script skips destinations with matching names to avoid
inserting duplicates.

**Important:** Use a development database when running the seed
command. Do not run it against production unless intended.

### Test Administrator

The administrator account is configured using these environment
variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`

The administrator's password must be stored as a bcrypt hash.
Demo login credentials should be provided securely to the reviewer.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the frontend on port 3001:

```bash
npm run dev -- -p 3001
```

Open:

`http://localhost:3001`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/destinations` | Retrieve all destinations |
| GET | `/destinations/:id` | Retrieve one destination |
| GET | `/destinations/:id/weather` | Retrieve destination weather |
| POST | `/auth/login` | Authenticate an administrator |
| POST | `/destinations` | Create a destination (admin) |
| PATCH | `/destinations/:id` | Update a destination (admin) |
| DELETE | `/destinations/:id` | Delete a destination (admin) |

## 🔐 Security

- Administrative operations require authentication.
- Passwords are verified using a stored password hash.
- JWT is used for authenticated API requests.
- Sensitive environment variables are not included in the repository.
- Database credentials and authentication secrets must never be committed to GitHub.

## 🚀 Deployment

The frontend and backend are deployed as separate Railway services.

- **Frontend:** Next.js application
- **Backend:** NestJS REST API
- **Database:** MongoDB Atlas

The frontend connects to the deployed backend using `NEXT_PUBLIC_API_URL`.

## 🧪 Functionality Tested

- Live homepage and destination details
- Admin login
- Creating destinations
- Editing destinations
- Deleting destinations
- Displaying destination images

## 🔮 Future Improvements

- Interactive destination maps
- Advanced destination filters
- User accounts and saved destinations
- More tourist destinations
- Additional travel-planning features

## 👨‍💻 Author

Developed as a full-stack web development internship assessment project.
