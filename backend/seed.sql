INSERT INTO users (email, password)
VALUES ('demo@user.com', '$2b$10$hashedpassword');

INSERT INTO medications (user_id, name, dosage, stock, times_per_day)
VALUES (1, 'Metformin', '500mg', 30, 2);
