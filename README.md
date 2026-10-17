# CEYLON 🇱🇰
### Sri Lanka Destination Explorer

**CEYLON** is a full-stack tourism web application that helps visitors discover destinations across Sri Lanka, explore destination details, and check current weather conditions.

Developed for the **Scripterlab Software Engineer Internship — Full Stack Development Assessment**.

## 🌐 Live Application

- **Frontend:** https://ceylon-frontend-production.up.railway.app
- **Backend API:** https://sri-lanka-destination-explorer-production.up.railway.app
- **GitHub Repository:** https://github.com/mrsamahi/sri-lanka-destination-explorer

## 📖 Project Overview

CEYLON provides two main areas:

**Public Website:** Visitors can browse Sri Lankan destinations, search and filter places, view photographs and descriptions, and check current weather without logging in.

**Admin Dashboard:** An authenticated administrator can manage destination records through create, read, update, and delete (CRUD) operations.

Destination information is stored in MongoDB and accessed through a NestJS REST API.

## ✨ Features

### Visitor Features

- Browse Sri Lankan destinations using visually designed destination cards
- Search destinations by name, district, or category
- Filter destinations using dynamically generated category buttons
- View six destinations per page with Previous and Next pagination
- Automatically reset pagination when searching or changing categories
- Open individual destination detail pages
- View destination descriptions, images, categories, and districts
- Check current temperature, weather condition, humidity, and wind speed
- View weather measurements with appropriate units
- See a friendly message when weather information is unavailable
- Use the website on desktop and mobile devices

### Admin Features

- Administrator login using JWT authentication
- Protected Admin Dashboard
- View existing destinations
- Add new destinations
- Edit destination information
- Delete destinations with confirmation
- Manage destination names, descriptions, coordinates, categories, districts, and image URLs
- Persist destination changes through the NestJS API and MongoDB

### UI and Mobile Improvements

- Responsive navigation and destination layouts
- Compact mobile Menu button positioned at the top-right
- Navigation dropdown aligned inside the mobile screen
- Improved destination card presentation
- District displayed alongside destination information
- Responsive destination titles for longer names
- Updated admin destination descriptions
- Improved mobile buttons and navigation interactions
- Refined homepage styling and Explore Destinations button

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | NestJS, Node.js, TypeScript |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt password hashing |
| Weather API | Open-Meteo |
| Deployment | Railway |
| Version Control | Git and GitHub |

## 📁 Project Structure

```text
sri-lanka-destination-explorer/
├── backend/
│   ├── scripts/
│   │   └── seed.js
│   ├── .env.example
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   ├── public/
│   │   └── images/
│   ├── .env.example
│   └── ...
└── README.md
```

## 💻 Running the Project Locally

### Prerequisites

- Node.js and npm
- Git
- A MongoDB database connection
- Environment variables configured for the backend and frontend

### 1. Clone the Repository

```bash
git clone https://github.com/mrsamahi/sri-lanka-destination-explorer.git
cd sri-lanka-destination-explorer
```

