# 🔐 MERN Auth & Todo Application

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

**A modern, secure, and scalable full-stack application featuring JWT authentication, email verification, and todo management.**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

This is a production-ready MERN stack application that demonstrates best practices in modern web development. It combines robust authentication mechanisms with practical todo management functionality, showcasing enterprise-level coding standards and security implementations.

### What Makes This Special?

- **Secure by Design**: JWT tokens, httpOnly cookies, password hashing
- **Email Verification**: OTP-based email verification using Nodemailer
- **Modern UI/UX**: Responsive design with Tailwind CSS and DaisyUI
- **Production Ready**: Deployed on Vercel with optimized configuration
- **Clean Architecture**: Separation of concerns with MVC pattern

---

## ✨ Key Features

### 🔒 Authentication System
- **User Registration** with email validation
- **Login System** with JWT token generation
- **Email OTP Verification** for secure account activation
- **Cookie-Based Sessions** with httpOnly and secure flags
- **Password Hashing** using bcrypt for enhanced security
- **Protected Routes** with middleware authentication

### ✅ Todo Management
- **CRUD Operations**: Create, Read, Update, and Delete todos
- **Status Management**: Mark todos as completed or pending
- **Soft Delete**: Recoverable deletion mechanism
- **User-Specific Data**: Each user manages their own todos
- **Real-Time Updates**: Instant UI updates after operations

### 🎨 User Experience
- **Responsive Design**: Works seamlessly across all devices
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Visual feedback during async operations
- **Error Handling**: Comprehensive error messages
- **Clean Interface**: Intuitive and modern UI design

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building interactive interfaces |
| **Tailwind CSS** | Utility-first CSS framework |
| **DaisyUI** | Tailwind CSS component library |
| **Axios** | HTTP client for API requests |
| **React Router DOM** | Client-side routing |
| **React Hot Toast** | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Token for authentication |
| **Nodemailer** | Email sending service |
| **bcrypt** | Password hashing |
| **cookie-parser** | Cookie parsing middleware |

### DevOps & Tools
- **Vercel**: Deployment platform
- **MongoDB Atlas**: Cloud database
- **Git**: Version control
- **dotenv**: Environment variable management

---

## 🏗 Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Client   │────────▶│  Express API     │────────▶│  MongoDB Atlas  │
│  (Frontend)     │  HTTPS  │  (Backend)       │  Driver │  (Database)     │
│                 │◀────────│                  │◀────────│                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
       │                            │
       │                            │
       ▼                            ▼
┌─────────────────┐         ┌──────────────────┐
│  JWT + Cookies  │         │   Nodemailer     │
│  (Auth Layer)   │         │  (Email Service) │
└─────────────────┘         └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-auth-todo.git
   cd mern-auth-todo
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# SMTP Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_specific_password
SENDER_EMAIL=noreply@yourdomain.com

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

---

## 📁 Project Structure

```
mern-auth-todo/
│
├── client/                    # Frontend React Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Todo/        # Todo components
│   │   │   └── Layout/      # Layout components
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── VerifyOTP.jsx
│   │   ├── context/         # React Context API
│   │   ├── utils/           # Utility functions
│   │   ├── api/             # API service layer
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                   # Backend Express Application
│   ├── config/              # Configuration files
│   │   └── db.js           # MongoDB connection
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── todoController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Todo.js
│   │   └── OTP.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── todoRoutes.js
│   ├── utils/               # Utility functions
│   │   ├── sendEmail.js
│   │   └── generateOTP.js
│   ├── index.js             # Server entry point
│   ├── package.json
│   └── vercel.json          # Vercel configuration
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📡 API Documentation

### Base URL
```
Production: https://your-app.vercel.app/api
Development: http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "success": true,
  "message": "OTP sent to your email",
  "userId": "abc123..."
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}

Response: 200 OK
{
  "success": true,
  "message": "Email verified successfully",
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Endpoints

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

### Todo Endpoints

#### Get All Todos
```http
GET /api/task
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "todos": [
    {
      "id": "todo123",
      "title": "Complete project",
      "description": "Finish the MERN app",
      "completed": false,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

#### Create Todo
```http
POST /api/task
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description"
}

Response: 201 Created
{
  "success": true,
  "todo": {
    "id": "todo456",
    "title": "New Task",
    "description": "Task description",
    "completed": false
  }
}
```

#### Update Todo
```http
PUT /api/task/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "completed": true
}

Response: 200 OK
{
  "success": true,
  "todo": { ... }
}
```

#### Delete Todo
```http
DELETE /api/task/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **HttpOnly Cookies**: Prevents XSS attacks
- **Secure Flag**: Ensures cookies are only sent over HTTPS
- **SameSite Policy**: Protects against CSRF attacks

### Password Security
- **bcrypt Hashing**: Industry-standard password hashing
- **Salt Rounds**: 10 rounds for optimal security
- **Password Validation**: Minimum length and complexity requirements

### API Security
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Sanitizes user inputs
- **Error Handling**: Doesn't expose sensitive information

### Database Security
- **MongoDB Atlas**: Encrypted connections
- **Environment Variables**: Sensitive data protection
- **User-Specific Data**: Proper data isolation

---

## 🚢 Deployment

### Vercel Deployment

#### Backend Deployment

1. **Prepare `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "index.js"
       }
     ]
   }
   ```

2. **Deploy**
   ```bash
   cd server
   vercel --prod
   ```

#### Frontend Deployment

1. **Update API URL** in `.env`
   ```env
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Deploy**
   ```bash
   cd client
   vercel --prod
   ```

### Environment Variables on Vercel

Add all environment variables in Vercel dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all variables from your `.env` file

---

## 📸 Screenshots

### Authentication Flow
![Login Page](https://via.placeholder.com/800x400?text=Login+Page)
*Secure login with JWT authentication*

![Register Page](https://via.placeholder.com/800x400?text=Register+Page)
*User registration with email verification*

![OTP Verification](https://via.placeholder.com/800x400?text=OTP+Verification)
*Email OTP verification screen*

### Dashboard & Todo Management
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)
*Clean and intuitive dashboard*

![Todo Management](https://via.placeholder.com/800x400?text=Todo+Management)
*Full CRUD operations for todos*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation when needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📧 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter)

**Project Link**: [https://github.com/yourusername/mern-auth-todo](https://github.com/yourusername/mern-auth-todo)

**Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vercel](https://vercel.com/)
- [Nodemailer](https://nodemailer.com/)

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by Mujahidul islam Rifat

</div>
