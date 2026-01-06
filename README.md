
---

# 💊 Medication Reminder & Tracker

## 📋 Summary

The **Medication Reminder & Tracker** is a mobile-first web application designed to help users manage complex medication schedules reliably. The system automates the creation of daily dose logs, provides real-time in-app alerts for overdue medications, and visualizes adherence data to improve patient compliance and reduce health risks associated with missed doses.

---

## 🏗️ Architecture & File Descriptions

### Template

```
medication-reminder-tracker/
│
├── backend/                             # Server-side logic and API
│   ├── server.js                        # Entry point: initializes Express, middleware, and database connection
│   ├── package.json                     # Backend dependencies (express, pg, jsonwebtoken, node-cron, etc.)
│   ├── config/                          # Configuration folder
│   │   └── db.js                        # Database connection pool logic (PostgreSQL connection)
│   ├── models/                          # Data structures and database schemas
│   │   ├── User.js                      # Defines User fields (email, password_hash, timezone)
│   │   ├── Medication.js                # Defines Medication rules (name, frequency, dosage)
│   │   └── Dose.js                      # Defines individual dose logs (scheduled_time, status)
│   ├── routes/                          # API endpoint definitions
│   │   ├── auth.js                      # Routes for User registration and login
│   │   ├── medications.js               # Routes for CRUD operations on medications
│   │   └── reminders.js                 # Routes for fetching and updating dose log statuses
│   ├── middleware/                      # Shared request processing logic
│   │   └── auth.js                      # Validates JWT tokens to secure private routes
│   └── services/                        # Automated background tasks
│       └── scheduler.js                 # Cron job that generates daily dose logs for users
│
├── frontend/                            # Client-side user interface
│   ├── index.html                       # Base HTML template for the React application
│   ├── package.json                     # Frontend dependencies (react, axios, tailwindcss, lucide-react)
│   ├── vite.config.js                   # Configuration for Vite build tool and dev server
│   └── src/                             # React source code
│       ├── main.jsx                     # Renders the React app into the DOM
│       ├── App.jsx                      # Main routing and global layout definition
│       ├── api.js                       # Centralized Axios instance with base URL and Auth headers
│       ├── pages/                       # Screen-level components
│       │   ├── Login.jsx                # User authentication screen
│       │   ├── Dashboard.jsx            # Main view with overdue alerts and adherence charts
│       │   └── AddMedication.jsx        # Form to input new medication schedules
│       └── styles.css                   # Global styles and Tailwind CSS imports
│
└── README.md                            # Project documentation, setup guide, and architectural overview
```

### 📂 Backend (`/backend`)

The backend is a **RESTful API** built with Node.js and Express, following a modular architecture to separate concerns.

* **`server.js`**: The application entry point. It initializes middleware (CORS, JSON parsing), connects to the database, and mounts API routes.
* **`config/db.js`**: Configuration for the PostgreSQL connection pool using `pg`.
* **`models/`**: While PostgreSQL is relational (not document-based), these files define the table schemas and helper functions.
* `User.js`: Handles user data, password hashing (Bcrypt), and timezone storage.
* `Medication.js`: Manages medication metadata (name, dosage, frequency).
* `Dose.js`: Logic for the `dose_logs` table which tracks individual intake events.


* **`routes/`**:
* `auth.js`: Endpoints for `register` and `login`.
* `medications.js`: CRUD endpoints for a user’s medication list.
* `reminders.js`: Logic to fetch "Today's" doses and update dose status (Taken/Skipped).


* **`middleware/auth.js`**: Protects private routes by verifying the JWT (JSON Web Token) in the request headers.
* **`services/scheduler.js`**: A background service using `node-cron` that runs daily to populate the `dose_logs` table for all active medications.

### 📂 Frontend (`/frontend`)

A **Single Page Application (SPA)** built with React and Vite, utilizing a "Mobile-First" CSS approach.

* **`main.jsx` & `App.jsx**`: Handles the React DOM rendering and the primary routing logic using `react-router-dom`.
* **`api.js`**: A centralized Axios instance with interceptors to inject the Auth token into every outgoing request.
* **`pages/`**:
* `Login.jsx`: Secure entry point for users.
* `Dashboard.jsx`: The "Mission Control" view showing today’s schedule, overdue alerts, and the 7-day adherence chart.
* `AddMedication.jsx`: A multi-input form to configure drug names, dosages, and multiple reminder times.


* **`styles.css`**: Custom Tailwind CSS utility classes for responsive, touch-friendly UI components.

---

## 🔄 File Relationships & Data Flow

1. **Creation**: `AddMedication.jsx` sends a POST request to `routes/medications.js`.
2. **Scheduling**: The backend saves the medication and triggers `services/scheduler.js` to create the initial `Dose` entries.
3. **Polling**: `Dashboard.jsx` uses an interval to call `routes/reminders.js` every minute.
4. **Alerting**: If the current time passes a "Pending" dose time, `Dashboard.jsx` triggers a visual alert.
5. **Logging**: When a user clicks "Taken," `api.js` sends a PATCH request to update the specific `Dose` record.

---

## 🗄️ Database Explanation

We use **PostgreSQL** for its robust handling of relational data and time-series logging.

* **Users Table**: Stores `id`, `email`, `password_hash`, and `timezone`.
* **Medications Table**: Linked to Users via `user_id`. Stores the "Rules" (e.g., "Take 20mg at 08:00 and 20:00").
* **Dose_Logs Table**: Linked to Medications via `med_id`. This table tracks the "Events" (e.g., "Did the user take the 08:00 dose on Jan 5th?").
* **Timezone Logic**: All timestamps are stored in **UTC**. The frontend converts these to the user's local time for display.

---

## 🛠️ Tools & Technologies

* **Frontend**: React.js, Vite, Tailwind CSS, Recharts (for adherence donut).
* **Backend**: Node.js, Express.js.
* **Database**: PostgreSQL.
* **Auth**: JWT (JSON Web Tokens), Bcrypt.js.
* **Utility**: Node-Cron (Scheduling), Moment.js/Day.js (Time management), Axios (API calls).

---

## 🔮 Future Works

* **Native Push Notifications**: Move beyond in-app alerts to system-level notifications using Service Workers.
* **Caregiver Portal**: Allow users to share their adherence dashboard with a doctor or family member.
* **Refill Automation**: Integrating with local pharmacy APIs to automate prescription refills when stock is low.
* **PRN Support**: Adding an "As Needed" medication type that doesn't penalize adherence scores.

---

### Installation Note

To run this project locally:

1. Clone the repo.
2. Run `npm install` in both `/backend` and `/frontend`.
3. Set up your `.env` variables (DB URL, JWT Secret).
4. Run `npm run dev` in both directories.

---