### 2. Configure and Run the Backend

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`, using `backend/.env.example` as a reference:

```env
MONGODB_URI=mongodb_connection_string_here
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=replace_with_a_secure_random_secret
```

Replace these placeholders with values for your development environment.

The admin password must be stored as a bcrypt hash rather than plaintext.

Start the backend:

```bash
npm run start:dev
```

Default backend address:

http://localhost:3000

### 3. Insert Initial Destination Data

The project includes a seed script:

`backend/scripts/seed.js`

It provides the three sample destinations required by the assessment:

- Colombo
- Kandy
- Galle

After configuring the backend database connection, run this command inside the `backend` directory:

```bash
npm run seed
```

The seed script skips destinations with matching names to avoid duplicate records.

**Important:** Use a development database when testing the seed script. Do not run it against a production database unless you intend to modify production data.

### 4. Configure and Run the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create `frontend/.env.local` using `frontend/.env.example` as a reference:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the frontend on port 3001:

```bash
npm run dev -- -p 3001
```

Open:

http://localhost:3001

The frontend communicates with the NestJS backend using `NEXT_PUBLIC_API_URL`.

**Windows PowerShell note:** If PowerShell blocks `npm`, use `npm.cmd` instead, such as `npm.cmd run dev -- -p 3001`.

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate administrator |
| GET | `/destinations` | Retrieve all destinations |
| GET | `/destinations/:id` | Retrieve destination details |
| GET | `/destinations/:id/weather` | Retrieve current destination weather |
| POST | `/destinations` | Create destination (admin) |
| PATCH | `/destinations/:id` | Update destination (admin) |
| DELETE | `/destinations/:id` | Delete destination (admin) |

Administrative write operations require authentication.

## 🌤️ Weather API Integration

CEYLON integrates with the **Open-Meteo Weather API** through the NestJS backend.

When a visitor opens a destination detail page:

1. The frontend requests destination details from the backend.
2. The frontend requests the destination's current weather from the backend.
3. The backend uses the destination's stored latitude and longitude to request weather information from Open-Meteo.
4. The application displays temperature, readable weather conditions, humidity, and wind speed with their units.

If the weather service is temporarily unavailable, destination information remains accessible and the weather section displays a friendly fallback message.

Open-Meteo documentation: https://open-meteo.com/en/docs

## 🔐 Authentication and Security

- The application supports a predefined administrator account.
- Administrator authentication uses JWT.
- Administrator passwords are verified using a stored bcrypt hash.
- Protected operations require valid authentication.
- Database connection strings and JWT secrets are configured through environment variables.
- Actual `.env` and `.env.local` secrets must not be committed to GitHub.
- `.env.example` files provide safe configuration placeholders.

### Demo Administrator Access

The assessment reviewer requires a test administrator account to evaluate the Admin Dashboard.

**Admin Login:** https://ceylon-frontend-production.up.railway.app/admin/login

Demo credentials should be supplied to the reviewer through the assessment submission email or another appropriate private channel. Do not publish production passwords or authentication secrets in the public repository.

## 🚀 Railway Deployment

The application is deployed on Railway with separate services for:

- Next.js frontend
- NestJS backend
- MongoDB database

The deployed frontend connects to the backend using the configured `NEXT_PUBLIC_API_URL`.

The backend connects to MongoDB through its configured `MONGODB_URI`.

The deployment includes the required sample destinations and supports destination management through the Admin Dashboard.

### Production URLs

**Frontend:**

https://ceylon-frontend-production.up.railway.app

**Backend:**

https://sri-lanka-destination-explorer-production.up.railway.app

**Destinations API:**

https://sri-lanka-destination-explorer-production.up.railway.app/destinations

## 🧪 Testing

The application has been developed and tested with the following functionality:

- Public destination listing
- Individual destination detail pages
- Search by destination name, district, and category
- Category filtering
- Pagination with more than six destinations
- Admin login and dashboard access
- Adding destinations through the Admin Dashboard
- Editing and deleting destination records
- Destination changes appearing on the public website
- Live weather information and fallback display
- Mobile navigation menu and dropdown
- Responsive destination titles
- Production build checks using `npm run build`
- GitHub deployment workflow and Railway hosting

## 📈 Development Improvements

### Phase 1 — Interface and Navigation

Improved mobile responsiveness, navigation, destination cards, district display, buttons, and homepage interactions.

### Phase 2 — Destination Descriptions

Improved destination descriptions and information management in the Admin Dashboard.

### Phase 3 — Search and Category Filters

Implemented destination searching and dynamic category filtering.

### Phase 4 — Pagination

Implemented six destinations per page, with Previous and Next controls and automatic page reset when filters change.

### Mobile Refinements

Improved the top-right mobile navigation menu, dropdown positioning, compact header sizing, and responsive destination titles.

## 🔮 Future Improvements

Potential enhancements beyond the assessment scope include:

- Multiple-image destination galleries
- Destination image slideshows
- Interactive destination maps
- Additional travel-planning information
- More Sri Lankan destinations
- Saved destinations and visitor accounts

These enhancements are optional and are not required for the current assessment.

## 👨‍💻 About the Project

CEYLON was developed as a full-stack software engineering internship assessment project for **Scripterlab**.

The project demonstrates frontend and backend development, REST API integration, authentication, MongoDB data management, external weather API integration, responsive design, and Railway deployment.