## 🧩 **Full-Stack Portfolio Website (MERN + AI)**

This is a **full-stack portfolio web application** built with **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.
The project demonstrates authentication, API integration, and a responsive portfolio dashboard with admin access.
It’s part of a growing collection of over **30+ MERN and AI-based projects** available on [GitHub](https://github.com/Warishayat).

---

## 🚀 **Tech Stack**

### 🖥️ Frontend

* **React.js (Vite)**
* **TailwindCSS**
* **React Router DOM**
* **React Hot Toast**
* **Framer Motion (optional animations)**

### ⚙️ Backend

* **Node.js + Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **bcrypt for password hashing**
* **CORS & dotenv configuration**

---

## 💡 **Features**

✅ Fully responsive and dynamic portfolio
✅ Admin authentication (Login / Signup)
✅ Secure JWT-based API authentication
✅ CRUD operations for managing projects
✅ Toast notifications and smooth UI interactions
✅ Live deployment (Render for backend, Vercel/Netlify for frontend)

---

## 🌍 **Live Links**

🔗 **Frontend (Live):** [[https://your-frontend-link.onrender.com](https://your-frontend-link.onrender.com)](https://protofolio-website-frontend.onrender.com)
🔗 **Backend (API):** [https://protofolio-website-1.onrender.com](https://protofolio-website-1.onrender.com)

---

## 🧠 **Project Structure**

```
📦 portfolio-fullstack/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── projectController.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── projectRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── Projects.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

---

## 🛠️ **Installation & Setup**

### 🔹 Step 1: Clone the repository

```bash
git clone https://github.com/Warishayat/Portfolio-Fullstack.git
cd Portfolio-Fullstack
```

---

### 🔹 Step 2: Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=ALLAHISbest
NODE_ENV=production
```

Run the server:

```bash
npm start
```

or for development:

```bash
npm run dev
```

Backend will start at
👉 `http://localhost:3000`

---

### 🔹 Step 3: Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=https://protofolio-website-1.onrender.com
```

Run the frontend:

```bash
npm run dev
```

Frontend will start at
👉 `http://localhost:5173`

---

## 📡 **API Endpoints**

### 🔐 Authentication Routes

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/signup` | Register new admin  |
| POST   | `/auth/login`  | Login and get token |

### 💼 Project Routes

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/projects`     | Get all projects        |
| POST   | `/projects`     | Add new project         |
| PUT    | `/projects/:id` | Update existing project |
| DELETE | `/projects/:id` | Delete a project        |

---

## 🔧 **Commands Summary**

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm install`   | Install dependencies          |
| `npm run dev`   | Run development server        |
| `npm start`     | Start production build        |
| `npm run build` | Build frontend for production |

---

## 🧠 **Key Learnings**

* Building a full-stack MERN app from scratch
* Implementing secure JWT-based login
* Handling protected API routes
* Integrating React frontend with Express backend
* Deploying frontend (Vercel/Netlify) and backend (Render)

---

## 👨‍💻 **Author**

**Waris Hayat**
💼 MERN Stack & AI Developer | Machine Learning Enthusiast
📍 Working on over 30+ AI & MERN-based projects

🔗 [GitHub](https://github.com/Warishayat)
🔗 [LinkedIn](https://www.linkedin.com/in/warishayat)

