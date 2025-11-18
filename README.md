# EcoTrack – SDG 13: Real-Time Carbon Footprint Tracker

**Live Demo** → https://ecotrack-mern.vercel.app  
**Backend API** → https://ecotrack-mern.onrender.com

![EcoTrack](https://via.placeholder.com/1200x600/10b981/0f172a?text=EcoTrack+%E2%80%93+Real-Time+Carbon+Footprint+Tracker)

A full-stack MERN application that helps users track their daily carbon emissions from transport, food, and energy — in real time — while competing on a live global leaderboard.

Aligned with **UN SDG 13: Climate Action**.

## Features

- Real-time CO₂ calculation using verified emission factors
- Live global leaderboard powered by **Socket.IO**
- Activity logging (Transport, Food, Energy)
- Secure authentication with **JWT + httpOnly cookies**
- Persisted login (works after refresh)
- Mobile-first responsive design
- Dark mode with system preference detection
- Reset carbon footprint button
- Real-time dashboard updates
- Deployed live on **Vercel + Render + MongoDB Atlas**

## Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Frontend   | React, Vite, Tailwind CSS v4, Socket.IO Client |
| Backend    | Node.js, Express                               |
| Database   | MongoDB Atlas (cloud)                          |
| Real-Time  | Socket.IO                                      |
| Auth       | JWT + httpOnly cookies                         |
| Deployment | Vercel (frontend) • Render (backend)           |

## Live URLs

- **Frontend**: https://ecotrack-mern.vercel.app
- **Backend**: https://ecotrack-mern.onrender.com
- **Source Code**: https://github.com/Seunvense/ecotrack-mern

## Local Development Setup

```bash
# Clone the repo
git clone https://github.com/Seunvense/ecotrack-mern.git
cd ecotrack-mern

# Backend
cd backend
npm install
npm run dev        # → http://localhost:5000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev        # → http://localhost:5173
```
