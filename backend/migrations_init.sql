CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name TEXT NOT NULL,
  dosage TEXT,
  instructions TEXT,
  stock INTEGER,
  times_per_day INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE doses (
  id SERIAL PRIMARY KEY,
  medication_id INTEGER REFERENCES medications(id),
  scheduled_at TIMESTAMP,
  status TEXT DEFAULT 'pending',
  logged_at TIMESTAMP
);
