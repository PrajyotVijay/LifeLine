# 🩸 LifeLine — Blood & Organ Donor Finder

> **Connecting donors with those who need them most — because every second counts.**

A full-stack MERN application that bridges the gap between blood and organ donors and recipients across India. Built with real-world problem-solving at its core — not just a CRUD app, but a life-saving platform.

🌐 **Live Demo:** [lifeline-chi-ten.vercel.app](https://lifeline-chi-ten.vercel.app) &nbsp;|&nbsp; 📹 **[Watch Demo Video](https://youtu.be/your-link-here)**

![LifeLine Demo](screenshots/demo.gif)

---

## 🚨 Why This Exists

India faces a **critical blood and organ shortage**:

- 🩸 India needs **~15 million units** of blood annually — only ~11 million are collected
- ⏱️ Emergency delays in finding donors cost lives every day
- 🏥 Patients and families have no centralized, real-time way to find verified donors nearby

**LifeLine exists to fix that.** A verified, location-aware donor discovery platform — built by a developer who believes technology should solve real problems.

---

## ✨ Features

### 👤 For Donors
- Register as a blood or organ donor
- Auto-detect location using browser geolocation (OpenStreetMap Nominatim)
- Upload medical certificate URL
- Consent-based, verified registration process

### 🔍 For Recipients
- Search donors by blood group, organ type, and city
- Interactive Leaflet map showing nearby donor locations
- Pagination — 6 donors per page
- Verified badge on all admin-approved donors
- Emergency request system for urgent, time-critical needs

### 🛡️ Admin Dashboard
- Secure JWT-based admin login
- Approve / Reject donor applications
- Delete approved donors
- Search + filter + pagination on full donor table
- Export all donor data as CSV
- View and delete contact messages
- Manage and resolve emergency requests
- Analytics charts — blood group distribution, application status, donors by state
- Live donor count

### 🚨 Emergency System
- Post urgent blood/organ requests publicly
- Visible on home page and dedicated emergency page
- Admin can resolve or delete requests

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│   HTML5 + Tailwind CSS + Vanilla JS + Leaflet.js + Chart.js  │
│                   Hosted on: Vercel                          │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                           │
│              Node.js + Express.js REST API                   │
│         JWT Auth Middleware + bcrypt Password Hashing        │
│                   Hosted on: Render                          │
└────────────────────────┬────────────────────────────────────┘
                         │ Mongoose ODM
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│                  MongoDB Atlas (Cloud)                       │
│        Collections: Donors | Contacts | EmergencyRequests    │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│   OpenStreetMap Nominatim — Geocoding donor addresses        │
│   Browser Geolocation API — Auto-detect user location        │
└─────────────────────────────────────────────────────────────┘
```

**Communication flow:**
- Frontend (Vercel) ↔ Backend (Render) via REST API over HTTPS
- Backend ↔ MongoDB Atlas via Mongoose over TLS
- All admin routes protected by JWT bearer token

---

## 👤 User Flow

```
[Donor]                          [Recipient]                   [Admin]
   │                                  │                           │
   ▼                                  ▼                           ▼
Register Form              Search by Blood Group / City      Login (JWT)
   │                         + Interactive Map                    │
   ▼                                  │                    ┌──────┴──────┐
Pending Status             View verified donors             │             │
   │                                  │                 Approve/     Analytics
   ▼                            Emergency Request?        Reject        + CSV
Admin Review                          │                   │
   │                                  ▼               Verified ✅
Approve → Verified ✅         Post Emergency Request
```

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Find Donor (Map View)
![Find Donor](screenshots/find_donor.png)

### Donor Registration
![Register](screenshots/registeration.png)

### Admin Dashboard
![Admin](screenshots/admin.png)

### Emergency Requests
![Emergency](screenshots/emergency.png)

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Admin authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin requests |

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| Tailwind CSS (CDN) | Styling |
| Vanilla JavaScript | Interactivity |
| Leaflet.js | Interactive maps |
| Lucide Icons | Icon library |
| Chart.js | Analytics charts |

### Deployment
| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 📁 Project Structure

```
LifeLine/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── Donor.js              # Donor schema
│   │   ├── Contact.js            # Contact form schema
│   │   └── EmergencyRequest.js   # Emergency request schema
│   ├── routes/
│   │   ├── donors.js             # Donor CRUD + filters + export
│   │   ├── admin.js              # Admin login
│   │   ├── contacts.js           # Contact form
│   │   └── emergency.js          # Emergency requests
│   ├── .env                      # Environment variables (not committed)
│   └── server.js                 # Express server entry point
└── frontend/
    ├── css/
    │   └── style.css             # Global styles
    ├── js/
    │   └── shared.js             # Shared navbar, footer, helpers
    ├── pages/
    │   ├── about.html            # About page
    │   ├── find-donor.html       # Find donor with map + filters
    │   ├── register.html         # Donor registration form
    │   ├── contact.html          # Contact form
    │   ├── admin.html            # Admin dashboard
    │   └── emergency.html        # Emergency requests page
    └── index.html                # Home page
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/PrajyotVijay/LifeLine.git
cd LifeLine
```

### 2. Setup Backend
```bash
cd backend
npm install
```

### 3. Create `.env` in `backend/`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lifeline
JWT_SECRET=your_own_secret_key_here
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

### 4. Start Backend
```bash
npm run dev
# Runs on http://localhost:5000
```

### 5. Start Frontend
Open `frontend/index.html` with **Live Server** in VS Code, or open directly in browser.

---

## 🔐 Admin Access

Admin credentials are set via `.env`:
- `ADMIN_USERNAME` — your chosen username
- `ADMIN_PASSWORD` — your chosen password

JWT token is issued on login and required for all protected routes.

---

## 🗺️ API Reference

### Donors
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/donors` | Get approved donors (with filters) | ❌ |
| GET | `/api/donors/count` | Get total approved donor count | ❌ |
| GET | `/api/donors/pending` | Get pending donors | ✅ |
| GET | `/api/donors/stats` | Get donor statistics | ✅ |
| GET | `/api/donors/export` | Export donors as CSV | ✅ |
| POST | `/api/donors` | Register new donor | ❌ |
| PATCH | `/api/donors/:id` | Approve/Reject donor | ✅ |
| DELETE | `/api/donors/:id` | Delete donor | ✅ |

### Admin
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/admin/login` | Admin login → returns JWT | ❌ |

### Contacts
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/contacts` | Submit contact form | ❌ |
| GET | `/api/contacts` | Get all messages | ✅ |
| DELETE | `/api/contacts/:id` | Delete message | ✅ |

### Emergency
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/emergency` | Get active requests | ❌ |
| POST | `/api/emergency` | Post emergency request | ❌ |
| PATCH | `/api/emergency/:id` | Mark as resolved | ✅ |
| DELETE | `/api/emergency/:id` | Delete request | ✅ |

---

## 🚀 Future Scope

This project has a clear roadmap to evolve into a production-grade platform:

| Feature | Description |
|---|---|
| 📱 Mobile App | React Native version for iOS & Android |
| 🤖 AI Donor Matching | ML model to rank donors by compatibility + proximity |
| 📲 SMS / WhatsApp Alerts | Notify nearby donors during emergencies via Twilio |
| 🏥 Hospital Integration | Hospital portal for verified institutional requests |
| 🔔 Real-time Notifications | WebSocket-based live emergency alerts |
| 🌍 Multi-language Support | Reach rural donors in regional languages |
| 📊 State-level Analytics | Government-facing dashboards for blood bank policy |

---

## 👨‍💻 Author

**Prajyot Vijay Surwade**
- 🎓 BE Information Technology — Savitribai Phule Pune University (SPPU)
- 🎓 BS Data Science & AI/ML — IIT Madras
- 💼 [LinkedIn](https://www.linkedin.com/in/prajyot-surwade-80b1933b2/)
- 🐙 [GitHub](https://github.com/PrajyotVijay)

> This project was independently developed as part of the SPPU Community Engagement Project curriculum — every line of code written from scratch.

---

## 📄 License

Developed as part of the **Community Engagement Project** submitted to **Savitribai Phule Pune University (SPPU)** under the BE Information Technology program. Showcased as a portfolio project demonstrating full-stack MERN development skills. Not intended for commercial use.

---

⭐ **If LifeLine inspired you or helped you, drop a star — it means a lot!**
