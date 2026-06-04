# 📝 TodoFlow — MERN Full Stack Todo App

A production-grade **MERN** (MongoDB · Express · React · Node.js) Todo List application
featuring REST API, Context API, Tailwind CSS, and a modern glassmorphism UI.

---

## 🗂️ Project Structure

```
fullstack/
├── backend/          # Express REST API
│   ├── src/
│   │   ├── config/       # MongoDB connection
│   │   ├── controllers/  # Business logic
│   │   ├── middlewares/  # Error handler, 404, CORS
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express routers
│   │   └── utils/        # ApiError, ApiResponse, asyncHandler
│   ├── .env
│   └── server.js
│
└── frontend/         # React + Vite + Tailwind
    ├── src/
    │   ├── api/          # Axios instance + API functions
    │   ├── components/   # UI components
    │   ├── context/      # TodoContext (Context API)
    │   └── pages/        # Page components
    ├── .env
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB running locally (or update `MONGO_URI` in `backend/.env`)

### 1. Backend

```bash
cd backend
npm install
npm run dev     # runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev     # runs on http://localhost:5173
```

---

## 🔗 API Endpoints

| Method   | Endpoint                        | Description              |
|----------|---------------------------------|--------------------------|
| `GET`    | `/api/v1/health`                | Health check             |
| `GET`    | `/api/v1/todos`                 | Get all todos (+ filter) |
| `POST`   | `/api/v1/todos`                 | Create a todo            |
| `GET`    | `/api/v1/todos/:id`             | Get single todo          |
| `PUT`    | `/api/v1/todos/:id`             | Update a todo            |
| `PATCH`  | `/api/v1/todos/:id/toggle`      | Toggle completion        |
| `DELETE` | `/api/v1/todos/:id`             | Delete a todo            |
| `DELETE` | `/api/v1/todos/completed`       | Clear all completed      |

### Query Parameters (GET /todos)
- `status` — `pending` | `completed`
- `priority` — `low` | `medium` | `high`
- `page` — pagination page (default: 1)
- `limit` — items per page (default: 20)

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS v3     |
| State      | React Context API + useReducer      |
| HTTP       | Axios with interceptors             |
| Backend    | Node.js, Express 4                  |
| Database   | MongoDB + Mongoose 8                |
| Security   | Helmet, CORS, input validation      |
| Logging    | Morgan                              |
| Dev Tools  | Nodemon, ESLint                     |

---

## 🌍 Environment Variables

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
