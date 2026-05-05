# 🧠 Smart Emotion — AI-Powered Adaptive Learning Platform

<div align="center">

![Smart Emotion Banner](https://img.shields.io/badge/Smart%20Emotion-AI%20Learning%20Platform-6366f1?style=for-the-badge&logo=brain&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

**An intelligent, real-time adaptive e-learning platform that detects learner emotions via webcam and dynamically tailors educational content to optimize engagement and comprehension.**

[Features](#-features) • [Architecture](#-architecture) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Screenshots](#-screenshots)

</div>

---

## 📖 Overview

**Smart Emotion** bridges the gap between static online learning and truly personalized education. Using computer vision and deep learning, it continuously monitors a learner's emotional state through their webcam. When a learner appears confused, bored, or frustrated, the platform **automatically adapts** — switching content format, difficulty level, or pacing — to keep them engaged and learning effectively.

### 🎯 Key Highlights

- 🎥 **Real-time webcam emotion detection** via a 5-second polling loop
- 🤖 **Deep learning model** (TensorFlow/Keras) trained on 7 core emotions
- 📚 **Adaptive content engine** that maps detected emotions to curated learning rules
- 📊 **Admin analytics dashboard** with emotion trend visualization
- 🔐 **JWT-secured REST API** with role-based access control
- ⚡ **Production-grade architecture** with three fully decoupled services

---

## ✨ Features

### 👤 Learner Experience
- **Seamless Webcam Integration** — Captures frames and sends them for analysis without interrupting the learning session
- **Adaptive Content Delivery** — Dynamically swaps content (videos, articles, quizzes) based on emotional state
- **Live Emotion Feedback** — Subtle UI indicator showing detected emotion in real time
- **Learning Session Tracker** — Persistent session state across page navigation

### 🛡️ Authentication & Security
- Secure **JWT-based authentication** (access token per session)
- Password hashing with **bcryptjs**
- Input validation via **Joi** schemas
- HTTP security headers via **Helmet**
- Rate limiting to prevent API abuse

### 📊 Admin Dashboard
- **Emotion trend charts** (Recharts) across all learners and sessions
- **Per-user emotion history** with timestamp logs
- **Content performance metrics** — which content types work best per emotion
- **User management panel**

### 🧠 ML / Emotion Detection
- **7-class emotion classifier**: `angry`, `disgust`, `fear`, `happy`, `neutral`, `sad`, `surprise`
- **Haar Cascade** face detection for preprocessing
- **TensorFlow/Keras** model served via FastAPI
- REST endpoint accepts raw image frames from the frontend

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Smart Emotion                           │
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   Frontend   │ ───► │   Backend    │ ───► │  ML Service  │  │
│  │ React + Vite │◄─── │ Express + JS │◄─── │  FastAPI/Py  │  │
│  │  TypeScript  │      │   REST API   │      │  TensorFlow  │  │
│  │   Zustand    │      │   MongoDB    │      │   OpenCV     │  │
│  │    :5173     │      │    :5000     │      │    :8000     │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│                                │                                │
│                         ┌──────▼──────┐                        │
│                         │  MongoDB    │                         │
│                         │   Atlas     │                         │
│                         └─────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Webcam Frame
    │
    ▼
Frontend (every 5s)
    │  POST /predict (base64 image)
    ▼
ML Service (FastAPI)
    │  Haar Cascade → Face crop → CNN inference
    ▼
Detected Emotion (e.g., "confused")
    │  POST /api/emotion/adapt
    ▼
Backend (Express)
    │  EmotionRule lookup → Content retrieval
    ▼
Adaptive Content Response
    │
    ▼
Frontend renders updated content
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript, Vite 8 | SPA framework |
| **Styling** | TailwindCSS 4, Custom CSS | UI styling & glassmorphic design |
| **State** | Zustand 5 | Global state management |
| **Charts** | Recharts 3 | Emotion analytics visualization |
| **Routing** | React Router DOM 7 | Client-side navigation |
| **Backend** | Express 5, Node.js | REST API server |
| **Database** | MongoDB Atlas, Mongoose 9 | Data persistence |
| **Auth** | JWT, bcryptjs | Authentication & security |
| **Validation** | Joi | Request schema validation |
| **Logging** | Winston, Morgan | Structured logging |
| **ML Service** | FastAPI, Python | Emotion inference API |
| **CV** | OpenCV (cv2), Haar Cascade | Face detection preprocessing |
| **DL Model** | TensorFlow/Keras | 7-class emotion classifier |
| **Dev Tools** | Nodemon, ESLint, Vite HMR | Developer experience |

---

## 📁 Project Structure

```
Smart-Emotion/
├── backend/                    # Node.js / Express REST API
│   ├── app.js                  # Express app factory
│   ├── server.js               # HTTP server entrypoint
│   ├── config/                 # DB & environment config
│   ├── controllers/            # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── emotion.controller.js
│   │   ├── content.controller.js
│   │   └── analytics.controller.js
│   ├── models/                 # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── emotionLog.model.js
│   │   ├── emotionRule.model.js
│   │   └── content.model.js
│   ├── routes/                 # API route definitions
│   │   ├── auth.routes.js
│   │   ├── emotion.routes.js
│   │   ├── content.routes.js
│   │   └── analytics.routes.js
│   ├── middleware/             # Auth, validation, rate-limit
│   ├── services/               # Business logic layer
│   ├── validators/             # Joi validation schemas
│   ├── seeds/                  # Database seed scripts
│   ├── jobs/                   # Background jobs
│   ├── utils/                  # Shared utilities
│   └── tests/                  # API integration tests
│
├── frontend/                   # React + TypeScript SPA
│   ├── src/
│   │   ├── pages/              # Route-level page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LearnSession.tsx
│   │   │   └── Admin.tsx
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useEmotionTracking.ts
│   │   ├── store/              # Zustand state stores
│   │   ├── services/           # API service clients (axios)
│   │   ├── routes/             # React Router config
│   │   ├── layouts/            # Page layout wrappers
│   │   ├── context/            # React context providers
│   │   └── utils/              # Frontend utilities
│   ├── index.html
│   └── vite.config.ts
│
├── mlService/                  # Python FastAPI ML microservice
│   ├── app/
│   │   ├── main.py             # FastAPI app entrypoint
│   │   ├── routes/             # API route handlers
│   │   ├── services/           # ML inference logic
│   │   ├── schemas/            # Pydantic request/response models
│   │   └── utils/              # Image preprocessing utilities
│   ├── model/                  # Trained Keras model (.h5)
│   ├── haarcascade/            # OpenCV face detection XML
│   └── requirements.txt
│
└── docs/                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | ≥ 18.x | Required for backend & frontend |
| npm | ≥ 9.x | Package management |
| Python | ≥ 3.9 | Required for ML service |
| pip | latest | Python packages |
| MongoDB | Atlas / Local | Database |

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Smart-Emotion.git
cd Smart-Emotion
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
ML_API_URL=http://localhost:8000
NODE_ENV=development
```

Seed the database with initial emotion rules and content:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

> Backend will run at `http://localhost:5000`

---

### 3. ML Service Setup

```bash
cd mlService
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `mlService/`:

```env
MODEL_PATH=./model/emotion_model.h5
CASCADE_PATH=./haarcascade/haarcascade_frontalface_default.xml
```

> ⚠️ Place your trained Keras model at `mlService/model/emotion_model.h5`. The Haar Cascade XML is bundled under `mlService/haarcascade/`.

Start the ML service:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> ML Service will run at `http://localhost:8000`

---

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ML_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

> Frontend will run at `http://localhost:5173`

---

### 5. All Services Running ✅

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5173 | Vite Dev Server |
| Backend API | http://localhost:5000 | Express + Node.js |
| ML Service | http://localhost:8000 | FastAPI + Uvicorn |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT |

### Emotion

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/emotion/log` | ✅ | Log a detected emotion event |
| `POST` | `/api/emotion/adapt` | ✅ | Get adaptive content for an emotion |

### Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/content` | ✅ | List all content items |
| `POST` | `/api/content` | ✅ Admin | Create new content |
| `PUT` | `/api/content/:id` | ✅ Admin | Update content |
| `DELETE` | `/api/content/:id` | ✅ Admin | Delete content |

### Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/analytics/emotions` | ✅ Admin | Emotion trends across all users |
| `GET` | `/api/analytics/user/:id` | ✅ Admin | Per-user emotion history |

### ML Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Accept base64 image, return detected emotion |
| `GET` | `/health` | Health check |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing JWTs | `your_secret_here` |
| `ML_API_URL` | URL of the ML microservice | `http://localhost:8000` |
| `NODE_ENV` | Environment mode | `development` |

### ML Service (`mlService/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MODEL_PATH` | Path to the Keras model file | `./model/emotion_model.h5` |
| `CASCADE_PATH` | Path to Haar Cascade XML | `./haarcascade/haarcascade_frontalface_default.xml` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_ML_API_URL` | ML service URL | `http://localhost:8000` |

---

## 🧩 Database Models

### `User`
```
id, name, email, passwordHash, role (learner | admin), createdAt
```

### `EmotionLog`
```
id, userId, emotion, confidence, timestamp, sessionId
```

### `EmotionRule`
```
id, emotion, contentType, priority, description
```

### `Content`
```
id, title, type (video | article | quiz), url, difficulty, emotion (targeted), createdAt
```

---

## 🤖 Emotion Classes

The ML model detects the following 7 emotions:

| Emotion | Adaptive Response |
|---------|-----------------|
| 😠 `angry` | Offer break suggestion or lighter topic |
| 🤢 `disgust` | Switch content format or topic |
| 😨 `fear` | Reassure with simpler content, FAQs |
| 😊 `happy` | Continue current content, increase difficulty |
| 😐 `neutral` | Maintain current pace and content |
| 😢 `sad` | Offer motivational content or break |
| 😲 `surprise` | Reinforce concept with examples |

---

## 🧪 Running Tests

```bash
# Backend API integration tests
cd backend
npm run api-test

# Frontend lint check
cd frontend
npm run lint
```

---

## 📦 Scripts Reference

### Backend

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon server.js` | Start with hot reload |
| `start` | `node server.js` | Production start |
| `seed` | `node seeds/index.js` | Seed database |
| `api-test` | `node tests/api-test.js` | Run API tests |

### Frontend

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server |
| `build` | `tsc -b && vite build` | TypeScript build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Lint the codebase |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure all PRs pass linting checks and include relevant documentation updates.

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ as a production-grade AI-powered learning platform.

> *Smart Emotion — Because how you feel matters as much as what you learn.*

---

<div align="center">

⭐ **Star this repo** if you found it useful!

[![GitHub stars](https://img.shields.io/github/stars/your-username/Smart-Emotion?style=social)](https://github.com/your-username/Smart-Emotion)

</div>
